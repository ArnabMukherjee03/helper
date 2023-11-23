import axios from "axios";

export function fetchAtms(filter) {
  return new Promise(async (resolve, reject) => {
    let queryString = '';
    for (let key in filter) {
      const categoryValues = filter[key];
      if (categoryValues.length) {
        queryString += `${key}=${categoryValues}&`;
      }
    }
    console.log(queryString);
    try {
      const response = await axios.get("/atm/fetchAtms?"+ queryString);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchAtmById(id) {
  return new Promise(async (resolve, reject) => {
   
    try {
      const response = await axios.get(`/atm/fetchAtm/${id}`);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


export function updateStatus(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(`/cashstatus/update/${update.atmId}`,update);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function getStatus(atmId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`/cashstatus/getstatus/${atmId}`);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}




