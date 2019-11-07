import {combineReducers } from 'redux'
import array from "./array.reducer";
import controller from "./controller.reducer";
import speed from "./speed.reducer";

export default combineReducers({
    array,
    controller,
    speed
});
