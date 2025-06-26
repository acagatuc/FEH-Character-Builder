import { combineReducers } from "redux";
import tabList from "./tabList";
import hero from "./hero"
import display from "./display";
import barracks from "./barracks";

export default combineReducers({ tabList, hero, display, barracks });
