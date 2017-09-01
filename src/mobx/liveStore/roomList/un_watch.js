import live from "../index";

export default () => {
  try {
    live.roomList.liveQuery.unsubscribe();
  } catch (e) {
    console.error(e);
  }
};
