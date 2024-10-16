import React from "react";
import AuthenTemplate from "../../components/authen-template";
import { Button, Form, Input } from "antd";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);

        // You can dispatch login action or store the user info here
        dispatch(login({ user, token }));
        localStorage.setItem("token", token);
        toast.success("Google login successful!");
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Google login failed!");
        console.error(error);
      });
  };

  const handleLogin = async (values) => {
    try {
      const response = await api.post("/login", values);
      const { role, token } = response.data;
      dispatch(login(response.data));
      localStorage.setItem("token", token);

      toast.success("Login successful!");
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/"); // Redirect to another page for non-admin users
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
    }
  };

  return (
    <AuthenTemplate>
      <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <div>
          <Link to="/register">
            {" "}
            Don't have an account? Register new account
          </Link>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        <Button onClick={handleLoginGoogle}>Login with Google</Button>
      </Form>
    </AuthenTemplate>
  );
}

export default LoginPage;
