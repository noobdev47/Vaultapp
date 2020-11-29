import React, { Component } from 'react';
import { Button, Image, StyleSheet, TextInput, ToastAndroid, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

interface AddScreenState {
    id: number;
    site: string;
    accountTitle: string;
    accountPass: string;
    value: string;
    onChangeText: string;
    titlePlaceholder: string;
    passPlaceholder: string;
    titleText: string;
    passText: string;
}

interface Props {
    navigation: any;
}

class AccountAddScreen extends Component<Props, AddScreenState> {
    passTextInput: React.RefObject<TextInput>;
    titleTextInput: React.RefObject<TextInput>;

    constructor(props: Props){
        super(props);
        this.state={ id: 0, site: "", passText: "", titleText: "", passPlaceholder: "Account Password", titlePlaceholder: "Email Address/Username", accountTitle: "", accountPass: "", value: "", onChangeText: ""};
        this.passTextInput = React.createRef();
        this.titleTextInput = React.createRef();
    }

    async componentDidMount() {
        //Set Id for next account in start by counting previous accounts stored.
        let key = 0;
        
        for(let i = key; i <= 10; i++){
            let account = await SecureStore.getItemAsync(i.toString());
            if(account !== null)
                key++;
            else
                continue;
        }

        this.setState({id: key + 1});
    }

    render() {
        //Clears TextInputs
        const clear = () => {
            this.titleTextInput.current?.clear();
            this.passTextInput.current?.clear();
        }

        //Adds Account to Storage
        const add = async (title: string, pass: string, site: string, id: number) => {
            let account = {accountTitle: title, accountPass: pass, site: site, id: id};
            const key = account.id.toString();
            storage(await SecureStore.isAvailableAsync(), account, key);
        }

        //Dedicated function for Storage Purpose
        const storage = async (storeAvailable: boolean, account: any, key: string) => {
            if(storeAvailable === true) {
                SecureStore.setItemAsync(key, JSON.stringify(account));
                ToastAndroid.show("Account Added", ToastAndroid.SHORT);
            } else
                ToastAndroid.show("Storage not Available", ToastAndroid.SHORT);
        }
        return (
            <View style={styles.container}>
                <View style={styles.textIconView}>
                    <Image style={styles.icon} source={require("../assets/emailIcon.png")} />
                    <TextInput
                        ref={this.titleTextInput}
                        style={styles.textInput} 
                        placeholder={this.state.titlePlaceholder}
                        textContentType={'emailAddress'} 
                        onChangeText={titleText => this.setState({accountTitle: titleText})} 
                        defaultValue={this.state.titleText}
                        selectionColor={"#ff6600"}
                        placeholderTextColor={"#ff6600"}
                    />
                </View>
                <View style={styles.textIconView}>
                    <Image style={styles.icon} source={require("../assets/passwordIcon.png")} />
                    <TextInput
                        ref={this.passTextInput}
                        style={styles.textInput} 
                        placeholder={this.state.passPlaceholder}
                        secureTextEntry={true}
                        onChangeText={passText => this.setState({accountPass: passText})} 
                        defaultValue={this.state.passText}
                        selectionColor={"#ff6600"}
                        placeholderTextColor={"#ff6600"}
                    />
                </View>
                <View style={styles.btnView}>
                    <View style={styles.addBtn}>
                    <Button title="Add" color="#ff6600" onPress={() => {add(this.state.accountTitle, this.state.accountPass, this.state.site, this.state.id)}}/>
                    </View>
                    <View style={styles.clearBtn}>
                    <Button title="Clear" color="#ff6600" onPress={() => clear()}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150
    },
    textInput: {
        margin: 10,
        marginLeft: 5,
        width: 270,
        height: 35,
        borderBottomWidth: 2,
        borderBottomColor: "#ff6600",
        fontSize: 17
    },
    icon: {
        width: 27,
        height: 27,
        marginTop: 7
        
    },
    textIconView: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'stretch',
        borderRadius: 10,
        marginTop: 20
    },
    addBtn: {
        width: 130
    },
    clearBtn: {
        width: 130
    }

});

export default AccountAddScreen;