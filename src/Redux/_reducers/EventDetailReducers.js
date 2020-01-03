const initState = {
  eventDet: [],
  categorySector: [],
  userSector: []
};

const EventDetailReducers = (state = initState, action) => {
  switch (action.type) {
    case "GET_EVENT_DETAIL_FULFILLED":
      return {
        ...state,
        eventDet: action.payload.data,
        categorySector: action.payload.data.category,
        userSector: action.payload.data.user
      };
    default:
      return state;
  }
};

export default EventDetailReducers;
