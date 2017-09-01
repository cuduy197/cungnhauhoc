import live from "../index";
export default () => {
  console.log("ROOMGAME_UN_WATCH");
  live.roomGame.liveQuery.unsubscribe();
};
