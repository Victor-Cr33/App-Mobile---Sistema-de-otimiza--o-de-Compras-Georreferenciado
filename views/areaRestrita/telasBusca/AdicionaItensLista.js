import React, {useState, useEffect} from "react";
import {Text, View,  SafeAreaView, ScrollView, TextInput,TouchableOpacity,Alert} from 'react-native';
import { cssMenu } from "../../../assets/css/cssMenu";
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import index from '../../../config/index.json';

export default function AdicionaItensLista({navigation}){

    const [lista, setLista]=useState({
        id:0,
        nome:''
    });
    const [nome, setNome]=useState(null);
    const [id, setId]=useState(null);

    const [selected, setSelected] = useState("");
    const [data, setData] = useState([]);
    let produtoSelecionado
    let produtoId

    async function verificaLogin(){
        let response=await AsyncStorage.getItem('userData');
        let json=await JSON.parse(response);
        if(json !== null){
            setNome(json.nome);
            setId(json.id);
        }
    }

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
    useEffect(()=>{
        verificaLogin()
        verificarLista()       
    },[]);


    async function fetchData() {
        axios.get(index.servidor+'/buscarProdutos')
        .then((response) => {
            // Store Values in Temporary Array
            let newArray = response.data.map((item) => {
            return {key: item.id, value:item.nome}
            })
            //Set Data Variable
            setData(newArray)
        })
        .catch((e) => {
            console.log(e)
        })
    };

    useEffect(()=>{
        fetchData();
    },[]);
   

    async function adicionaItemLista(){
        let cont = 0
        console.log("aqui a",lista.id) 
        console.log(selected)
        if(selected===""||selected===null||selected===[""]||selected===[]){
            Alert.alert
            ('Lista de produtos vazia',
            'É necessário adicionar pelo menos 1 produto para criar a sua lista',   
            [
            {
                text:'ok'             
            }
            ]);
        
        }else{ 
            for (let i=0; i<selected.length; i++){    
                produtoSelecionado=selected[i]
                produtoId=produtoSelecionado
                itensListForm()     
                cont +=1
                console.log(cont)
            }  

            if(cont>0){  
                Alert.alert
                ('Itens Adicionados a sua Lista!',
                'Agora selecione seu endereço inicial para buscar com sua lista',
                );
                setTimeout(()=>{
                    navigation.navigate('RaioBusca');
                },2000);
                //navigation.navigate('Home', { screen: 'Minhas Listas' });
            }
            else{
                Alert.alert
                ('Lista de produtos vazia',
                'É necessário adicionar pelo menos 1 produto para criar a sua lista',   
                [
                {
                    text:'ok'             
                }
                ]);
            }
        }
  
    }

    async function itensListForm(){

        let response=await fetch(index.servidor+'/adicionaProdutosLista',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listaId:lista.id,
                produtoId:produtoId,
                createAt: new Date(),
                updateAt: new Date()
            })

        });    
        let json=await response.json();

        if(json === 'error'){
            setTimeout(()=>{
                console.log("erro ao adicionar item a lista")
            },6000);
        }else{
           console.log("item adicionado a lista cadastrada")
        }
    }

    return(
        
        <SafeAreaView style={cssMenu.container}>
            <View style={cssMenu.barraSuperior}>
                <Text style={cssMenu.titulo}>Crie sua Lista para buscar o melhor Preço!</Text>
                 <Text ></Text>
            </View>         
            <View style={cssMenu.itensSelect}>
                <Text style={cssMenu.tituloItens}>
                    Adicione os produtos a lista criado acima
                </Text>
                <MultipleSelectList 
                    setSelected={(val) => setSelected(val)}
                    data={data} 
                    label={lista.nome}  
                    searchPlaceholder="Digite e selecione o produto na lista"
                    labelStyles={{alignSelf:'center'}}
                    
                    onSelect={() => console.log(selected)} 
                    save="key"
                        />
            </View>
            <View >
                <TouchableOpacity style={cssMenu.botaoItem} onPress={()=>adicionaItemLista()} >
                    <Text style={cssMenu.botaoText}>Cadastrar Itens na lista</Text>         
                </TouchableOpacity>                 
            </View>
        </SafeAreaView>
    );
}