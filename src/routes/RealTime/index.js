import style from "./style";
import RoomLoading from "./RoomLoading";
import RoomWait from "./RoomWait";
import RoomPlay from "./RoomPlay";

@inject("live")
@observer
export default class RealTime extends Component {
  componentWillMount() {
    let live = this.props.live;
    live.ROOMLIST_WATCH();
  }

  render() {
    let live = this.props.live;
    return (
      <div className={style.realtime}>
        {live.roomGame.isJoin === null ? <RoomLoading /> : live.roomGame.isJoin ? <RoomPlay /> : <RoomWait />}
      </div>
    );
  }
}
