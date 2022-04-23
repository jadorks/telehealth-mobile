import { client } from "./utilities/client";

export const getSlots = async (start_gte, start_lte, doctor) => {
  const slots = await client
    .get("bookings/slots", {
      params: { start_gte: start_gte, start_lte: start_lte, doctor: doctor, status: "OP" },
    })
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

    return slots;
};
