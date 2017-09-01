import { Router } from "preact-router";
import Home from "~/home";
import Profile from "~/profile";
import RealTime from "~/RealTime";

/* import Home from "async!./home";
import Profile from "async!./profile"; */
@inject("user")
@observer
export default class AppRouter extends Component {
  render() {
    let user = this.props.user;
    return (
      <Router>
        <Home path="/" />
        <Profile path={user.isLogin ? "/me" : "/"} />
        <RealTime path={user.isLogin ? "/live" : "/"} />
        <Home default />
      </Router>
    );
  }
}
