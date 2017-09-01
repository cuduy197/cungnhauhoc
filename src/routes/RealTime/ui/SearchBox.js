import { Input } from "antd";
const Search = Input.Search;
@inject("live")
@observer
export default class Sreach extends React.Component {
  state = { value: "" };
  _onSearch = value => {
    this.props.live.SEARCH_ROOM(value);
    this.setState({ value: "" });
  };
  render() {
    let live = this.props.live;
    return (
      <div className="">
        <Search
          placeholder="Nhập sau đó nhấn Enter"
          value={this.state.value}
          onSearch={value => this._onSearch(value)}
        />
      </div>
    );
  }
}
