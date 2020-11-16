import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';

interface Props {
    id: number;
    site: string;
    accountTitle: string;
    accountPass: string;
    // onDelete: (key: number) => void;
}

// const deleteAccount = (key: number, {onDelete}:Props) => {
//    onDelete(key);
// }

const longPressHandler = () => {

}

const ListItem = ({id, site, accountTitle, accountPass,/*onDelete*/}: Props) => {

    if(accountTitle.includes("gmail")){
        site = "Google: ";
    } else if(accountTitle.includes("yahoo")){
        site = "Yahoo: ";
    } else if(accountTitle.includes("outlook")){
        site = "Outlook: ";
    }
    
    return (
        //<TouchableOpacity activeOpacity={1} onLongPress={longPressHandler()} style={styles.listItem}>
            <View style={styles.listItem}>
                <View style={styles.siteDetailView}>
                    <Text style={[styles.title]}>{site}</Text>
                    <Text style={[styles.title]}>{accountTitle}</Text>
                </View>
                <View>
                    <Text style={[styles.pass]}>{accountPass}</Text>
                </View>
            </View>
        //</TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem:{
        padding: 10,
    },
    siteDetailView:{
        flexDirection: 'row'
    },
    title:{
        fontSize: 19,
        color: "#8c8c8c"
    },
    pass:{
        fontSize: 24,
    }
});

export default ListItem;