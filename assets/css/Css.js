import { StyleSheet } from "react-native";

const css = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#ffff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    bgPadrao:{
      backgroundColor:"#5eb0da",
    },
    loginLogo:{
      width: 159,
      height: 131,
      paddingTop:130
    },

    loginTitulo:{
      marginTop:20,
      width: 230,
      height: 40,
    },
    linhaBranca1:{
      borderBottomColor: "#ffffff",
      borderBottomWidth: 1,
      borderRadius: 1,
      paddingLeft:300,
      marginBottom:10
      
    },
  
    login_msg:(text='none')=>({
      fontWeight:"Bold",
      fontSize:20,
      color:"red",
      display: text,
      marginTop:10
    }),

    login_form:{
      paddingTop:40,
      width:"80%"
    },

    login_input:{
      backgroundColor: "#ffffff",
      fontSize: 19,
      padding: 7,
      marginBottom: 15, 
      borderWidth:1,
      flexDirection:'row'
    },
    icon_input:{
      color:'#000',
      paddingTop:4,
      paddingRight:3
    },
    icon_eye:{
      color:'#797577',
      paddingTop:10,
      paddingRight:3,
      position:"absolute",
      bottom:'44%',
      right:5
      
    },
    text_input:{
      fontSize:19,
      paddingRight:8
    },

    login_button:{
      marginTop:3,
      backgroundColor: "#ffffff",
      borderColor: "000",
      borderRadius: 10,
      borderWidth:2,
      alignSelf: "center",
      width:110,
      height:45,
      justifyContent:'center',
    },

    login_buttonText:{
      textAlign:'center',
      color:"000",
      fontSize: 20,
      fontWeight: "bold",
    },

    esqueceuSenha:{
      marginTop:20,
      textDecorationLine:"underline",
      color:"#605E5E",
    },
    linhaBranca2:{
      borderBottomColor: "#ffffff",
      borderBottomWidth: 1,
      borderRadius: 1,
      paddingLeft:280,
      marginTop:50,
      marginBottom:10
    },

    cadastro_button:{
      marginTop:10,
      backgroundColor: "#ffffff",
      borderColor: "000",
      borderRadius: 10,
      borderWidth:2,
      width:140,
      height:45,
      justifyContent: 'center',
    },
    
    cadastro_buttonText:{
      textAlign:'center', 
      color:"000",
      fontSize: 18,
      fontWeight: "bold",
    },

    menuSuperior:{
      backgroundColor: '#5eb0da',

    },
    menuSuperiorTitulo:{
      color:'#fff'
    },

    fundoCadastro:{
      backgroundColor:"#fff",
      flex:1,
      marginTop:138,
      padding:47,
      borderTopLeftRadius:65,
      borderTopRightRadius:65,
  
    },
    tituloCadastro:{
      fontWeight:'bold', 
      fontSize:17,
    },
    subTituloCadastro:{
      fontWeight:'bold',
      marginBottom:50,
      fontSize:15,
      textDecorationLine:'underline'
    },
    botaoCadastro:{
      width:333,
      
    },
    icon_cadastro:{
      color:'#000',
      paddingTop:15,
      paddingLeft:10,
      position:'absolute',
      
    },
    campoCadastro:{
      borderWidth:2,
      borderColor:'#c2c3be',
      borderRadius:16,
      padding:2,
      height:50,
      paddingLeft:30,
      fontSize:16,
    },
    icon_eyeCadastro:{
      color:'#797577',
      paddingRight:3,
      position:"absolute",
      right:10,
      top:8
      
    },
    emailExiste:(text='none')=>({
      fontWeight:"Bold",
      fontSize:16,
      fontWeight:'bold',
      color:"red",
      display: text,
      marginTop:2,
      right:50,
      position:'absolute'
    }),
    mensagemErro:{
      color:'#d30300',
      marginLeft:10,
      margin:5
      
    },

    btProxPagCadastro:{
      justifyContent:'flex-end',
      flexDirection:'row',
      paddingTop:70,
     
    },

    textoBotaoCadastro:{
      paddingTop:15,
      fontSize:16,
      marginRight:3,
      color:'#5eb0da',
      fontWeight:'bold',
    
    },

    botaoNext:{
      color:'#5eb0da'
    }

  });



  export {css};