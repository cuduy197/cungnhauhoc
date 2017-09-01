@inject("live", "user")
@observer
export default class StatusRoom extends React.Component {
  render() {
    let live = this.props.live;
    let user = this.props.user;
    let { name } = user.userData;
    return (
      <div className="">
        <h1>
          {name} bạn đang ở phòng {live.room.id}
        </h1>
      </div>
    );
  }
}
