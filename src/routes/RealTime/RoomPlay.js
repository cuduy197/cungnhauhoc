import { Button, Spin, Card, Icon, Badge, Input } from "antd";
import Parse from "parse";

@inject("user", "live")
@observer
export default class RoomPlay extends React.Component {
  state = { chat: "" };

  componentWillUnmount() {
    live.ROOMGAME_UN_WATCH();
  }

  _ready = () => {
    this.props.live.ROOMGAME_ACTION("ready");
  };
  _chat = e => {
    if (e.target.value.length > 0) {
      this.props.live.ROOMGAME_ACTION("chat", String(e.target.value));
      this.setState({ chat: "" });
    }
  };

  render() {
    let live = this.props.live;
    let user = this.props.user;

    let { roomGame } = this.props.live;
    let room = roomGame.data;

    let TurnStatus = role => (
      <Badge status={!room.get(`${role}Ready`) ? "warning" : room.get("turn") === role ? "processing" : "default"} />
    );

    return (
      <div className="animated fadeIn">
        <Spin spinning={!roomGame.isOpen}>
          <div className="center">
            <h3>
              Chủ phòng : <img src={room.get("hostPhoto")} width="24" height="24" /> {room.get("hostName")} {" "}
              {room.get("hostReady") ? <Badge status="processing" /> : <Badge status="default" />}{" "}
              {user.userData.name === room.get("hostName") && "(Bạn)"}
            </h3>
            {room.get("guestName") ? (
              <h3>
                Khách phòng : <img src={room.get("guestPhoto")} width="24" height="24" /> {room.get("guestName")} {" "}
                {room.get("guestReady") ? <Badge status="processing" /> : <Badge status="default" />}{" "}
                {user.userData.name === room.get("guestName") && "(Bạn)"}
              </h3>
            ) : (
              <h3 className="animated infinite fadeIn">Khách : Đang đợi ..</h3>
            )}
            <br />
            <Button
              loading={live.roomGame.ui.isClickExit}
              onClick={() => this.props.live.ROOMGAME_EXIT()}
              icon="close"
              type="danger">
              Thoát
            </Button>{" "}
            {!room.get(`${roomGame.role}Ready`) && (
              <Button loading={live.roomGame.ui.isClickReady} onClick={this._ready} icon="check" type="primary">
                Sẵn sàng
              </Button>
            )}
            <br />
            <Input
              value={this.state.chat}
              style={{ margin: "1em 0" }}
              onPressEnter={this._chat}
              placeholder="Nhập nội dung muốn gửi rồi ấn Enter "
            />
            <Button onClick={() => this.props.live.ROOMGAME_ACTION("chat", "sao")} icon="star" shape="circle-outline" />
            <br />
            <div />
          </div>
        </Spin>
      </div>
    );
  }
}
