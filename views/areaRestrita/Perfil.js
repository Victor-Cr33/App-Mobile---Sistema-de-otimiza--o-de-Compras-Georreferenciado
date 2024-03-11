import React, {useState, useEffect} from "react";
import {Text, View, Button, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import { cssPerfil } from "../../assets/css/CssPerfil";

export default function Perfil({navigation}){

    return(
        <SafeAreaView style={cssPerfil.container}>
            <View style={cssPerfil.barraSuperior}>
                <Text style={cssPerfil.titulo}>Configurações do Usuário</Text>
            </View>
            <View>
            <View style={cssPerfil.opcoes} >
                <TouchableOpacity style={cssPerfil.botaoCriarLista} onPress={()=>navigation.navigate('MudarNome')}  >
                    <Text style={cssPerfil.botaoText}>Alterar Nome</Text>         
                </TouchableOpacity>   
                <TouchableOpacity style={cssPerfil.botaoCriarLista}  onPress={()=>navigation.navigate('MudarEmail')}  >
                    <Text style={cssPerfil.botaoText}>Alterar Email</Text>         
                </TouchableOpacity>          
                <TouchableOpacity style={cssPerfil.botaoCriarLista}   onPress={()=>navigation.navigate('MudarSenha')} >
                    <Text style={cssPerfil.botaoText}>Alterar Senha</Text>         
                </TouchableOpacity>  
                <TouchableOpacity style={cssPerfil.botaoCriarListaEndereco}>
                    <Text style={cssPerfil.botaoText}>Alterar meu Endereço</Text>         
                </TouchableOpacity>           
            </View>
            </View>

                  
        </SafeAreaView>
    );


}
