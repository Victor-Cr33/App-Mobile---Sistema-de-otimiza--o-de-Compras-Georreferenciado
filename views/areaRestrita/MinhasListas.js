import React, {useState, useEffect} from "react";
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import { cssListas } from "../../assets/css/CssListas";
import index from '../../config/index.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MinhasListas({navigation, route}){
    
    const [usuarioNome, setUsuarioNome] = useState(null);
    const [id, setUsuarioId] = useState(null);
  

    const [listas, setListas] = useState([]);
    useEffect(() =>{
        async function getUsuario(){
            let response=await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setUsuarioNome(json.nome);
            setUsuarioId(json.id);
        }
        getUsuario();
    },[id]);

    useEffect(() =>{
        if (route.params?.listTrue) {
        buscandoListas()
        }
    },[route.params?.listTrue]);

    
   
   async function buscandoListas(){
       
        fetch(index.servidor+'/buscaListas',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:id,
            })  
        }
        ).then(async (request)=>{
            const data = await request.json()
            
            if(data!==null){          
               setListas(data)
               console.log(listas)
                console.log("listas encontrados no banco")

            }
            else{
                console.log("listas não encontrados")
            }
        })
        
    };

      
       /* const preparedData = listas.map((item) => {
            const nome= (item.nome);
            const createdAt = moment(item.created_at).format('YYY/MM/DD HH:mm');
            return {
              label: item.nome,
              createdAt,
            };
          });*/

    return(
        <SafeAreaView style={cssListas.container}>
            <View style={cssListas.barraSuperior}>
                <Text style={cssListas.titulo}>Histórico de Listas</Text>
                <MaterialCommunityIcons name="reload" size={30} style={cssListas.icon_eyeCadastro} onPress={()=> buscandoListas()}/>
            </View>
        <View style={cssListas.containerLista}>
        {listas && 
            <FlatList
            data={listas}
            renderItem={({item})=>
                <View style={cssListas.espacoLista}>
                    <Text style={cssListas.textoItem}>{item.nome}</Text>
                </View>
            }

            />
            }
        </View>
      </SafeAreaView>
    );


}