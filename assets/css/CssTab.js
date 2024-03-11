import { StyleSheet } from "react-native";

const cssTab = StyleSheet.create({

    area_superior:{
        flex:1,
        backgroundColor:'#fff',
 
    },
    cabecalho:{
        backgroundColor:'#5eb0da',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:20,
        paddingBottom:6
    },
    botaomenu:{
        flexDirection:'column',
        marginRight:10,
        paddingRight:8,
        alignItems:'flex-end'
    },
    botaoPerfil:{
        alignItems:'flex-end',
        flexDirection:'row'
    },
    textoPerfil:{
        color:"#fff", 
        fontWeight:'bold', 
        paddingRight:10
    },
    textoLogo:{
        color:'#fff',
        fontSize:32,
        paddingLeft:40,
        paddingTop:30
    },
    textoCidade:{
        color:'#fff',
        fontSize:12,
        paddingBottom:15,
        paddingTop:10
    },
   iconeUsuario:{
    color:"#000"
   },
   
   menuInferior:{
    backgroundColor:'#5eb0da',
    position:'absolute',
    borderRadius:100,
    marginLeft:17,
    marginBottom:2,
    paddingBottom:3,
    paddingTop:3,
    width:350
   },
   espacoLista:{
    backgroundColor:'#ffffff',
    width:250,
    borderWidth:2,
    margin:3,
    padding:3,
    alignItems:'center',
},
textoItem:{
    top:10,
    fontSize:20,
    fontWeight:'bold',
    fontStyle:'italic'
},
textoItem2:{
    fontSize:18,
    fontWeight:'bold',
    color:"#6e6c6c",
    top:120,
    left:12
},
   
  });

  export {cssTab};