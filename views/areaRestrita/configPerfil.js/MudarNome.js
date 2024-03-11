import React, {useState, useEffect} from "react";
import {Text, View, Alert, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import { cssPerfil } from "../../../assets/css/CssPerfil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import index from '../../../config/index.json';

export default function MudarNome({navigation}){

    const[usuario,setUsuario ]=useState(null);
    const[usuarioId,setUsuarioId ]=useState(null);
    const[novoNome,setNovoNome ]=useState(null);
    let troca

    useEffect(() =>{
        async function getUsuario(){
            let response=await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setUsuario(json.nome);
            setUsuarioId(json.id);
        }
        getUsuario();

    },[troca]);

    
    async function sendForm(){
        if(novoNome==null||novoNome==" "){
            Alert.alert
                ('O campo está vázio',
                'O campo de novo nome não pode ser enviado Vázio',   
                [
                {
                    text:'ok'             
                }
                ]);
        }else{
            let response =await fetch(index.servidor+'/update', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    id:usuarioId,
                    nome:novoNome
            })

        });
        let json=await response.json();
         troca=json.nome
        let userData=await AsyncStorage.setItem('userData', JSON.stringify(json));
        navigation.navigate('TabNavigator', { 
            screen: 'Inicio', 
            params: {
                troca:troca
            }});
        }

    }

    return(
        <SafeAreaView style={cssPerfil.container}>
            <View style={cssPerfil.barraSuperior}>
                <Text style={cssPerfil.titulo}>Alterar Nome</Text>
            </View>
            <View style={cssPerfil.CampoUpdate} >
                <View style={cssPerfil.campo}>
                    <Text style={cssPerfil.campoTitulo}>Digite o novo Nome:</Text>         
                    <TextInput 
                        placeholder={usuario}
                        style={cssPerfil.campoTexto}
                        keyboardType='text' 
                        onChangeText={text=>setNovoNome(text)}>
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
