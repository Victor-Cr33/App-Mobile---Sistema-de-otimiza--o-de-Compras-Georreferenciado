import React from "react";
import {Text, View} from "react-native";
export default function Pagina(props){

    return(
        <View>
            <Text>{props.empresa}
             Nome do produto: {props.produto} quantidade: {props.quantidade} 
            </Text>

        </View>

    );
}