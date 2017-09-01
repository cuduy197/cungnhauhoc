import Parse from "parse";
import live from "../index";

export default async () => {
  console.log("ROOMLIST_FETCH");
  live.roomList.loading = true;
  try {
    live.roomList.data = [];
    let roomList = await new Parse.Query(live.className).limit(10).find();
    roomList.forEach(room =>
      live.roomList.data.push({
        key: room.id,
        roomName: room.get("roomName"),
        guestName: room.get("guestName"),
        hostName: room.get("hostName"),
        hostPhoto: room.get("hostPhoto"),
        isPass: room.get("roomPass") ? true : false
      })
    );
    live.roomList.loading = false;
  } catch (e) {
    console.error(e);
  }
};
