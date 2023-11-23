import axios from "axios";

export function newReview(newData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/review",newData);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function getReview(atmId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`/review/${atmId}`);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteReview(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`/review/${id}`);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}
