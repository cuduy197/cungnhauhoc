import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import Parse from "parse";
import live from "../index";
import { message, notification, Modal } from "antd";

export default async () => {
  console.log(`%c❓ Kiểm tra đã tham gia vào room ?  `, orange);

  try {
    let user = Parse.User.current();
    let thongbao = "";

    let roomGame = await Parse.Query
      .or(new Parse.Query(live.className).equalTo("host", user), new Parse.Query(live.className).equalTo("guest", user))
      .first();

    if (roomGame) {
      live.roomList.liveQuery && live.ROOMLIST_UN_WATCH(); //Check if isn't in RoomWait
      live.roomGame = { ...live.roomGame, data: roomGame, isJoin: true };
      live.ROOMGAME_WATCH();
      //
      thongbao = `Bạn đã tham gia phòng ${roomGame.get("roomName")}`;
      message.info(thongbao);
      console.log(`%c${thongbao}`, blue);
    } else {
      live.roomGame = { ...live.roomGame, isJoin: false };
      live.ROOMLIST_FETCH(); //fetch roomList
      //
      thongbao = `Bạn chưa tham gia phòng`;
      //message.info(thongbao);
      console.log(`%c${thongbao}`, blue);
    }
  } catch (e) {
    if (e.code === 209) {
      message.info(`Có dữ liệu không đúng, vui lòng đăng nhập lại`);
      setTimeout(() => {
        window.localStorage.clear();
        history.go(0);
      }, 1000);
    }
    console.error(e);
  }
};
