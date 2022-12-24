import { combineReducers } from "redux";
import tabList from "./tabList";
import display from "./display";
import barracks from "./barracks";

export default combineReducers({ tabList, display, barracks });
