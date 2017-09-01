import { Button } from "antd";
import FacebookLoginBtn from "#/FacebookLoginBtn";
import Header from "#/header";
import style from "./style";
@inject("user")
@observer
export default class Profile extends Component {
  componentWillMount() {
    /*  console.log(this.props); */
  }

  render() {
    let user = this.props.user;
    return (
      <div className={style.profile}>
        <Header />
        <div className="animated fadeIn">
          <img src={user.userData.photoUrl} alt="" />
          <h1>Tài khoản : {user.userData.name}</h1>
          <br />
          <br />
          <Button size="large" loading={user.loading} type="danger" onClick={() => user.logout()}>
            Đăng xuất
          </Button>
          <br />
          <br />
          <br />
          <br />
          <Link href="/">
            <h2>
              {" "}
              <u>Trở về trang chủ</u>
            </h2>{" "}
          </Link>
        </div>
      </div>
    );
  }
}
