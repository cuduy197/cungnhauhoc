import style from "./style";
import { StatusRoom, SearchBox, RoomTable, FormCreate, ModalCreate } from "./ui";
import { Button } from "antd";
import Header from "#/header";
@inject("live")
@observer
export default class RoomWait extends Component {
  componentWillUnmount() {
    let live = this.props.live;
    live.ROOMLIST_UN_WATCH();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Header />
        <ModalCreate />
        <FormCreate />
        <RoomTable />
      </div>
    );
  }
}
