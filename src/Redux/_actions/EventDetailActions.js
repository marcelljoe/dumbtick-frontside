import axios from "axios";

export const getEventDetail = (id) => {
  return {
    type: "GET_EVENT_DETAIL",
    payload: axios.get(`http://localhost:7000/dumbtick/event/${id}/detail`)
  };
};

