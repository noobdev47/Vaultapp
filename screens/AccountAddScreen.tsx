import React, { Component } from 'react';
import { Button, Image, StyleSheet, TextInput, View } from 'react-native';

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

interface Props {}

class AccountAddScreen extends Component<Props, AddScreenState> {
    passTextInput: React.RefObject<TextInput>;
    titleTextInput: React.RefObject<TextInput>;

    constructor(props: Props){
        super(props);
        this.state={ id: 0, site: "", passText: "", titleText: "", passPlaceholder: "Account Password", titlePlaceholder: "Email Address/Username", accountTitle: "", accountPass: "", value: "", onChangeText: ""};
        this.passTextInput = React.createRef();
        this.titleTextInput = React.createRef();
    }

    render() {
        const clear = () => {
            this.titleTextInput.current?.clear();
            this.passTextInput.current?.clear();
        }

        const add = (title: string, pass: string, site: string, id: number) => {
            let account = {name: title, password: pass, website: site, id: id + 1};
            //Add Storage Solution
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