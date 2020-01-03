const initState = {
  eventsbc: []
  };

const EventsByCategoryReducers = (state = initState, action) => {
  switch (action.type) {
    case "GET_EVENTS_BC_FULFILLED":
      return {
        ...state,
        eventsbc: action.payload.data
      };
    default:
      return state;
  }
};

export default EventsByCategoryReducers;
