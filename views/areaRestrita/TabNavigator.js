import React, { useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CriarListaBusca from "./telasBusca/CriarListaBusca";
import MinhasListas from "./MinhasListas";
import Home from "./Home";

const Tab = createBottomTabNavigator();

export default function TabNavigator({navigation}){

      /*  
        useEffect(() => {
           
            const backAction = () => {
              
                Alert.alert("Alerta!", "Deseja mesmo sair do app?", [
                    {
                        text: "Não",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Sim", onPress: () => {
                        navigation.navigate('Login');
                        
                        }
                    }
                ]);
                return true;
   
            };
        
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
        
            return () => backHandler.remove();
        }, []);
        */
        return(
        <Tab.Navigator screenOptions={{
            tabBarStyle:{
                backgroundColor:'#5eb0da',
                position:'absolute', 
                borderRadius:100,
                marginBottom:20,
                paddingBottom:3,
                paddingTop:3, 
                marginLeft:18,
                width:350,    
            },
            headerShown:false,
            tabBarInactiveTintColor:'#bbc3c2',
            tabBarActiveTintColor:'#000',
        }}
        initialRouteName="Inicio"
        >
            <Tab.Screen  
                name="Inicio" 
                component={Home}
                options={{
                    tabBarIcon:({color, size})=>(
                        <MaterialCommunityIcons name="home-circle-outline" size={size} color={color}/>           
                    ),
                }}          
            />
            <Tab.Screen 
                name="Buscar Produtos" 
                component={CriarListaBusca}
                options={{
                    tabBarIcon:({color, size})=>(
                        <MaterialCommunityIcons name="text-box-search-outline" size={size} color={color}/>
                    ) 
                }}
            />
            <Tab.Screen 
                name="Minhas Listas" 
                initialParams={{ listTrue: true }}
                component={MinhasListas}
                options={{
                    tabBarIcon:({color, size})=>(
                        <MaterialCommunityIcons name="clipboard-list-outline" size={size} color={color}/>
                    ) 
                }}
            />
            
        </Tab.Navigator>
    );
    


};


