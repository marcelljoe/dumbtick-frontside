import axios from "axios";

export const getEventsByCategory = (id) => {
  return {
    type: "GET_EVENTS_BC",
    payload: axios.get(`https://dumbtick-backend.herokuapp.com/dumbtick/category/${id}/events`)
  };
};
