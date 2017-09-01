@inject("live")
@observer
export default class CardNav extends React.Component {
  render() {
    let live = this.props.live;
    return (
      <div class="card-container">
        <a href="#" class="card">
          <p>Thi đấu</p>
        </a>

        <a href="#" class="card">
          <p>Tạo phòng</p>
        </a>
      </div>
    );
  }
}
