import axios from 'axios';

export const getEventsByToday = () => {
    return {
      type: "GET_EVENTS_BT",
      payload: axios.get("http://localhost:7000/dumbtick/eventsbytoday")
    };
};

export const getEventsUpcoming = () => {
  return {
    type: "GET_EVENTS_UC",
    payload: axios.get("http://localhost:7000/dumbtick/eventsupcoming")
  };
};

export const getCategories = () => {
  return {
    type: "GET_CATEGORIES",
    payload: axios.get("http://localhost:7000/dumbtick/categories")
  };
};

export const getEvents = () => {
  return {
    type: "GET_EVENTS",
    payload: axios.get("http://localhost:7000/dumbtick/events")
  };
};