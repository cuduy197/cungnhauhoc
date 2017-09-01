import "./style";
import { LocaleProvider } from "antd";
import viVN from "antd/lib/locale-provider/vi_VN";
import Header from "#/header";

import Home from "~/home";
import Profile from "~/profile";
/* import Home from "async!./home";
import Profile from "async!./profile"; */
//Mobx
import userStore from "@/mobx/userStore";
import liveStore from "@/mobx/liveStore/index";

import AppRouter from "@/AppRouter";
export default class App extends Component {
  /*   handleRoute = e => {
          this.currentUrl = e.url;
        }; */
  render() {
    return (
      <LocaleProvider locale={viVN}>
        <Provider user={userStore} live={liveStore}>
          <AppRouter />
        </Provider>
      </LocaleProvider>
    );
  }
}
