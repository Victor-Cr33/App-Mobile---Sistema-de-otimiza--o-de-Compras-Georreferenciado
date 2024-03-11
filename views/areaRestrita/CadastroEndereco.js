import React, {useEffect, useState} from "react";
import { Text,  View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import index from '../../config/index.json';
import { cssMap } from "../../assets/css/CssMap";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function CadastroEndereco({navigation}){
    
    const[ origemAutomatica, setOrigemAutomatica]= useState( {
        latitude:-24.704866900133915,
        longitude:-51.91606624773333,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005
    });

    const[ origemManual, setOrigemManual]= useState( {
        latitude:-24.704866900133915,
        longitude:-51.91606624773333,
        latitudeDelta: 5.0043,
        longitudeDelta: 5.0034
    });

    const [nome, setNome]=useState(null);
    const [id, setId]=useState(null);
    
    useEffect(()=>{
        verificaLogin();
    },[]);

    async function verificaLogin(){
        let response=await AsyncStorage.getItem('userData');
        let json=await JSON.parse(response);
        if(json !== null){
            setNome(json.nome);
            setId(json.id);
        }
    }
    
    const [país, setPaís]=useState(null);
    const [estado, setEstado]=useState(null);
    const [cidade, setCidade]=useState(null);
    const [bairro, setBairro]=useState(null);
    const [rua, setRua]=useState(null);
    const [numeroCasa, setnumeroCasa]=useState(null);
    
    let busca
    let lat, long;
    let dados1;
    let dados2;

    /*
    setTimeout(function(){
    Alert.alert
    ('Dica',
    'Alguns bairros tem nomes trocados no registro do mapa e talvez manualmente não encontre seu endereço buscando pelos campos, devido a esse problema recomendamos que faça a busca automática ou selecione apontando diretamente no mapa');
    },2000);
*/
    useEffect(()=>{
        (async function(){
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true, maximumAge: 10000});
                
                setOrigemAutomatica({
                    latitude:location.coords.latitude,
                    longitude:location.coords.longitude,
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.0005
                })
                lat=origemAutomatica.latitude
                long=origemAutomatica.longitude
                console.log("logou no cadastro de endereço:", nome, id)
                console.log(origemAutomatica)
            } else {
                throw new Error('Location permission not granted');
            }
        })();
    },[]);

    const pegaEndereco=()=>{
        busca=true
        if(dados1!==null){
            let endereco1 = dados1.split(',')
            let endereco2 = dados2.split(/, | -/)

            setPaís(endereco2[3])
            setEstado(endereco2[2])
            setCidade(endereco2[1])
            setBairro(endereco2[0])
            setRua(endereco1[0])
            setnumeroCasa(endereco1[1])        
        }
    }
  
    const buscaAutomatica=()=>{
        setOrigemManual(origemAutomatica)
        pegaEnderecoAutomatico()  
           
    }
    
    const pegaEnderecoAutomatico = async () =>{
        const reverseGeocodedAdress = await Location.reverseGeocodeAsync({
            longitude:origemAutomatica.longitude,
            latitude:origemAutomatica.latitude
        })
        console.log("Endereço Automatico: ", reverseGeocodedAdress)
        setPaís(reverseGeocodedAdress[0].country)
        setEstado(reverseGeocodedAdress[0].region)
        
        if(reverseGeocodedAdress[0].city===null){
            setCidade(reverseGeocodedAdress[0].subregion)
        }else{
            setCidade(reverseGeocodedAdress[0].city)
        }
        setBairro(reverseGeocodedAdress[0].district)
        setRua(reverseGeocodedAdress[0].street)
        setnumeroCasa("Não encontrado, altera depois ou busque manualmente.")

    }
    
   
    async function sendForm(){
        if(buscaAutomatica){
             lat=origemAutomatica.latitude
             long=origemAutomatica.longitude
        }else{
            lat=origemManual.latitude
            long=origemManual.longitude
        }

        let response=await fetch(index.servidor+'/createEndereco',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome:"Home",
                rua: rua,
                numero: numeroCasa,
                bairro: bairro,
                cidadeId: cidade,
                latitude:lat,
                longitude:long,
                usuarioId:id,
                complemento:null,
                createAt: new Date(),
                updateAt: new Date(),
            })

        });    
        
        let json=await response.json();
        if(json === 'error'){
            setTimeout(()=>{
                Alert.alert ('Erro',
                'Erro ao cadastrar endereço, tente novamente mais tarde :(',
                )
            },6000);
            await AsyncStorage.clear();
        }else{
            navigation.navigate('TabNavigator', { screen: 'Inicio'});
        }
    }

    return(

        <KeyboardAvoidingView 
        style={cssMap.fundoTelaEndereco}
        >   
            <View style={cssMap.fundoCadastro}>  
              
                <View style={cssMap.conteudoTop}>
                    <Text style={cssMap.tituloFormEndereco}>CADASTRO DE ENDEREÇO</Text>
                    <Text style={cssMap.usuarioHello}>Seja bem vindo, {nome}</Text>
                </View>
                
                <View style={cssMap.mapContainer}> 
                    <MapView 
                        style={cssMap.map}
                        region={origemManual}
                        showsUserLocation={false}
                        loadingEnabled={true}   
                        provider={PROVIDER_GOOGLE}         
                    >
                        <Marker 
                        coordinate={origemManual} title="Você" />

                    </MapView>
                </View>
                <View style={cssMap.buscaLocalizacao}> 
                    <GooglePlacesAutocomplete
                        placeholder='Procurar Cidade, Bairro, Rua, numero...'                  
                        onPress={(data, details = null ) => {
                            // 'details' is provided when fetchDetails = true
                            //console.log(details);        
                            
                            let origemManual=({
                                    latitude:details.geometry.location.lat,
                                    longitude:details.geometry.location.lng,
                                    latitudeDelta: 0.0005,
                                    longitudeDelta: 0.0005
                                })
                                setOrigemManual(origemManual)

                                dados1=(data.structured_formatting.main_text)
                                dados2=(data.structured_formatting.secondary_text)
                                pegaEndereco();
                                lat=origemManual.latitude
                                long=origemManual.longitude
                                console.log("origem manual:", origemManual);
                                console.log(dados1, dados2);
                        }}
                        
                        query={{
                            key: index.googleMapsApi,
                            language: 'pt-br',
                            components: 'country:br'
                            
                        }}
                        enableHighAccuracy={true}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                         styles={{
                            listView:{ height:200, position:'relative'}, 
                            textInput:{borderWidth:1, top:4},
                            description:{fontSize:12},
                            row:{width:340, left:5},
                            
                        }}
                    /> 
                </View>
               
               <View style={cssMap.containerBotoes}>
                    <View>
                        <Text style={cssMap.tituloBotoesBusca}>Selecionar busca:</Text>
                    </View>
                    <View style={cssMap.containerTipoBusca}>
                        <TouchableOpacity style={cssMap.botaoTipoBusca} onPress={()=>buscaAutomatica()} >
                            <Text style={cssMap.textoBotaoBusca}>Automática</Text>         
                        </TouchableOpacity>
                      
                    </View>
                </View>
                <View style={cssMap.formularioBusca}>
                    <View>
                        <Text style={cssMap.tituloCampoEndereco}>Resultado da Busca de Endereço</Text>
                    </View>
                    <View>
                        <Text style={cssMap.camposEndereco}>País: {país}</Text>
                        <Text style={cssMap.camposEndereco}>Estado: {estado}</Text>
                        <Text style={cssMap.camposEndereco}>Cidade: {cidade}</Text>
                        <Text style={cssMap.camposEndereco}>Bairro: {bairro}</Text>
                        <Text style={cssMap.camposEndereco}>Rua: {rua}</Text>
                        <Text style={[cssMap.camposEndereco, cssMap.numeroCasa_msg]}>Nº Casa: {numeroCasa}</Text>
                    </View>
                   
                </View>
                
                <View style={cssMap.finalizaCadastro}>
                    <TouchableOpacity style={cssMap.botaoFinaliza} onPress={()=>sendForm()} >
                        <Text style={cssMap.textoBotaoFinaliza} >Cadastrar Endereço</Text>         
                    </TouchableOpacity>
                    
                </View>
            </View>
        </KeyboardAvoidingView>
    );

   
}
