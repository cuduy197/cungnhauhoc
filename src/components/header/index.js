import { Icon, Badge } from "antd";

import style from "./style";
@inject("user", "live")
@observer
export default class Header extends Component {
  render() {
    let user = this.props.user;
    let live = this.props.live;

    return (
      <header className={style.header}>
        <Link activeClassName={style.active} href="/">
          <h1>
            <Icon type="home" /> Trang chủ {}
            {live.roomGame.isOpen ? <Badge status="processing" /> : live.roomList.isOpen && <Badge status="warning" />}
          </h1>
        </Link>
        {user.isLogin
          ? <nav>
              <Link activeClassName={style.active} href="/me">
                <h1>
                  <Icon type="user" /> Tài khoản
                </h1>
              </Link>
            </nav>
          : null}
      </header>
    );
  }
}
