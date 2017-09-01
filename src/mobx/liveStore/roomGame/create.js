import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import Parse from "parse";
import live from "../index";
import user from "../../userStore";

import { message, notification, Modal } from "antd";

export default async input => {
  live.roomGame.ui.isClickCreate = true;
  try {
    let roomCheck = await new Parse.Query(live.className).equalTo("roomName", String(input.name)).first();
    console.log(input);
    //console.log(roomCheck);

    if (!roomCheck) {
      let room = new Parse.Object(live.className);
      let ParseUser = Parse.User.current();
      //base
      room.set("roomName", String(input.name));
      room.set("roomPass", input.pass);
      //host
      room.set("host", ParseUser);
      room.set("hostName", ParseUser.get("name"));
      room.set("turn", "host");
      room.set("hostChat", "");
      room.set("hostScore", 0);
      room.set("hostReady", false);
      room.set("hostPhoto", user.userData.photoUrl);

      //
      room.set("guestScore", 0);
      room.set("guestChat", "");
      room.set("guestReady", false);
      //Add type game
      room.set("type", input.type);

      let newRoom = await room.save();

      live.roomGame = { ...live.roomGame, data: newRoom, isJoin: true };
      live.ROOMGAME_WATCH();
      live.roomGame.ui.isClickCreate = false;
    } else {
      live.roomGame.ui.isClickCreate = false;
      message.error(`Tên phòng bị trùng, hãy chọn tên khác!`);
    }
  } catch (e) {
    console.error(e);
    live.roomGame.ui.isClickCreate = false;
  }
};
