import { Button, Card, Col, Row } from "antd";
import CardNav from "./login/cardNav";
import Header from "#/header";
@inject("user")
@observer
export default class UnLogin extends React.Component {
  render() {
    let user = this.props.user;
    return (
      <div className="animated fadeIn">
        <Header />
        <h1>
          Chúc bạn một ngày tốt lành 🍀 <br /> <u>{user.userData.name}</u>
        </h1>
        <div style={{ padding: "30px" }}>
          <Row gutter={16}>
            <Col sm={24} md={24}>
              <Link href="/live">
                <Card style={{ borderRadius: "15px" }}>
                  <h1 class="black">Vào trang thi đấu</h1>
                  <img width="80" src="https://image.flaticon.com/icons/svg/201/201560.svg" />
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
