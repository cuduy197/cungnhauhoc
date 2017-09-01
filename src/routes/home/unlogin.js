import FacebookLoginBtn from "#/FacebookLoginBtn";
@inject("user")
@observer
export default class Login extends React.Component {
  render() {
    let user = this.props.user;
    return (
      <div className="animated fadeInDown">
        <div>
          <br />
          <h1>Chào mừng bạn đến trang thử nghiệm 👋</h1>
          <br />
        </div>
        <div onClick={() => user.login()}>
          <FacebookLoginBtn />
        </div>

        <br />
        <br />
        <br />
        <b>* Khi đăng nhập, đăng ký bạn đã đồng ý với điều khoản sử dụng </b>
      </div>
    );
  }
}
