import React, {useState, useEffect, useRef} from "react";
import {Text, View,SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { cssTab } from "../../assets/css/CssTab";
import { CssHome } from "../../assets/css/CssHome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import index from '../../config/index.json';
import {getDistance, getPreciseDistance} from 'geolib';



export default function Home({navigation, route}) {

    const[usuario,setUsuario ]=useState(null);
    const[raio, setRaio]=useState(0);
    const[ativaMap, setAtivaMap]=useState(false);
    
    const[text,setText ]=useState("");
    const [enderecoUsuario, setEnderecoUsuario]=useState({
        latitude:-24.704866900133915,
        longitude:-51.91606624773333,
        latitudeDelta: 5.0043,
        longitudeDelta: 5.0034
    });
    const[destinoMercado, setDestinoMercado]=useState();
    const[mercados, setMercados]=useState([]);
    const mapaRefe=useRef(null); 
    const[validou, setValidou]=useState(false);
    const [markers, setMarkers]= useState()
    const busca=[]
    let isLoading=false
    const[array, setArray]=useState([]);
    useEffect(() =>{
        async function getUsuario(){
            let response=await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setUsuario(json.nome);
        }
        getUsuario();

        if(route.params?.busca){
            console.log('Envio com sucesso');
            retornoDaBusca()
        }
    },[route.params?.busca]);

    useEffect(() =>{
        async function getUsuario(){
            let response=await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setUsuario(json.nome);
        }
        getUsuario();
        
    },[route.params?.troca]);

    
        async function retornoDaBusca(){
            setMercados([])
            setText(route.params?.busca)
            console.log(route.params?.busca)
            console.log(route.params?.adress)
            console.log(route.params?.raio)
            console.log(route.params?.mercados)
            setEnderecoUsuario(route.params?.adress)
            setRaio(route.params?.raio)
            setAtivaMap(true);
            setMercados(route.params?.mercados)

            setValidou(true)

            setDestinoMercado({
                latitude:-25.530757081839408,
                longitude:-48.54687661324516
            })
        }
    
    useEffect(() =>{
        validaDistancia() 
    },[validou]);
    
    function validaDistancia(){
        for(let i=0; i<mercados.length; i++){    
            var dis = getDistance(
                {latitude: enderecoUsuario.latitude, longitude: enderecoUsuario.longitude},
                {latitude:mercados[i].enderecoLatitude, longitude:mercados[i].enderecoLongitude},
            );
            const teste=dis/1
            if(teste>1000){
                console.log(mercados[i].nome,"-"+dis/1+" metros - longe do raio de busca")
            }
            else{
                //console.log(mercados[i].nome,"-"+dis/1+" metros - dentro do raio de busca")
                //console.log("aqui",teste)
                let aux = ({
                    id:mercados[i].id,
                    nome:mercados[i].nome,
                    latitude:mercados[i].enderecoLatitude,
                    longitude:mercados[i].enderecoLongitude,
                    distance:teste
                }) 
               busca.push(aux)
              
            }
            
        } 
        isLoading=true
        for(let x=0; x<busca.length; x++){
            console.log(busca[x])
        }  
        setArray(busca)
    }

    function setMarker(destinoMercado){
        setMarkers(destinoMercado)
    }
    return( 
        <SafeAreaView style={cssTab.area_superior}>
            <View style={cssTab.cabecalho}>
                <View style={{alignItems:'center'}}>
                    <Text style={cssTab.textoLogo}>BestPrices</Text>
                    <Text style={{paddingLeft:40, fontWeight:"bold"}}> Olá {usuario}!</Text>
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
                <FlatList
                data={array}
                horizontal
                style={{backgroundColor:"#8bda84", margin:1,marginTop:10, borderWidth:2, height:30}}
                renderItem={({item})=>
                <TouchableOpacity style={cssTab.espacoLista} onPress={()=>[setDestinoMercado({
                    latitude:parseFloat(item.latitude),
                    longitude:parseFloat(item.longitude)
                }), setMarker(destinoMercado)]}>
                    <View>
                            <Text style={cssTab.textoItem}>{item.nome}</Text>
                            <Text style={cssTab.textoItem2}>distância: {item.distance} metros</Text>
                    </View>
                </TouchableOpacity>
            }
            />
            <ScrollView>
                <View style={CssHome.mapContainer}> 
                    <MapView 
                        ref={mapaRefe}
                        style={CssHome.map}
                        region={enderecoUsuario} 
                        loadingEnabled={true}   
                        provider={PROVIDER_GOOGLE}    
                        zoomEnabled={ativaMap}  
                        toolbarEnabled={ativaMap}
                        pitchEnabled={ativaMap}
                        scrollEnabled={ativaMap}
                        rotateEnabled={ativaMap}
                    >  
                    {destinoMercado &&
                            <MapViewDirections
                                origin={enderecoUsuario}
                                destination={destinoMercado}
                                apikey={index.googleMapsApi}
                                strokeWidth={3}
                                onReady={result=>{  
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
                        <Marker coordinate={enderecoUsuario} title="Você"
                        />
                       {destinoMercado&& <Marker coordinate={destinoMercado} title="Mercado" 
                        image={require('../../assets/markers/mercado2.png')}
                        />}
                         <Circle
                            center={{
                                latitude: enderecoUsuario.latitude,
                                longitude: enderecoUsuario.longitude,
                            }}
                            radius={raio*100}
                            strokeColor="blue"
                            fillColor={"rgba(15, 40, 200, 0.2)"}
                        />
                    </MapView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



