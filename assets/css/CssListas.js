
import { StyleSheet } from "react-native";

const cssListas = StyleSheet.create({
    
    container:{
        flex: 1,
        backgroundColor:'#e8e2e2'
    },
    barraSuperior:{
        paddingTop:77,
        alignItems: 'center',
        backgroundColor:"rgb(93, 176, 218)",
        paddingBottom:20,
        flexDirection:'row',
        justifyContent:'center'
    },
    titulo:{
        fontSize:18,
        color:"#fff",
        fontWeight:'bold',
        bottom:13
    },
    containerLista:{
     alignItems:'center',
     margin:10,
     marginBottom:210,
     marginTop:60,
    },
    espacoLista:{
        backgroundColor:'#ffffff',
        width:270,
        borderWidth:1,
        margin:1,
        padding:3,
        alignItems:'center'
    },
    textoItem:{
        fontSize:18,
        fontWeight:'bold'
    },
    icon_eyeCadastro:{
        color:'#ffffff',
        top:7,
        left:70,
              
      }
    
  });

  export {cssListas};