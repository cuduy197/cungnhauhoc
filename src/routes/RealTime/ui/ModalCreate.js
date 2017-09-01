import { Modal } from "antd";

@inject("live")
@observer
export default class ModalCreate extends React.Component {
  state = { visible: false };
  handleOk = () => {
    this.setState({ visible: false });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    let live = this.props.live;
    return (
      <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}
