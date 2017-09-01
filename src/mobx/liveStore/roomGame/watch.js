import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import { message, notification, Modal } from "antd";
import live from "../index";
import Parse from "parse";
import update from "./update.js";

export default async mode => {
  try {
    //set role
    live.roomGame.role = live.roomGame.data.get("hostName") === Parse.User.current().get("name") ? "host" : "guest";

    let roomGame = new Parse.Query(`${live.className}`).equalTo("objectId", live.roomGame.data.id);
    live.roomGame.liveQuery = roomGame.subscribe();
    let roomIn = live.roomGame.data;
    //
    let thongbao = (text, color) => {
      //color === red ? message.warn(String(text)) : message.info(String(text));
      console.log(`%c${text}`, color);
    };

    //UPDATE
    live.roomGame.liveQuery.on("update", room => update(room));

    //Open
    live.roomGame.liveQuery.on("open", () => {
      setTimeout(() => (live.roomGame.isOpen = true), 500);
      //
      thongbao(`Đã mở theo dõi phòng : [${roomIn.get("roomName")}]`, green);
    });
    //Delete
    live.roomGame.liveQuery.on("delete", room => {
      live.roomGame.isJoin = false;
      live.ROOMLIST_WATCH();
      //
      thongbao(`Xóa phòng : [${room.get("roomName")}]`, red);
    });
    //Close
    live.roomGame.liveQuery.on("close", () => {
      live.roomGame.isOpen = false;
      //
      thongbao(`Đóng theo dõi phòng : [${roomIn.get("roomName")}]`, red);
    });
  } catch (e) {
    console.error(e);
  }
};
