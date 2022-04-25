import { client } from "./utilities/client";

export const getRecords = async (patient) => {
  const records = await client
    .get("records", { params: { patient: patient } })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.messsage);
      }
      return [];
    });

  return records;
};

export const getRecord = async (record_id) => {
  const records = await client
    .get(`records/${record_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.messsage);
      }
      return {};
    });

  return records;
};

export const updateRecord = async (record_id, record_data, token) => {
  const updatedRecord = await client
    .put(`records/${record_id}`, record_data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      return true;
    })
    .catch((error) => {
      if (error.response) {
        // console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.messsage);
      }
      return false;
    });
  return updatedRecord;
};

export const deleteRecord =async (record_id) => {
    const deletedRecord = await client
    .delete(`records/${record_id}`)
    .then((res) => {
      console.log(res.data);
      return true;
    })
    .catch((error) => {
      if (error.response) {
        // console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.messsage);
      }
      return false;
    });
    return deletedRecord;
}