import { Spin } from "antd";

export default class RoomLoading extends Component {
  render() {
    return (
      <div className="center" style={{ paddingTop: "100px" }}>
        <h1>Đang tải ...</h1>
        <br />
        <Spin size="large" />
      </div>
    );
  }
}
