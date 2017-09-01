import live from "@/mobx/liveStore";
//
import chatUpdate from "./modules/chat/update";

import { message, notification, Modal } from "antd";

export default room => {
  console.log("Update");
  live.roomGame.data = room;

  //
  chatUpdate(room);
};
