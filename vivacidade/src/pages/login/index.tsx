import React from "react";
import { Text, View, Image, TextInput} from "react-native";
import { style } from "./styles";
import Logo from "../../assets/logo.png";
export default function Login() {
  return (

  <View style={style.container}>
        <View style={style.boxTop}>
           <Image
           source={Logo}
           style={style.logo}
           resizeMode="contain"
           />
           <Text style={style.text}>Bem Vindo de Volta</Text>
        </View>
        <View style={style.boxMid}>
        <Text style={style.titleInput}>ENDEREÇO DE E-EMAIL</Text>
        <TextInput/>
        <Text>SENHA</Text>
        <TextInput/>
        </View>
        <View style={style.boxBottom}>
            
        </View>
  </View>
  );
}
