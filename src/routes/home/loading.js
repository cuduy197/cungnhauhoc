import { Spin } from "antd";

export default class Loading extends React.Component {
  render() {
    return (
      <div className="animated fadeInDown" style={{ paddingTop: "1em" }}>
        <h1>Đang tải ...</h1>
        <br />
        <Spin size="large" />
      </div>
    );
  }
}
