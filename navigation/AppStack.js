import React from 'react';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import Home from '../views/areaRestrita/Home';
import Login from '../views/Login';
import Cadastro from '../views/Cadastro';
import CadastroEndereco from '../views/areaRestrita/CadastroEndereco';
import Perfil from '../views/areaRestrita/Perfil';
import { RaioBusca } from '../views/Index';
import AdicionaItensLista from '../views/areaRestrita/telasBusca/AdicionaItensLista';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabNavigator from '../views/areaRestrita/TabNavigator'
import MudarNome from '../views/areaRestrita/configPerfil.js/MudarNome';
import MudarEmail from '../views/areaRestrita/configPerfil.js/MudarEmail';
import MudarSenha from '../views/areaRestrita/configPerfil.js/MudarSenha';

const Stack = createStackNavigator();


  async function teste(){
   let resData=await AsyncStorage.getItem('userData');
    console.log(JSON.parse(resData));
  }
  teste();
  /*initialRouteName="Home"*/

const AppStack = () =>{

    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="Login" 
          component={Login} 
        />
         <Stack.Screen 
          name="TabNavigator" 
          component={TabNavigator} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
        <Stack.Screen 
          name="Perfil" 
          component={Perfil} 
        />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        
        <Stack.Screen 
          name="CadastroEndereco" 
          component={CadastroEndereco} 
        />
        <Stack.Screen 
          name="RaioBusca" 
          component={RaioBusca} 
        />
         <Stack.Screen 
          name="AdicionaItensLista" 
          component={AdicionaItensLista} 
        />
         <Stack.Screen 
          name="MudarNome" 
          component={MudarNome} 
        />
        <Stack.Screen 
          name="MudarSenha" 
          component={MudarSenha} 
        />
        <Stack.Screen 
          name="MudarEmail" 
          component={MudarEmail} 
        />

      </Stack.Navigator>
    )

}

export default AppStack;