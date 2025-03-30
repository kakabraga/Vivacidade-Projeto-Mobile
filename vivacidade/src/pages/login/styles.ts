import { Dimensions, StyleSheet } from "react-native";
import {themas} from "../../global/themes";
export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxTop: {
        height:Dimensions.get('window').height/3,
        width: "100%",
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxMid: {
        height:Dimensions.get('window').height/4,
        width: "100%",
        backgroundColor: 'green',
        paddingHorizontal: 37 
    },
    boxBottom: {
        height:Dimensions.get('window').height/3,
        width: "100%",
        backgroundColor: 'blue'
    },
    logo: {
        width: 80,
        height: 80,
    },
    text: {
        fontWeight: 'bold',
        marginTop: 40,
    },
    titleInput: {
        marginLeft: 5,
        color: themas.colors.gray,
    },

})