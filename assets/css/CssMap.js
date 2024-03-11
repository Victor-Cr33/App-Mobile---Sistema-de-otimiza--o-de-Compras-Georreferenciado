import { StyleSheet } from "react-native";

const cssMap = StyleSheet.create({
    fundoTelaEndereco:{
        backgroundColor:"#797577",
        flex:1
    },
    fundoCadastro:{
        backgroundColor:"#5eb0da",
        flex:2,
        marginTop:38,
        paddingTop:25,
        paddingLeft:47,
        paddingRight:47,
        borderTopLeftRadius:65,
        borderTopRightRadius:65,
     
    },
    conteudoTop:{
        justifyContent:"center", 
        alignItems:'center',
          
    },
    usuarioHello:{
        fontSize:16,
        fontWeight:'bold'
    },
    mapContainer:{
        justifyContent:"center", 
        alignItems:'center',
    },
    map: {
        width: 365,
        height:350,
        position:'absolute',
        top:54,
    },
    tituloFormEndereco:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10,
        textDecorationLine:'underline',
        color:'#fff'
    },
    buscaLocalizacao:{
        height:"50%", 
        width:350,
        marginTop:1,
        right:30
    },

    containerBotoes:{
        top:48,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:485,
        left:120,
        
    },
    tituloBotoesBusca:{
        fontSize:16,
        fontWeight:"bold",
        marginBottom:2
    },
    containerTipoBusca:{
        alignItems:'flex-end',
        flexDirection:'row',
    },
    botaoTipoBusca:{
        margin:2,
        backgroundColor:"#fff",
        width:100,
        height:40, 
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        borderWidth:1,
        borderColor:"#000"

    },
    botaoTipoBuscaManual:{
        margin:2,
        backgroundColor:"#fff",
        width:150,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        borderWidth:1,
        borderColor:"#000"
    },
    textoBotaoBusca:{
        color:"#000",
        fontSize:16,
        fontWeight:"bold"
    },

    formularioBusca:{
        position:'absolute',
        top:557,
        justifyContent:"center",
        backgroundColor:"#fff",
        width:340,
        left:20,
        borderWidth:2
    },
    tituloCampoEndereco:{
        left:65,
        fontWeight:'bold'
    },
    camposEndereco:{
        fontWeight:'bold',
        fontSize:10,
        borderBottomWidth:1,
        paddingLeft:3,
        padding:3,
    },
    finalizaCadastro:{
        position:'absolute',
        top:715,
        justifyContent:"center",
        width:340,
        left:110,
    },
    botaoFinaliza:{
        margin:2,
        backgroundColor:"#18e43d",
        width:150,
        height:45,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        borderWidth:2,
        borderColor:"#fff",
    },
    textoBotaoFinaliza:{
        color:"#fff",
        fontSize:16,
        fontWeight:"bold",
       
    },


  });

  export {cssMap};