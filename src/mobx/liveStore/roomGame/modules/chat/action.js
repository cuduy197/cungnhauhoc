import { message, notification, Modal } from "antd";
import live from "@/mobx/liveStore";

export default async payload => {
  try {
    if (live.roomGame.data.get("guestName")) {
      await live.roomGame.data.set(String(`${live.roomGame.role}Chat`), payload).save();
      await live.roomGame.data.set(String(`${live.roomGame.role}Chat`), "").save();
      message.success("Đã gửi");
    } else {
      message.warn("Bạn đang chat 1 mình ;)");
    }
  } catch (e) {
    message.error("Có lỗi khi gửi");
    console.error(e);
  }
};
