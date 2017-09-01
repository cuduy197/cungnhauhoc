import { Table, Icon, Switch, Radio, Form, Button } from "antd";
const FormItem = Form.Item;

@inject("user", "live")
@observer
export class JoinButton extends React.Component {
  render() {
    let live = this.props.live;
    let user = this.props.user;
    return (
      <div className="">
        {user.userData.name !== this.props.record.hostName && this.props.record.guestName === undefined
          ? <Button
              loading={live.roomGame.ui.isClickJoin}
              onClick={() =>
                live.ROOMGAME_ENTER(undefined, {
                  name: this.props.record.roomName,
                  isPass: this.props.record.isPass
                })}
              type="primary"
              icon="right-circle">
              Thi đấu
            </Button>
          : <b>Đã đầy</b>}
      </div>
    );
  }
}

const columns = [
  {
    title: "Phòng",
    dataIndex: "roomName",
    key: "roomName",
    render: (text, record) =>
      <b>
        {text} {record.isPass ? <Icon type="lock" /> : ""}
      </b>
  },
  {
    dataIndex: "hostPhoto",
    key: "isPass",
    width: 32,
    render: photoUrl => <img width="32" height="32" src={photoUrl} alt="" />
  },
  {
    title: "Chủ phòng",
    dataIndex: "hostName",
    key: "hostName"
  },
  {
    dataIndex: "isPass",
    key: "isPass",
    width: 0,
    render: () => <div />
  },
  {
    dataIndex: "guestName",
    key: "guestName",
    width: 0,
    render: () => <div />
  },
  {
    title: "Tùy chọn",
    key: "action",
    width: 90,
    render: (text, record) =>
      <div>
        <JoinButton record={record} />
      </div>
  }
];

@inject("live")
@observer
export default class RoomTable extends React.Component {
  state = {
    pagination: false,
    size: "default"
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleTitleChange = enable => {
    this.setState({ title: enable ? title : undefined });
  };

  handleScollChange = enable => {
    this.setState({ scroll: enable ? scroll : undefined });
  };

  render() {
    const state = this.state;
    const live = this.props.live;

    return (
      <div>
        <Table
          {...this.state}
          loading={live.roomList.loading}
          columns={columns}
          dataSource={live.roomList.data.slice()}
        />
      </div>
    );
  }
}
