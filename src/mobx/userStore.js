import Parse from "parse";
import * as firebase from "firebase/app";
import "firebase/auth";

Parse.initialize("cunghoctot");
Parse.serverURL = "http://35.185.176.28:1337/parse";

firebase.initializeApp({
  apiKey: "AIzaSyBYlx5vhfo7tcjs0tkcsySNHASlgysfVYU",
  authDomain: "react-easy-spa-17.firebaseapp.com"
});

const defaultValue = { name: "khách", username: "", id: "", uid: "" };
class userStore {
  //data
  @observable isLogin = null;
  @observable loading = false;
  @observable ui = { isClickLogin: false };
  @observable userData = defaultValue;

  /**
 * checkAuth --> firebase (!login ,parse login -> login_result) --> parse (!login->new user) --> login_result
 * login <-> logout --> unlogin
 */
  @action
  checkAuth = () => {
    this.loading = true;
    console.log("%c😎 Kiểm tra đăng nhập ...", "color: orange");

    firebase.auth().onAuthStateChanged(userFirebase => {
      if (userFirebase) {
        console.log(`%c😍 Đã đăng nhập firebase: ${userFirebase.displayName} 👌`, "color: green");
        let payload = {
          name: userFirebase.displayName,
          email: userFirebase.email,
          uid: userFirebase.uid,
          id: userFirebase.providerData[0].uid,
          photoUrl: userFirebase.providerData[0].photoURL
        };

        if (Parse.User.current() !== null) {
          this.login_result(payload);
          this.loading = false;
        } else {
          //Login Parse
          Parse.User
            .logIn(payload.id, payload.uid)
            .then(userParseLogin => {
              this.loading = false;
              this.login_result(payload);
            })
            .catch(e => {
              //Register new user when can't login
              var ParseNewUser = new Parse.User();
              ParseNewUser.set("username", payload.id);
              ParseNewUser.set("name", payload.name);
              ParseNewUser.set("password", payload.uid);
              ParseNewUser.set("uid", payload.uid);
              ParseNewUser.set("fb_id", payload.id);
              payload.email !== null && ParseNewUser.set("email", payload.email);

              ParseNewUser.signUp()
                .then(newUser => newUser.setACL(new Parse.ACL(Parse.User.current())).save())
                .then(() => {
                  this.loading = false;
                  this.login_result(payload);
                })
                .catch(e => {
                  console.log("Có lỗi : " + e.message);
                  firebase.auth().signOut();
                  localStorage.clear();
                  document.body.innerHTML = `<div style='text-align:center; padding-top: 12em;' class='animated infinite flash'> <h1 >😕 Có lỗi , đang tải lại trang ...</h1> </div>`;
                  setTimeout(() => window.history.go(0), 500);
                });
            });
        }
      } else {
        this.loading = false;
        console.log("%c😮 Bạn chưa đăng nhập firebase facebook...", "color: red");
        //For Parse login with pass
        if (Parse.User.current() !== null) {
          this.loading = false;
          console.log("%c🤓 Bạn đã đăng nhập Parse ...", "color: green");
          this.login_result({
            name: Parse.User.current().get("name"),
            email: Parse.User.current().get("email"),
            username: Parse.User.current().get("username"),
            id: Parse.User.current().id,
            fb_id: Parse.User.current().get("fb_id"),
            uid: Parse.User.current().get("uid")
          });
        } else {
          this.unlogin();
          console.log("%c😳 Bạn chưa đăng nhập Parse ...", "color: red");
        }
      }
    });
  };

  @action
  login_result = payload => {
    this.userData = payload;
    setTimeout(() => (this.isLogin = true), 777);
  };

  @action
  login = () => {
    this.ui.isClickLogin = true;
    this.loading = true;
    firebase
      .auth()
      .signInWithRedirect(new firebase.auth.FacebookAuthProvider())
      .catch(e => this.showError("😱 Có lỗi khi đăng nhập!, vui lòng thử lại", e));
  };

  //Parse --> Firebase
  @action
  logout = async () => {
    this.loading = true;
    try {
      await Parse.User.logOut();
      await firebase.auth().signOut();

      this.loading = false;
      this.unlogin();
    } catch (e) {
      this.showError("Có lỗi khi đăng xuất!, vui lòng thử lại", e);
    }
  };
  @action
  showError = (msg, e) => {
    this.ui.isClickLogin = false;
    this.loading = false;
    alert(`${msg}`);
    console.log(e);
  };
  @action
  unlogin = payload => {
    this.isLogin = false;
    localStorage.clear();
    this.userData = defaultValue;
  };

  @action changeAndroiBar = color => document.getElementsByName("theme-color")[0].setAttribute("content", color);
} //end class

const user = new userStore();

//⏱ Check auth when start!
user.checkAuth();

// Auto run when observable change!
autorun(() => {
  //console.log(user.userData);
});

export default user;
