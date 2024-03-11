import { StyleSheet } from "react-native";

const cssPerfil = StyleSheet.create({
    
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
    opcoes:{
        marginTop:50
    },
    botaoCriarLista:{
        padding:7,
        backgroundColor:'#fff',
        width:170,
        alignSelf:'center',
        borderWidth:3,
        borderRadius:15,
        borderColor:'#5eb0da',
        margin:10
    },
    botaoCriarListaEndereco:{
        margin:5,
        padding:7,
        backgroundColor:'#fff',
        width:180,
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
    CampoUpdate:{
        marginTop:30,
        
        borderWidth:2,
        margin:20
    },
    campo:{
        alignItems:'flex-end',
        flexDirection:'row',
        margin:5,

    },
    campoTitulo:{
        fontSize:16,
        fontWeight:'bold',
        margin:5
    },
    campoTexto:{
        fontSize:16,
        margin:2,

    }

});

export {cssPerfil};