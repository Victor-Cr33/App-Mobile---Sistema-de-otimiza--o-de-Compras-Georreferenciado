import { StyleSheet } from "react-native";

const cssMenu = StyleSheet.create({
    
    container:{
        flex: 1
    },
    barraSuperior:{
        paddingTop:77,
        alignItems: 'center',
        backgroundColor:"#5eb0da",
        paddingBottom:20
    },
    titulo:{
        fontSize:18,
        color:"#fff",
        fontWeight:'bold',
        bottom:13
    },
    ListaContainer:{
        marginTop:10,
        margin:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:"#797577"
    },
    listaNome:{
        flexDirection:'row',
        padding:3
    },
    textNome:{
        top:4,
        fontWeight:'bold'
    },
    tituloListaCadastro:{
        alignSelf:'center',
        marginTop:10
    },
    textTitulo:{
        fontWeight:'bold'
    },
    botaoCriarLista:{
        padding:7,
        backgroundColor:'#fff',
        width:170,
        alignSelf:'center',
        borderWidth:3,
        borderRadius:15,
        borderColor:'#5eb0da',
        
    },
    botaoItem:{
        marginTop:10,
        padding:7,
        backgroundColor:'#fff',
        width:190,
        alignSelf:'center',
        borderWidth:3,
        borderRadius:15,
        borderColor:'#5eb0da',
    },
    botaoText:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:16
    },
    itensSelect:{
        paddingHorizontal:20,
        paddingTop:10,
        
    },
    tituloItens:{
        alignSelf:'center',
        marginTop:10,
        marginBottom:6
    }

  });

  export {cssMenu};