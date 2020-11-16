import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ListEmpty = () => {

    return (
        <View style={styles.mainView}>
            <Text style={styles.text}>No Accounts available</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        marginTop: 240,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 30,
        color: "#8c8c8c"
    }
});

export default ListEmpty;