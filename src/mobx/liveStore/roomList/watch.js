import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import Parse from "parse";
import live from "../index";
import { message, notification, Modal } from "antd";

export default async mode => {
  try {
    Parse.LiveQuery.on("error", e => {
      console.error(e);
      message.error("Có lỗi khi kết nối");
    });

    let liveClass = new Parse.Query(live.className);
    let thongbao = "";
    live.roomList.liveQuery = liveClass.subscribe();

    //Watch
    live.roomList.liveQuery.on("open", () => {
      live.roomList.isOpen = true;
      //

      thongbao = `Mở theo dõi server : ${live.className}`;
      //message.success(thongbao);
      console.log(`%c👁‍ ${thongbao}`, blue);
      live.ROOMGAME_CHECK_IN();
    });

    live.roomList.liveQuery.on("create", room => {
      live.roomList.data.push({
        key: room.id,
        roomName: room.get("roomName"),
        hostName: room.get("hostName"),
        hostPhoto: room.get("hostPhoto"),
        isPass: room.get("roomPass") ? true : false
      });
      //
      thongbao = `${room.get("hostName")} đã tạo phòng ${room.get("roomName")}`;
      message.info(thongbao);
      console.log(`%c${thongbao}`, blue);
    });

    live.roomList.liveQuery.on("delete", room => {
      live.ROOMLIST_FETCH();
      //
      thongbao = `${room.get("hostName")} xóa phòng ${room.get("roomName")}`;
      message.warn(thongbao);
      console.log(`%c ⚠️ ${thongbao}`, red);
    });

    live.roomList.liveQuery.on("close", () => {
      live.roomList.isOpen = false;
      //
      thongbao = `Đóng theo dõi server : ${live.className}`;
      //message.warn(thongbao);
      console.log(`🔕 %c${thongbao}`, red);
    });
  } catch (e) {
    console.error(e);
  }
};
