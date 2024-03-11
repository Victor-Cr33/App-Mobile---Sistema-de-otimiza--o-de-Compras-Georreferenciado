import React, {useState} from "react";
import {Text,TextInput, View,TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { css } from "../assets/css/Css";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAvoidingView } from 'react-native';
import index from '../config/index.json'
import CadastroEndereco from "./areaRestrita/CadastroEndereco";

export default function Cadastro({navigation}){
    
    AsyncStorage.clear();

    const [nome, setNome]=useState(null);
    const [email, setEmail]=useState(null);
    const [senha, setSenha]=useState(null);
    const [confSenha, setConfSenha]=useState(null);

    const [errorNome, setErrorNome]=useState(null);
    const [errorEmail, setErrorEmail]=useState(null);
    const [errorSenha, setErrorSenha]=useState(null);
    const [errorConfSenha, setErrorConfSenha]=useState(null);
    
    const[esconderSenha, setEsconderSenha] = React.useState(senha);
    
    const [emailExiste, setEmailExiste]=useState('none');
    let erroValidacao = false;

    const validacaoCampos=()=>{
        
        validaEmail(true);
        validaSenha(true);

        if(nome==null||nome==''){
            setErrorNome('O campo do nome é obrigatório')
            erroValidacao= true
        }
        if(email==null||email==''){
            setErrorEmail('O campo do email é obrigatório')
            erroValidacao= true
        }
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
    
    const validaEmail=(value)=>{
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    
        if(value==true){
            if(!re.test(email||!regex.test(email))){
                setErrorEmail('O email está em um formato invalido')
                erroValidacao=true
            }
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

        
        let response=await fetch(index.servidor+'/create',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                createAt: new Date(),
                updateAt: new Date(),
            })

        });
      
        let json=await response.json();
        if(json === 'error'){
            setEmailExiste('flex');
            setTimeout(()=>{
                setEmailExiste('none');
            },6000);
            await AsyncStorage.clear();
        }else{
            let userData=await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('CadastroEndereco');


            
        }
    }

    return(
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={[css.container, css.bgPadrao]}>
           <View style={css.fundoCadastro}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={css.tituloCadastro}>
                        Cadastro de Usuário
                    </Text>
                    <Text style={css.subTituloCadastro}>
                        Preecha os Campos Abaixo!
                    </Text>
                </View>
                
                <View style={css.botaoCadastro}>     
                    <Icon name="id-badge" size={20} style={css.icon_cadastro} />
                    <TextInput        
                        placeholder='Seu nome'
                        keyboardType='name'
                        onChangeText={text=>{
                            setNome(text)
                            setErrorNome(null)
                        }}
                        style={css.campoCadastro}
                    />
                    <Text style={css.mensagemErro}>{errorNome}</Text>
                </View>
                <View  style={css.botaoCadastro}>
                <Icon name="envelope" size={17} style={css.icon_cadastro} />
                    <TextInput        
                        placeholder="Seu email @email.com"
                        keyboardType='email-address'
                        onChangeText={text=>{
                            setEmail(text)
                            setErrorEmail(null)
                        }}
                        style={css.campoCadastro}
                        error={errorEmail}
                    />
                     <Text style={css.mensagemErro}>{errorEmail}</Text>
                </View>
                <View>
                    <View  style={css.botaoCadastro}>
                        <MaterialCommunityIcons name="lock" size={20} style={css.icon_cadastro} />
                        <TextInput 
                            placeholder="Senha"  
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
                <View>
                    <Text style={css.emailExiste(emailExiste)}>Verifique se seu email é valido! </Text>
                </View>
                <View>
                    <TouchableOpacity style={css.btProxPagCadastro} onPress={()=>validacaoCampos()}>
                        <Text style={css.textoBotaoCadastro}>
                            Próximo Passo
                        </Text>
                        <Icon name="forward" size={57} style={css.botaoNext}/>
                    </TouchableOpacity>
                    
                </View>

            </View>

        </KeyboardAvoidingView>
        
    );


}
