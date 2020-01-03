import axios from "axios";

export const getEventsByCategory = (id) => {
  return {
    type: "GET_EVENTS_BC",
    payload: axios.get(`http://localhost:7000/dumbtick/category/${id}/events`)
  };
};
