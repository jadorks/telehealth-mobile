import { client } from "./utilities/client";

export const getDoctors = async () => {
  const doctors = await client
    .get("users/doctors")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      return [];
    });

  return doctors;
};

export const getDoctor = async (doctor_id: any) => {
  const doctor = await client
    .get(`users/doctors/${doctor_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      return {};
    });

    return doctor;
};
