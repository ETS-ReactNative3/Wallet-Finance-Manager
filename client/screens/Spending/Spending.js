import React from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Button,
  Text,
  Body,
  Form,
  Picker,
  Card,
  CardItem,
} from "native-base";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";

import { connect } from "react-redux";
import { fetchTransactions } from "../../store/spending";
import { fetchAccounts } from "../../store/accounts";
import { ThemeConsumer } from "react-native-elements";

export class SpendingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: this.props.accounts.data[0].name,
      loaded: false,
      currentAccount: "",
    };
    this.calculateNetTotal = this.calculateNetTotal.bind(this);
    this.calculateAccountTotal = this.calculateAccountTotal.bind(this);
    // this.getAmountsPerTransaction = this.getAmountsPerTransaction.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchAccounts(this.props.user.id);
    this.props.fetchTransactions(this.props.user.id);
    this.setState({ loaded: true });
  }

  onHandleChange(value) {
    this.setState({
      selectedAccount: value,
    });
  }

  calculateNetTotal(items) {
    let total = 0;
    items.forEach((item) => {
      total += item.available_balance;
    });
    return total;
  }

  calculateAccountTotal(item) {
    return item.available_balance;
  }

  render() {
    const accounts = this.props.accounts.data;
    const transactions = this.props.transactions;
    const acctInfo = accounts.filter((el) => {
      return el.name === this.state.selectedAccount;
    });
    let id = "";
    for (let i = 0; i < acctInfo.length; i++) {
      id = acctInfo[i].account_id;
    }
    const info = transactions
      .filter((account) => {
        return account.accountId === id;
      })
      .splice(0, 7);
    // const months = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "Jul",
    //   "Aug",
    //   "Sep",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];

    // const monthByNums = info.map((el) => {
    //   return Number(el.date.slice(5, 7) - 1);
    // });
    // const arr = [];
    // for (let i = 0; i < monthByNums.length; i++) {
    //   let digit = monthByNums[i];
    //   arr.push(months[digit]);
    // }
    // let newMonthArr = [arr[0] + info[0].date.slice(7)];
    // for (let i = 0; i < arr.length; i++) {
    //   let current = arr[0];
    //   if (arr[i] !== current) {
    //     newMonthArr.push(arr[i] + info[i].date.slice(7));
    //     current = arr[i];
    //   }
    // }
    return (
      <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          style={{ backgroundColor: "#222831", height: 125 }}
        >
          <Body>
            <Text
              style={{
                color: "#D75452",
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {this.state.selectedAccount}
            </Text>
            <Text style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 20, color: "white" }}>
                Available Balance:{" "}
              </Text>
              <Text
                style={{ color: "#d3dbff", fontSize: 20, fontWeight: "bold" }}
              >
                ${this.calculateNetTotal(accounts)}
              </Text>
            </Text>
            <Form style={{ alignSelf: "center" }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon style={{ color: "white" }} name="arrow-down" />}
                placeholder="Check transactions for other accounts"
                onValueChange={this.onHandleChange}
              >
                {this.props.accounts.data.length
                  ? this.props.accounts.data.map((account) => {
                      return (
                        <Picker.Item
                          key={account.id}
                          label={account.name}
                          value={account.name}
                        />
                      );
                    })
                  : null}
              </Picker>
            </Form>
          </Body>
        </Header>

        <Content style={{ padding: 20 }}>
          <LineChart
            data={{
              labels: info
                .map((el) => {
                  return el.date.slice(5);
                })
                .reverse() || [0],
              datasets: [
                {
                  data: info.length
                    ? info
                        .map((el) => {
                          return el.amount * -1;
                        })
                        .reverse()
                    : [0, 0, 0, 0],
                },
              ],
            }}
            width={Dimensions.get("window").width - 40} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#6CBDC3",
              backgroundGradientFrom: "#6CBDC3",
              backgroundGradientTo: "#82E0AA",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 10,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 25,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Latest Transactions
          </Text>
          {info.length ? (
            info.map((item, index) => {
              return (
                <Card key={index} style={{ borderRadius: 8 }}>
                  <CardItem style={{ borderRadius: 8 }}>
                    <Body>
                      <Text style={{ fontWeight: "500", borderRadius: 20 }}>
                        {item.name}
                      </Text>
                      <Text style={{ alignSelf: "flex-end" }}>
                        <Text>{item.date}</Text>
                      </Text>
                      {item.amount < 0 ? (
                        <Text style={{ color: "green", fontWeight: "bold" }}>
                          ${item.amount * -1}
                        </Text>
                      ) : (
                        <Text style={{ color: "#D75452", fontWeight: "bold" }}>
                          -${"" + item.amount}
                        </Text>
                      )}
                    </Body>
                  </CardItem>
                </Card>
              );
            })
          ) : (
            <Text style={{ alignSelf: "center" }}>
              There are no transactions for this account
            </Text>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    accounts: state.accounts,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTransactions: (id) => dispatch(fetchTransactions(id)),
  fetchAccounts: (id) => dispatch(fetchAccounts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendingScreen);
