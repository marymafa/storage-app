import { createStore } from "redux"
import rootReducer from '../redux/allReducers/index'

const store = createStore(rootReducer);


console.log(store.getState(),"redux");
export default store;