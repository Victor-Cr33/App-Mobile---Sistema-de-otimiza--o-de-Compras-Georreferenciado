import { StyleSheet } from "react-native";

const CssRaioBusca = StyleSheet.create({
    
    container:{
        flex: 1,
        backgroundColor:"#5eb0da"
    },
    barraSuperior:{
        paddingTop:77,
        alignItems: 'center',
        backgroundColor:"#fff",
        
    },
    titulo:{
        fontSize:25,
        color:"#5eb0da",
        fontWeight:'bold',
        bottom:20
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
    raioContainer:{
        alignItems:"center",
        marginTop:20,
        backgroundColor:"#fff",
        width:260,
        left:60,
        borderWidth:1,
        padding:10

    },
    inputRaio:{
        marginTop:10,
        borderWidth:1,
        width:100,
        height:50,
        fontSize:20,
        textAlign:'center'
    },
    botaoCriarRaio:{
        marginTop:20,
        padding:7,
        backgroundColor:'#5eb0da',
        width:120,
        alignSelf:'center',
        borderWidth:1,
        borderRadius:15,  
    },
  
    botaoText:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:18,
        color:"#000"
    },
    botaoText2:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:18,
        color:"#fff"
    },
    itensSelect:{
        paddingHorizontal:20,
        paddingTop:10,
        
    },
    tituloItens:{
        alignSelf:'center',
        marginTop:10,
        marginBottom:6
    },
    listContainer:{
        alignContent:"center",
        alignSelf:"center",
        backgroundColor:"#fff",
        width:235,
    },
    mapContainer:{
        justifyContent:"center", 
        alignItems:'center',
        
    },
    map: {
        width: 365,
        height:350,
        top:5
    },
    botaoVerResultado:{
        marginTop:30,
        padding:10,
        backgroundColor:'#fff',
        width:150,
        alignSelf:'center',
        borderWidth:1,
        borderRadius:10,  
    },
    botaoText3:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:20,
        color:"#000"
    }

  });

  export {CssRaioBusca};