import style from "./style";
import { Button, Spin } from "antd";

import Loading from "./loading";
import Login from "./login";
import UnLogin from "./unlogin";

@inject("user")
@observer
export default class Home extends Component {
  render() {
    let user = this.props.user;

    return (
      <div className={style.home}>{user.isLogin === null ? <Loading /> : user.isLogin ? <Login /> : <UnLogin />}</div>
    );
  }
}
