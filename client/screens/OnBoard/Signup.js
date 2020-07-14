import React, { Component } from "react";
import {
  Container,
  Text,
  Icon,
  Item,
  Form,
  InputGroup,
  Input,
  Button,
  Label,
} from "native-base";
import { connect } from "react-redux";
import { signup } from "../../store/user";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "" };
  }

  render() {
    return (
      <Container>
        <Form style={{ paddingTop: 20 }}>
          <InputGroup>
            <Icon name="ios-person" />
            <Input
              autoCorrect={false}
              placeholder="First Name"
              onChangeText={(text) => this.setState({ firstName: text })}
            />
          </InputGroup>
          <InputGroup>
            <Icon name="ios-person" />
            <Input
              autoCorrect={false}
              placeholder="Last Name"
              onChangeText={(text) => this.setState({ lastName: text })}
            />
          </InputGroup>
          <InputGroup>
            <Icon name="ios-mail" />
            <Input
              placeholder="EMAIL"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={"email-address"}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </InputGroup>
          <InputGroup>
            <Icon name="ios-unlock" />
            <Input
              placeholder="PASSWORD"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
            />
          </InputGroup>
        </Form>
        <Button
          block
          style={{ margin: 20, marginTop: 40 }}
          success
          onPress={() => {
            this.props.handleSubmit(this.state, this.props.navigation);
          }}
        >
          <Text>SIGNUP</Text>
        </Button>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(userInput, navigation) {
      dispatch(signup(userInput, navigation));
    },
  };
};
export default connect(null, mapDispatch)(Signup);
