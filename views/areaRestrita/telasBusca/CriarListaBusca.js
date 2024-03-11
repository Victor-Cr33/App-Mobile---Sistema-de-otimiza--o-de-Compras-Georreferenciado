import React, {useState, useEffect} from "react";
import {Text, View,  SafeAreaView, ScrollView, TextInput,TouchableOpacity,Alert} from 'react-native';
import { cssMenu } from "../../../assets/css/cssMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import index from '../../../config/index.json';

export default function CriarListaBusca({navigation}){

    const [nome, setNome]=useState(null);
    const [id, setId]=useState(null);
    const [titulo, setTitulo] = useState();

    useEffect(()=>{
        async function verificaLogin(){
            let response=await AsyncStorage.getItem('userData');
            let json=await JSON.parse(response);
            if(json !== null && json.id !==null){
                setNome(json.nome);
                setId(json.id);
            }
        }
        verificaLogin();

        console.log("aqui",titulo)
        console.log(id)
        console.log(nome)
        
    },[]);


    const listForm = async () => {
        if(titulo==null||titulo==" "){
            Alert.alert
                ('Campo titulo vázio',
                'O campo de titulo é obrigátorio para o cadastro da sua lista',   
                [
                {
                    text:'ok'             
                }
                ]);
        }else{
            let response= await fetch(index.servidor+'/createListaProdutos',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome:titulo,
                    usuarioId:id,
                    createAt: new Date(),
                    updateAt: new Date(),
                })

            });
            let json=await response.json();

            if(json === 'error'){
                setTimeout(()=>{
                
                    Alert.alert ('Erro',
                    'Erro ao criar lista, tente novamente mais tarde :(',
                    )
                },6000);
            }else{
                let listaData=await AsyncStorage.setItem('listaData', JSON.stringify(json));
                Alert.alert ('Lista Cadastrada',
                'Adicione os itens a sua lista de busca',
                )   
                navigation.navigate('AdicionaItensLista'); 
            }
        } 

        fetch(index.servidor+'/buscaEnderecos',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuarioId:id,
                nome:"Home"
            })  
        }
        ).then(async (request)=>{
            const data = await request.json()

            if(data!==null){          
                let userEndereco=await AsyncStorage.setItem('userEndereco', JSON.stringify(data));
                console.log("aqui",data)
            }
            else{
                console.log("endereço não encontrado")
            }
        })

        
    }

    return(
        
        <SafeAreaView style={cssMenu.container}>
            <View style={cssMenu.barraSuperior}>
                <Text style={cssMenu.titulo}>Crie sua Lista para buscar o melhor Preço!</Text>
                 <Text ></Text>
            </View>
            <View style={cssMenu.tituloListaCadastro}>
                <Text style={cssMenu.textTitulo}>
                    Crie sua lista antes de adicionar Produtos
                </Text>
            </View>
            <View style={cssMenu.ListaContainer}>
                <View style={cssMenu.listaNome}>
                    <Text style={cssMenu.textNome}>Nome da Lista:</Text>
                    <TextInput keyboardType='text' placeholder=" Escreva aqui" onChangeText={text=>setTitulo(text)} />
                </View>
            </View>
            <View >
                <TouchableOpacity style={cssMenu.botaoCriarLista} onPress={()=>listForm()} >
                    <Text style={cssMenu.botaoText}>Adiciona nova Lista</Text>         
                </TouchableOpacity>                 
            </View>
                  
        </SafeAreaView>
    );
}

