import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ItemSeparator from "../components/ItemSeperator";
import ListItem from "../components/ListItem";
import { FloatingAction } from "react-native-floating-action";


interface Account {
    id: number;
    site: string;
    accountTitle: string;
    accountPass: string;
  }

interface Props {
  navigation: any;
}

class AccountsScreen extends Component<Props> {

    accounts: Array<Account> = [{id: 1, site: "",accountTitle: "g@gmail.com", accountPass: "123"}, 
                                {id: 2, site: "",accountTitle: "h@yahoo.com", accountPass: "123"}]

    actions = [
      {
        //text: "Remove Account",
        icon: require("../assets/trashbin.png"),
        name: "btn_Remove",
        color: "#ff6600",
        position: 2,
      },
      {
        // text: "Add Account",
        icon: require("../assets/addIcon.png"),
        name: "btn_Add",
        position: 1,
        color: "#ff6600"
      }
    ];
  
    render() {
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          data={this.accounts}
          renderItem={({item}) => {
            return(
              <ListItem 
                id={item.id}
                site={item.site}
                accountTitle={item.accountTitle}
                accountPass={item.accountPass}
              />   
            )
          }}
          keyExtractor = {(item) => item.id.toString()}
        />
        <FloatingAction
          actions={this.actions}
          color="#ff6600"
          onPressItem={name => {
            if(name === "btn_Add") {
              this.props.navigation.navigate('Add Account');
            }
          }}
        />
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });

  export default AccountsScreen;
