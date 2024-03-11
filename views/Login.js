import React, {useState, useEffect} from "react";
import {Text, View,Alert,Button, KeyboardAvoidingView,Platform, Image, TextInput, TouchableOpacity} from 'react-native';
import { css } from "../assets/css/Css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from 'expo-local-authentication';
import Icon from 'react-native-vector-icons/FontAwesome';
import index from '../config/index.json'

export default function Login({navigation}){

    const [display, setDisplay]=useState('none');
    const [email, setEmail]=useState(null);
    const [senha, setSenha]=useState(null);
    const [login, setLogin]=useState(false); 

    const[esconderSenha, setEsconderSenha] = React.useState(senha);

    useEffect(()=>{
        verificaLogin();
    },[]);

    useEffect(()=>{
        if(login === true){
            biometria();
        }
    },[login]);

    async function verificaLogin(){
        let response=await AsyncStorage.getItem('userData');
        let json=await JSON.parse(response);
        if(json !== null){
            setEmail(json.email);
            setSenha(json.senha);
            setLogin(true);
        }
    }

    async function biometria(){
        console.log('chamei a biometria');
        let compatible=await LocalAuthentication.hasHardwareAsync();
        if(compatible){
            let biometricRecords = await LocalAuthentication.isEnrolledAsync();
            if(!biometricRecords){
                alert('Biometria não cadastrada');
            }else{
                let result=await LocalAuthentication.authenticateAsync();
                if(result.success){
                    sendForm();
                }else{
                    setEmail(null);
                    setSenha(null);
                }
            }
        }
    }

    async function sendForm(){
         let response =await fetch(index.servidor+'/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });
        let response2 =await fetch(index.servidor+'/buscaEndereco', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });
        
    let json=await response.json();
    let json2=await response2.json();

        if(json === 'error'){
            setDisplay('flex');
            setTimeout(()=>{
                setDisplay('none');
            },6000);
            await AsyncStorage.clear();
            console.log("limpou login")
        }
        else if(json2==='semEndereco'&&json!=='error'){
            Alert.alert
            ('Conclua seu cadastro de Endereço',
            'Seu cadastro ainda não tem um endereço cadastrado, deseja completar essa etapa para acessar o sistema completo?',
            [{
                text:'Agora não',
               
            },
            {
                text:'Sim', onPress:()=>acessaEnderecoLogado()             
            }
            ]);
        }
        else if(json!=='error'){
            let userData=await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('TabNavigator', { screen: 'Inicio' });
           console.log("logou com endereço")
        }
        const acessaEnderecoLogado= async()=>{
    
            let userData=await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('CadastroEndereco');  
            console.log(json)     
        }
    }
    useEffect(()=>{
        Alert.alert
    });

    return(
        <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"} 
        style={[css.container, css.bgPadrao,]}>
           <View >
                <Image style={css.loginLogo} source={require('../assets/img/teste.png')} />
           </View>
           
           <View>
                <Image style={css.loginTitulo} source={require('../assets/img/titulo.png')} />
     
           </View>
           
           <View >
            <Text style={css.linhaBranca1}>     </Text>
           </View>
        
            <View style={css.login_form} >
                <View style={css.login_input}>
                    <Icon name="envelope" size={15} style={css.icon_input}/>
                    <TextInput style={css.text_input} keyboardType='email-address' placeholder="Email:" onChangeText={text=>setEmail(text)} />

                </View>
                <View style={css.login_input}>
                    <Icon name="lock" size={20} style={css.icon_input} />
                    <TextInput style={css.text_input} placeholder="Senha:"  onChangeText={text=>setSenha(text)}secureTextEntry={!esconderSenha} />
                </View>
                <Icon name="eye" size={25} style={css.icon_eye} onPress={()=> setEsconderSenha(!esconderSenha)}/>

                <TouchableOpacity style={css.login_button} onPress={()=>sendForm()}>
                    <Text style={css.login_buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
           
            <View>
                <TouchableOpacity >
                    <Text style={css.esqueceuSenha}>Esqueceu Sua Senha?</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={css.login_msg(display)}>Email ou Senha incorretos! </Text>
            </View>
            <View>
                <Text style={css.linhaBranca2}>     </Text>
            </View>

            <View>  
               <TouchableOpacity style={css.cadastro_button}>
                    <Text 
                    onPress={()=>navigation.navigate("Cadastro")}
                    style={css.cadastro_buttonText} 
                    >Cadastrar-se</Text>
                    
                </TouchableOpacity>
            </View>
           
        </KeyboardAvoidingView>
        
        
    );


}