const initState = {
  categories: [],
  events: [],
  eventsbt: [],
  eventsuc: []
};

const HomeReducers = (state = initState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_FULFILLED":
      return {
        ...state,
        categories: action.payload.data
      };
    case "GET_EVENTS_FULFILLED":
      return {
        ...state,
        events: action.payload.data
      };
    case "GET_EVENTS_BT_FULFILLED":
      return {
        ...state,
        eventsbt: action.payload.data
      };
    case "GET_EVENTS_UC_FULFILLED":
      return {
        ...state,
        eventsuc: action.payload.data
      };
    default:
      return state;
  }
};

export default HomeReducers;
