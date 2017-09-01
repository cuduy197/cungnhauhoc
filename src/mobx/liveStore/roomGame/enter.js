import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import Parse from "parse";
import live from "../index";
import user from "../../userStore";

import { message, notification, Modal } from "antd";

export default async (input, join) => {
  !join && (live.roomGame.ui.isClickEnter = true);
  !input && (live.roomGame.ui.isClickJoin = true);

  console.log(`%c~[A] ROOMGAME_ENTER`, purple);

  let enterRoom = async room => {
    message.success("Đã vào phòng!");
    console.log(`%center Room `, orange);
    live.roomGame.data = room;
    live.roomGame.isJoin = true;

    let ParseUser = Parse.User.current();
    //guest
    room.set("guest", ParseUser);
    room.set("guestName", ParseUser.get("name"));
    room.set("guestPhoto", user.userData.photoUrl);

    await room.save();

    live.ROOMGAME_WATCH();
  };

  try {
    if (input) {
      console.log(input);
      let roomGame = await new Parse.Query(live.className)
        .equalTo("guestName", undefined)
        .equalTo("roomName", input.name)
        .equalTo("roomPass", input.pass === "" ? undefined : input.pass)
        .first();

      if (roomGame) {
        enterRoom(roomGame);
      } else {
        message.error("Có lỗi! sai mật khẩu hoặc phòng đã đầy ?");
      }
      //
      live.roomGame.ui.isClickEnter = false;
    } else {
      console.log(join);

      let roomGame = await new Parse.Query(live.className)
        .equalTo("guestName", undefined)
        .equalTo("roomName", join.name)
        .equalTo("roomPass", join.isPass ? prompt("Nhập mật khẩu") : undefined)
        .first();

      if (roomGame) {
        enterRoom(roomGame);
      } else {
        message.error("Có lỗi! sai mật khẩu hoặc phòng đã đầy ?");
      }

      //
      live.roomGame.ui.isClickEnter = false;
      live.roomGame.ui.isClickJoin = false;
    }
  } catch (e) {
    live.roomGame.ui.isClickEnter = false;
    console.error(e);
  }
};
