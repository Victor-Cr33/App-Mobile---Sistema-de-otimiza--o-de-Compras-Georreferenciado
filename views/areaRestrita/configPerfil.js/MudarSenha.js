import React, {useState, useEffect} from "react";
import {Text, View, Button, Alert, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import { cssPerfil } from "../../../assets/css/CssPerfil";
import { css } from "../../../assets/css/Css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import index from '../../../config/index.json';

export default function MudarSenha({navigation}){
    
    const[usuarioId,setUsuarioId ]=useState(null);
    const[usuarioSenha, setUsuarioSenha]=useState(null);
    const[senha, setSenha]=useState(null);
    const[confSenha, setConfSenha]=useState(null);
    const [errorSenha, setErrorSenha]=useState(null);
    const [errorConfSenha, setErrorConfSenha]=useState(null);
    const[esconderSenha, setEsconderSenha] = React.useState(senha);
    let erroValidacao = false;

    let troca

    useEffect(() =>{
        async function getUsuario(){
            let response=await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setUsuarioSenha(json.senha);
            setUsuarioId(json.id);
        }
        getUsuario();

    },[troca]);

    const validacaoCampos=()=>{
        
        validaSenha(true);

        if(senha==null||senha==''){
            setErrorSenha('O campo do senha é obrigatório')
            erroValidacao= true
        }
        if(confSenha==null||confSenha==''){
            setErrorConfSenha('O campo de confirmação de senha é obrigatório')
            erroValidacao= true
        }
        else if(senha!==confSenha){
            setErrorSenha('A senha e confirmação de senha devem ser iguais')
            setErrorConfSenha('A senha e confirmação de senha devem ser iguais')
            erroValidacao= true
        }
        else if(erroValidacao==false){
            sendForm()
        }

    }

    const validaSenha=(value)=>{
        let contemNumero = /^(?=.*[0-9]).*$/;
        let tamanhoMinimo = /^.{8,16}$/;
        let semEspaco =  /^\S*$/;
       
        if(value==true){
            if(!contemNumero.test(senha)){
                setErrorSenha('Sua senha deve ter no minimo 1 digito')
                setErrorConfSenha('Sua senha deve ter no minimo 1 digito')
                erroValidacao=true
            }
            if(!tamanhoMinimo.test(senha)){
                setErrorSenha('Sua senha deve ter entre 6 a 16 caracteres')
                setErrorConfSenha('Sua senha deve ter entre 6 a 16 caracteres')
                erroValidacao=true
            }
            if(!semEspaco.test(senha)){
                setErrorSenha('Sua senha não pode ter espaço entre caracteres')
                setErrorConfSenha('Sua senha não pode ter espaço entre caracteres')
                erroValidacao=true  
            }
        }
    }

    async function sendForm(){
        if(senha==null||senha==" "){
            Alert.alert
                ('O campo está vázio',
                'O campo de novo nome não pode ser enviado Vázio',   
                [
                {
                    text:'ok'             
                }
                ]);
        }
        else if(confSenha==null||confSenha==" "||confSenha!==senha){
            Alert.alert
                ('O campo está vázio',
                'O campo de novo nome não pode ser enviado Vázio',   
                [
                {
                    text:'ok'             
                }
                ]);
        }
        else{
            let response =await fetch(index.servidor+'/updateSenha', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    id:usuarioId,
                    senha:senha
            })

        });
        let json=await response.json();
        if(json==='error'){
            Alert.alert
            ('Senha invalido',
            'Você utilizou a senha antiga',   
            [
            {
                text:'ok'             
            }
            ]);
        }else{
            troca=json.senha
            let userData=await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('TabNavigator', { 
                screen: 'Inicio', 
            });
            }
        }
    }

    return(
        <SafeAreaView style={cssPerfil.container}>
            <View style={cssPerfil.barraSuperior}>
                <Text style={cssPerfil.titulo}>Alterar Senha</Text>
            </View>
            <View style={{margin:20}}>
                <View>
                    <View  style={css.botaoCadastro}>
                        <MaterialCommunityIcons name="lock" size={20} style={css.icon_cadastro} />
                        <TextInput 
                            placeholder={"senha antiga "+usuarioSenha}
                            onChangeText={text=>{
                                setSenha(text)
                                setErrorSenha(null)
                            }}
                            secureTextEntry={!esconderSenha} 
                            style={css.campoCadastro}    
                        />
                        <Text style={css.mensagemErro}>{errorSenha}</Text>
                    </View>
                    <MaterialCommunityIcons name="eye" size={30} style={css.icon_eyeCadastro} onPress={()=> setEsconderSenha(!esconderSenha)}/>
                </View>

                <View>
                    <View  style={css.botaoCadastro}>
                        <MaterialCommunityIcons name="lock-outline" size={20} style={css.icon_cadastro} />
                        <TextInput 
                            placeholder="Confirme sua Senha"  
                            onChangeText={text=>{
                                setConfSenha(text)
                                setErrorConfSenha(null)
                            }}
                            secureTextEntry={!esconderSenha} 
                            style={css.campoCadastro}
                        />
                        <Text style={css.mensagemErro}>{errorConfSenha}</Text>
                    </View>
                    <MaterialCommunityIcons name="eye" size={30} style={css.icon_eyeCadastro} onPress={()=> setEsconderSenha(!esconderSenha)}/>
                </View>
            </View>
            <View>
                <TouchableOpacity style={cssPerfil.botaoCriarLista} onPress={()=>validacaoCampos()} >
                    <Text style={cssPerfil.botaoText}>Concluir Ajuste</Text>         
                </TouchableOpacity>  
            </View>  

                  
        </SafeAreaView>
    );


}
