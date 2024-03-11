import React, {useState, useEffect} from "react";
import {Text, View, Button, Alert, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import { cssPerfil } from "../../../assets/css/CssPerfil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import index from '../../../config/index.json';

export default function MudarEmail({navigation}){

    const[usuarioId,setUsuarioId ]=useState(null);
    const[usuarioEmail, setUsuarioEmail]=useState(null);
    const[novoEmail, setNovoEmail]=useState(null);
    let troca

    useEffect(() =>{
        async function getUsuario(){
            let response=await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setUsuarioEmail(json.email);
            setUsuarioId(json.id);
        }
        getUsuario();

    },[troca]);

     
    async function sendForm(){
        if(novoEmail==null||novoEmail==" "){
            Alert.alert
                ('O campo está vázio',
                'O campo de novo nome não pode ser enviado Vázio',   
                [
                {
                    text:'ok'             
                }
                ]);
        }else{
            let response =await fetch(index.servidor+'/updateEmail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    id:usuarioId,
                    email:novoEmail
            })

        });
        let json=await response.json();
        if(json==='error'){
            Alert.alert
            ('Email invalido',
            'email invalido ou repetido',   
            [
            {
                text:'ok'             
            }
            ]);
        }else{
            troca=json.email
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
                <Text style={cssPerfil.titulo}>Alterar Email</Text>
            </View>
            <View style={cssPerfil.CampoUpdate} >
                <View style={cssPerfil.campo}>
                    <Text style={cssPerfil.campoTitulo}>Novo Email:</Text>         
                    <TextInput 
                        placeholder={usuarioEmail}
                        style={cssPerfil.campoTexto}
                        keyboardType='text' 
                        onChangeText={text=>setNovoEmail(text)}>
                    </TextInput>

                </View>  
            </View>
            <View>
                <TouchableOpacity style={cssPerfil.botaoCriarLista} onPress={()=>sendForm()} >
                    <Text style={cssPerfil.botaoText}>Concluir Ajuste</Text>         
                </TouchableOpacity>  
            </View>  


                  
        </SafeAreaView>
    );


}
