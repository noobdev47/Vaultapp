import React, { Component } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ItemSeparator from "../components/ItemSeperator";
import ListItem from "../components/ListItem";
import { FloatingAction } from "react-native-floating-action";
import * as SecureStore from 'expo-secure-store';
import ListEmpty from "../components/ListEmpty";

interface Account {
    id: number;
    site: string;
    accountTitle: string;
    accountPass: string;
}

interface state {
  accounts: Account[];
  selectedAccounts: number[];
  selectedAccount: number;
  refreshing: boolean;
  longPressActivated: boolean;
}

interface Props {
  navigation: any;
}

class AccountsScreen extends Component<Props, state> {
  constructor(props: Props){
    super(props);
    this.state = {accounts: [], selectedAccount: 0,selectedAccounts: [], refreshing: true, longPressActivated: false};
  }

  accountsArr: Account[] = []

  async componentDidMount() {
    //Set all Arrays to empty.
    this.setState({accounts: [], selectedAccount: 0});
    this.accountsArr = [];
    this.getAccounts();
  }

  //Account Deletion
  handleAccountDeletion = async () => {
    await SecureStore.deleteItemAsync(this.state.selectedAccount.toString());
    this.setState({selectedAccount: 0, accounts:[], longPressActivated: false});
    this.accountsArr = [];
    this.getAccounts();
 }

  //Retrieves accounts from Secure Storage.
  getAccounts = async () => {
   //For loop to iterate over 10 accounts.
   for(let i = 0; i <= 10; i++) {
    let account = await SecureStore.getItemAsync(i.toString());

    if(account !== null)
      this.accountsArr.push(JSON.parse(account));
    else
      continue;
  }
    //Set state to accounts Array.
    this.setState({refreshing: false, accounts: this.accountsArr});
    console.log(this.accountsArr);
 }

 //longPress Handler for deleting Accounts.
 longPressHandler(accountId: number) {
    ToastAndroid.show(accountId.toString(), ToastAndroid.SHORT);
    this.setState({longPressActivated: true, selectedAccount: accountId});
 }

 //RefreshHandler for refreshing manually.
  onRefresh = () => {
    this.setState({refreshing: true, accounts: [], selectedAccount: 0});
    this.accountsArr = [];
    this.getAccounts();
 }

 //Handler for transitioning fab from add to delete and vice versa.
  fabHandler = () => {
    if(this.state.longPressActivated === true)
      this.handleAccountDeletion();
    else 
      this.props.navigation.navigate('Add Account');
  }

  render() {

    //Pull to Refresh Functionality
    if(this.state.refreshing) {
      return(
        <View style={styles.loaderView}>
          <ActivityIndicator size='large' color='#ff6600' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          data={this.state.accounts}
          ListEmptyComponent={<ListEmpty />}
          refreshControl={<RefreshControl colors={['#ff6600']} refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}
          extraData={this.state.selectedAccount}
          renderItem={({item}) => {
            const backgroundColor = item.id === (this.state.selectedAccount) ? "#ff8533" : "white";
            return(
              <TouchableOpacity style={{backgroundColor}} activeOpacity={1} onLongPress={() => this.longPressHandler(item.id)}>
                <ListItem
                  id={item.id}
                  site={item.site}
                  accountTitle={item.accountTitle}
                  accountPass={item.accountPass}
                />
              </TouchableOpacity>
            )
          }}
          keyExtractor = {(item) => item.id.toString()}
        />
        <FloatingAction
          color="#ff6600"
          floatingIcon={this.state.longPressActivated ? require("../assets/trash.png") : require("../assets/plus.png")}
          onPressMain={this.fabHandler}
          distanceToEdge={20}
          showBackground={false}
          buttonSize={50}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loaderView: {
    flex: 1,
    marginTop: 250
  }
});

export default AccountsScreen;
