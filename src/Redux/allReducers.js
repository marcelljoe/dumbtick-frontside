import HomeReducers from "./_reducers/HomeReducers";
import EventsByCategory from "./_reducers/EventsByCategoryReducers";


export default allReducers({
  home: HomeReducers,
  eventsbycat: EventsByCategory
});
