import React, {useState, useEffect} from "react";
import {Text, View,SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { cssTab } from "../../assets/css/CssTab";
import { CssHome } from "../../assets/css/CssHome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';

export default function Home({navigation, route}) {


    const[usuario,setUsuario ]=useState(null);
    const[busca,setBusca ]=useState(false);
    
    const[text,setText ]=useState("");
    const [enderecoUsuario, setEnderecoUsuario]=useState({
        latitude:-24.704866900133915,
        longitude:-51.91606624773333,
        latitudeDelta: 5.0043,
        longitudeDelta: 5.0034
    });
    
    useEffect(() =>{
        async function getUsuario(){
            let response=await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setUsuario(json.nome);
        }
        getUsuario();
        verificaBusca()
        console.log("veio da pesquisa?",busca)
        if(busca===true||busca==="true"){
            AdicionaBusca() 
        }

        if(route.params?.answer){
            console.log('Envio com sucesso');
        }

    },[route.params?.answer]);

    async function verificaBusca(){
        let response=await AsyncStorage.getItem('userSearch');
        let json=await JSON.parse(response);
        if(json !== null){
            setBusca(json)
        }
        else{
            console.log("sem busca recente")
        }
    } 
    
    async function AdicionaBusca(){
        let response=await AsyncStorage.getItem('userAdress');
            let json=await JSON.parse(response);
            if(json !== null){
                setEnderecoUsuario({
                    latitude:parseFloat(json.latitude),
                    longitude:parseFloat(json.longitude),
                    latitudeDelta: 0.0100,
                    longitudeDelta: 0.0100
                });        
            }

        setText(" Busca de lista ativada")
        return setText;
    }

    return(
        
        <SafeAreaView style={cssTab.area_superior}>
            <View style={cssTab.cabecalho}>
                <View style={{alignItems:'center'}}>
                    <Text style={cssTab.textoLogo}>BestPrices</Text>
                    <Text style={{paddingLeft:40, fontWeight:"bold"}}> Olá {usuario} {text}!</Text>
                </View>
                <View style={cssTab.botaomenu}>
                    <Text style={cssTab.textoCidade}>Paraná/Paranaguá</Text>
                    <TouchableOpacity style={cssTab.botaoPerfil} >
                        
                        <MaterialCommunityIcons name="account-circle-outline" size={35} style={cssTab.iconeUsuario} onPress={()=>navigation.navigate("Perfil")} />
                        <MaterialCommunityIcons name="checkbox-blank-circle" size={11} style={{color:"#4ce93f"}}/>
                    </TouchableOpacity>
                    <Text style={cssTab.textoPerfil}>Perfil</Text>      
                </View>
            </View>
            <View >
                <View style={{justifyContent:'center', padding:70, margin:18, backgroundColor:'#000'}}>
                    <Text style={{color:'#fff'}}> carrossel melhores preços encontrados</Text>
                </View>
            </View>
            <ScrollView>
                <View style={CssHome.mapContainer}> 
                    <MapView 
                        //ref={mapRef}
                        style={CssHome.map}
                        region={enderecoUsuario} 
                        loadingEnabled={true}   
                        provider={PROVIDER_GOOGLE}    
                        zoomEnabled={false}  
                        toolbarEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                    >
                         {destinoMercado && 
                            <MapViewDirections
                                origin={enderecoUsuario}
                                destination={destinoMercado}
                                apikey={index.googleMapsApi}
                                strokeWidth={3}
                                onReady={result=>{  
                                        setDistancia(result.distance)
                                    mapaRefe.current.fitToCoordinates(
                                        result.coordinates,{
                                            edgePadding:{
                                                top:50,
                                                bottom:50,
                                                left:50,
                                                right:50
                                            }
                                        }
                                        
                                    )
                                    
                                    }
                                }
                                                    
                            />
                        }
                        <Marker 
                        
                        coordinate={enderecoUsuario} title="Você" 

                        />
                    </MapView>
                </View>
            </ScrollView>
        </SafeAreaView>
        
        
    );
};



