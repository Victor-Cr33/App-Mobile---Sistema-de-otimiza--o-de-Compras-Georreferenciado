import React, {useState, useEffect, useRef} from "react";
import {Text, View,  SafeAreaView, TouchableOpacity, TextInput,Alert } from 'react-native';
import { CssRaioBusca } from "../../../assets/css/CssRaioBusca";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import index from '../../../config/index.json';


export default function RaioBusca({navigation}){  
    
    const [nome, setNome]=useState(null);
    const [id, setId]=useState(null);
    const [configRaio, setConfigRaio]=useState(false);

    const [lista, setLista]=useState({
        id:0,
        nome:''
    });

    const mapRef = useRef(null);
    const [raio, setRaio]=useState(0);
    const [pesquisa, setPesquisa]=useState("true");

    const [enderecoPadrao, setEnderecoPadrao]=useState({
        latitude:-24.704866900133915,
        longitude:-51.91606624773333,
        latitudeDelta: 5.0043,
        longitudeDelta: 5.0034
    });

    const[enderecouser, setEnderecouser]=useState({
        latitude:-24.704866900133915,
        longitude:-51.91606624773333,
        latitudeDelta: 0.0100,
        longitudeDelta: 0.0100
    });
    const [endCidade, setEndCidade]=useState();
    const [mercados, setMercados]=useState();

    useEffect(()=>{ 
        async function verificaLogin(){
            let response=await AsyncStorage.getItem('userData');
            let json=await JSON.parse(response);
            if(json !== null){
                setNome(json.nome);
                setId(json.id);
            }
        } 
        verificaLogin()
        async function verificaEndereco(){
            let response=await AsyncStorage.getItem('userEndereco');
            let json=await JSON.parse(response);
            if(json !== null){
                console.log("endereco:",json)
                setEnderecouser({
                    latitude:parseFloat(json.latitude),
                    longitude:parseFloat(json.longitude),
                    latitudeDelta: 0.0100,
                    longitudeDelta: 0.0100
                });     
                setEndCidade(json.cidadeId)   
            } 
        } 
        verificaEndereco()

        async function verificarLista(){
            let listaData=await AsyncStorage.getItem('listaData');
            let json=await JSON.parse(listaData);
            if(json !== null){
                setLista({
                    id:json.id,
                    nome:json.nome,
                })
            }
        }
        verificarLista()
    },[pegarEndereco]);

   

    const pegarEndereco = async () =>{
       
        fetch(index.servidor+'/buscaMercados',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cidadeId:endCidade,
            })  
        }
        ).then(async (request)=>{
            const data = await request.json()
            if(data!==null){          
                setMercados(data)
                console.log("mercados encontrados no banco")
            }
            else{
                console.log("mercados não encontrados")
            }
        })

        if(raio<1){
            Alert.alert ('Raio de Busca zerado',
            'O valor do raio de busca tem que ser no minimo 1 (km)',
            ) 

        }else{
            mapRef.current.animateToRegion(enderecouser,5 * 1000, setTimeout(()=>{
                setEnderecoPadrao(enderecouser)  
                setConfigRaio(true)      
            },5*1000));
        }
     
    };

    const enviaForm= async ()=>{
        if(configRaio===true){
        console.log("raio de envio:", raio/100)
        console.log("endereco de envio:", enderecoPadrao)
        console.log("Id e nome da lista:", lista.id, lista.nome)
        console.log("cidade do endereco:", endCidade)
       
        navigation.navigate('TabNavigator', { 
            screen: 'Inicio', 
            params: {
                busca: pesquisa, 
                adress:enderecoPadrao,
                raio:raio/100, 
                lista:lista, 
                mercados:mercados
            
            }});
        }else{
            Alert.alert ('Buscando Endereço',
            'Aguarde a busca de endereço',
            )   
        }
    }

    return(
         <SafeAreaView  style={CssRaioBusca.container} >
            <View>
                <View style={CssRaioBusca.barraSuperior}>
                    <Text style={CssRaioBusca.titulo}>Configurações de Busca</Text>
                    <TouchableOpacity>
                    <Text >Usuário {nome}</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={CssRaioBusca.raioContainer}>
                    <Text style={CssRaioBusca.botaoText}>Digite o Raio de Busca (Km)</Text>
                    <TextInput
                        style={CssRaioBusca.inputRaio}
                        placeholder="1..2.3.."
                        keyboardType="numeric"
                        onChangeText={text=>{
                            setRaio(text*1000)
                            //console.log(enderecoPadrao)
                        }}
                    />
                    <TouchableOpacity style={CssRaioBusca.botaoCriarRaio} onPress={()=>pegarEndereco()} >
                        <Text style={CssRaioBusca.botaoText2}>Buscar</Text>         
                    </TouchableOpacity> 
                </View>
                <View style={CssRaioBusca.mapContainer}> 
                    <MapView 
                        ref={mapRef}
                        style={CssRaioBusca.map}
                        region={enderecoPadrao} 
                        loadingEnabled={true}   
                        provider={PROVIDER_GOOGLE}      
                    >
                        <Marker 
                        coordinate={enderecoPadrao} title="Você" 
                        />
                        <Circle
                            center={{
                                latitude: enderecoPadrao.latitude,
                                longitude: enderecoPadrao.longitude,
                            }}
                            radius={raio}
                            strokeColor="blue"
                            fillColor={"rgba(15, 40, 200, 0.2)"}
                        />
                    </MapView>
                </View>
                <View>
                <TouchableOpacity style={CssRaioBusca.botaoVerResultado} onPress={()=>enviaForm()} >
                        <Text style={CssRaioBusca.botaoText3}>Ver Resultado</Text>         
                    </TouchableOpacity> 
                </View>
            </View>
           
        </SafeAreaView>
    );
}

