import { createRoot } from "react-dom/client";
import "./index.css";
// import StudentManagement from './StudentManagement.jsx'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
// import { HomeProvider } from "./Page/HomeCustomer/HomeCustomerContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        {/* <HomeProvider> */}
        <App />
        {/* </HomeProvider> */}
      </PersistGate>
    </Provider>
  </>
);

