import { red, green, blue, orange, purple } from "@/mobx/colorLog";
import Parse from "parse";
import live from "../index";
import { message, notification, Modal } from "antd";

export default () => {
  try {
    let ok = async () => {
      live.roomGame.ui.isClickExit = true;
      try {
        let inRoom = await new Parse.Query(live.className).equalTo("objectId", live.roomGame.data.id).first();
        await inRoom.destroy();
        live.roomGame.ui.isClickExit = false;
      } catch (e) {
        console.error(e);
        message.error("Có lỗi khi thoát ");
        live.roomGame.ui.isClickExit = false;
      }
    };
    //
    Modal.confirm({
      title: "Bạn muốn thoát?",
      content: "Khi thoát bạn sẽ bị thua, hãy chắc chắn với lựa chọn của bạn?",
      onOk() {
        ok();
      },
      onCancel() {
        live.roomGame.ui.isClickExit = false;
      }
    });
  } catch (e) {
    console.error(e);
  }
};
