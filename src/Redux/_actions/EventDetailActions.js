import axios from "axios";

export const getEventDetail = (id) => {
  return {
    type: "GET_EVENT_DETAIL",
    payload: axios.get(`https://dumbtick-backend.herokuapp.com/dumbtick/event/${id}/detail`)
  };
};

