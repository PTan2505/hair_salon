import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/filebase";

const uploadFile = async (file) => {
  const storageRef = ref(storage, file.name);
  //lưu cái file này lên filebase
  const response = await uploadBytes(storageRef, file);
  //=> lấy cái đường dẫn đến file vừa tạo
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
};

export default uploadFile;
