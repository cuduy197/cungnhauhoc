import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import Parse from "parse";
import live from "../index";
import { message, notification, Modal } from "antd";
//
import chatAction from "./modules/chat/action";

import { starEff } from "./modules/chat/effects";

export default async (name, payload) => {
  let log = (text, color = blue) => {
    message.info(text);
    console.log(`%c${name}`, color);
  };

  switch (name) {
    case "ready":
      log("Ready");
      live.roomGame.ui.isClickReady = true;
      try {
        await live.roomGame.data.set(String(`${live.roomGame.role}Ready`), true).save();
        live.roomGame.ui.isClickReady = false;
        starEff();
      } catch (e) {
        message.error("Có lỗi khi sẵn sàng");
        //
        live.roomGame.ui.isClickReady = false;
        console.error(e);
      }
      break;
    case "chat":
      chatAction(String(payload));
      break;
    default:
      break;
  }
};
