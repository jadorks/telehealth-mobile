import { client } from "./utilities/client";

export const getSlots = async (start_gte, start_lte, doctor) => {
  const slots = await client
    .get("bookings/slots", {
      params: {
        start_gte: start_gte,
        start_lte: start_lte,
        doctor: doctor,
        status: "OP",
      },
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

export const getBookings = async (patient, status) => {
  const bookings = await client
    .get("bookings", { params: { patient: patient, status:status } })
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

  return bookings;
};

export const createBooking = async (booking_info) => {
  const addedBooking = await client
    .post("bookings/", booking_info)
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

  return addedBooking;
};

export const deleteBooking = async (booking_id) => {
  const deletedBooking = await client
    .delete(`bookings/${booking_id}`)
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
    return deletedBooking;
};
