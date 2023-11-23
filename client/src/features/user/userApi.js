import axios from "axios";

export function user() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/user/currentUser");
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function updatePassword(Data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch("/user/updatePassword",Data);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

