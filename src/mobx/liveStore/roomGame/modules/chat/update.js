import live from "@/mobx/liveStore";
import { message, notification, Modal } from "antd";
import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import { starEff } from "./effects";
import mojs from "mo-js";

export default room => {
  //Host-->guest
  if (live.roomGame.role === "host" && room.get("guestChat") && room.get("guestName")) {
    switch (room.get("guestChat")) {
      case "sao":
        starEff();
        break;

      default:
        message.info(`${room.get("hostName")} nhắn :  ${room.get("guestChat")} `);
        break;
    }
  }
  //Guest --> host
  if (live.roomGame.role === "guest" && room.get("hostChat")) {
    switch (room.get("hostChat")) {
      case "sao":
        starEff();
        break;

      default:
        message.info(`${room.get("guestName")} nhắn :  ${room.get("hostChat")} `);
        break;
    }
  } //
};
