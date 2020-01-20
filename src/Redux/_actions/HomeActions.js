import axios from 'axios';

export const getEventsByToday = () => {
    return {
      type: "GET_EVENTS_BT",
      payload: axios.get("https://dumbtick-backend.herokuapp.com/dumbtick/eventsbytoday")
    };
};

export const getEventsUpcoming = () => {
  return {
    type: "GET_EVENTS_UC",
    payload: axios.get("https://dumbtick-backend.herokuapp.com/dumbtick/eventsupcoming")
  };
};

export const getCategories = () => {
  return {
    type: "GET_CATEGORIES",
    payload: axios.get("https://dumbtick-backend.herokuapp.com/dumbtick/categories")
  };
};

export const getEvents = () => {
  return {
    type: "GET_EVENTS",
    payload: axios.get("https://dumbtick-backend.herokuapp.com/dumbtick/events")
  };
};
