import { Form, Icon, Input, Button, Checkbox, Radio, InputNumber } from "antd";

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject("live")
@observer
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        let live = this.props.live;
        live.Form.mode === "create" ? live.ROOMGAME_CREATE(values) : live.ROOMGAME_ENTER(values);
      }
    });
  };

  onChange = e => {
    console.log(`radio checked:${e.target.value}`);
  };

  _create = e => {
    this.props.live.FORM_MODE("create");
    this.handleSubmit(e);
  };
  _enter = e => {
    this.props.live.FORM_MODE("enter");
    this.handleSubmit(e);
  };

  componentDidMount() {
    this.props.form.validateFields();
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const roomNameError = isFieldTouched("name") && getFieldError("name");
    let live = this.props.live;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem validateStatus={roomNameError ? "error" : ""} help={roomNameError || ""}>
          {getFieldDecorator("name", {
            initialValue: live.Form.roomName,
            rules: [{ required: true, message: "Vui lòng nhập tên phòng" }]
          })(
            <Input
              autoFocus
              prefix={<Icon type="edit" style={{ fontSize: 13 }} />}
              type="text"
              placeholder="Nhập tên phòng ..."
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("pass", {
            rules: [{ required: live.Form.requiredPass }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Nhập mật khẩu nếu có ..."
            />
          )}
        </FormItem>

        <FormItem className="center">
          <Button
            loading={live.roomGame.ui.isClickCreate}
            onClick={this._create}
            icon="plus"
            size="large"
            disabled={hasErrors(getFieldsError())}>
            Tạo Phòng
          </Button>{" "}
          <Button
            loading={live.roomGame.ui.isClickEnter}
            onClick={this._enter}
            icon="search"
            size="large"
            disabled={hasErrors(getFieldsError())}>
            Vào Phòng
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);
