import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import Parse from "parse";
import { message, notification, Modal } from "antd";

import { ROOMLIST_WATCH, ROOMLIST_UN_WATCH, ROOMLIST_FETCH } from "./roomList";

import {
  ROOMGAME_CHECK_IN,
  ROOMGAME_CREATE,
  ROOMGAME_ENTER,
  ROOMGAME_EXIT,
  ROOMGAME_WATCH,
  ROOMGAME_UN_WATCH,
  ROOMGAME_ACTION
} from "./roomGame";

class liveStore {
  constructor(className) {
    this.className = className;
  }

  @observable
  roomGame = {
    isJoin: null,
    isOpen: false,
    liveQuery: undefined,
    role: "",
    data: {},
    ui: {
      isClickEnter: false,
      isClickJoin: false,
      isClickCreate: false,
      isClickReady: false,
      isClickExit: false
    }
  };
  @observable roomList = { loading: false, isOpen: false, liveQuery: undefined, data: [] };

  //UI
  @observable Form = { mode: "", roomName: Math.floor(Math.random() * (99999 - 10000) + 10000), requiredPass: false };

  /* 
  _                              
 |_)  _   _  ._ _    |  o  _ _|_ 
 | \ (_) (_) | | |   |_ | _>  |_ 
                                 
*/

  @action ROOMLIST_WATCH = () => ROOMLIST_WATCH();
  @action ROOMLIST_UN_WATCH = () => ROOMLIST_UN_WATCH();
  @action ROOMLIST_FETCH = () => ROOMLIST_FETCH();

  /* 
  _                   __               
 |_)  _   _  ._ _    /__  _. ._ _   _  
 | \ (_) (_) | | |   \_| (_| | | | (/_ 
                                       
*/

  @action ROOMGAME_CHECK_IN = () => ROOMGAME_CHECK_IN();
  @action ROOMGAME_CREATE = input => ROOMGAME_CREATE(input);
  @action ROOMGAME_ENTER = (input, join) => ROOMGAME_ENTER(input, join);
  @action ROOMGAME_WATCH = () => ROOMGAME_WATCH();
  @action ROOMGAME_UN_WATCH = () => ROOMGAME_UN_WATCH();
  @action ROOMGAME_EXIT = () => ROOMGAME_EXIT();
  @action ROOMGAME_ACTION = (name, payload) => ROOMGAME_ACTION(name, payload);

  //Test room game

  //UI
  @action
  FORM_MODE = mode => {
    console.log(mode);
    this.Form.mode = mode;
  };
}

const live = new liveStore("realtime");

window.live = live;
window.Parse = Parse;

export default live;

autorun(() => {});
