const express=require('express');   
const cors=require ('cors');
const bodyParser=require ('body-parser');
const models=require('./models');
const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

let usuario=models.Usuario;
let cidade=models.Cidade;
let endereco=models.Endereco;
let produto=models.Produto;
let lista=models.Lista_Produtos;
let itens=models.Itens_Lista_Produtos;
let mercado=models.Mercado;

app.post('/login', async (req,res)=>{
    let response=await usuario.findOne({
        where:{email:req.body.email, senha:req.body.senha}
    });
    
    if(response!==null){
            res.send(response);
    }
    else{
        res.send(JSON.stringify('error'));
    }
});

app.post('/buscaEndereco', async (req,res)=>{
    let response=await usuario.findOne({
        where:{email:req.body.email, senha:req.body.senha}
    });
    
    if(response!==null){
    
        const user = response
        const adress = await endereco.findOne({
            where:{
                usuarioId: response.id
            }
        })
        console.log("pesquisa de endereco:",adress)

        if( adress===null){ 
            res.send(JSON.stringify('semEndereco'));
        }
        else{
            res.send(JSON.stringify('temEndereco'));
        }
    }
    if(response === null){
        res.send(JSON.stringify('error'));
    }
});

app.post('/create', async (req,res)=>{
    const findOneEmail = await usuario.findOne({where:{ email: req.body.email} })

    if (findOneEmail) {
        console.log('email já existe');
        res.send(JSON.stringify('error'));
    }
    else if(findOneEmail===null){
        let response= await usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            createAt: new Date(),
            updateAt: new Date()
        });
        res.send(response);
        console.log('cadastro validado');
    }
    else{
        console.log('Erro: Algum erro não tratado, provavelmente campo vázio hein victor..');
    }
})

app.post('/createEndereco', async (req,res)=>{
    const findOneCity = await cidade.findOne({where: nome= req.body.cidade})
    const findOneUser = await usuario.findOne({where:id=req.body.usuarioId})
  
    if (findOneCity) {
        console.log('cidade ok:',findOneCity.id);
        if(findOneUser){   
            let response= await endereco.create({
                nome:req.body.nome,
                rua: req.body.rua,
                numero:req.body.numero,
                bairro:req.body.bairro,
                latitude:req.body.latitude,
                longitude:req.body.longitude,
                complemento:req.body.complemento,
                cidadeId:findOneCity.id,
                usuarioId:findOneUser.id,
                createAt: new Date(),
                updateAt: new Date()
            });
            res.send(response);
            console.log('cadastro endereço validado');
        }
        else{
            console.log('Erro: id do usuario');
        }
    }
    else{
        console.log('Erro: id da cidade');
    }
})
app.get('/buscarProdutos', async (req,res)=>{
    let response=await produto.findAll({ 
        raw:true
    })
    console.log("valor pego na api:",response);
    res.send(response);
});

app.post('/createListaProdutos', async (req,res)=>{
    const findOneUser = await usuario.findOne({where:id=req.body.usuarioId})

    if(findOneUser){
        let response= await lista.create({
            nome:req.body.nome,
            usuarioId:findOneUser.id,
            createAt: new Date(),
            updateAt: new Date()
        });
        if(response!==null){
            res.send(response);
            console.log('criação da lista concluida');
        }
    }else{
        console.log('Erro: id do usuario nao encontrado');
    }
})



app.post('/adicionaProdutosLista', async (req,res)=>{
    const findOneList = await lista.findOne({where:id=req.body.listaId})
    const findOneProduct = await produto.findOne({where:id=req.body.produtoId})

    if(findOneList){
       if(findOneProduct){
            console.log('Erro: id do produto nao encontrado');
        
            let response= await itens.create({
                listaId:req.body.listaId,
                produtoId:req.body.produtoId,
                createAt: new Date(),
                updateAt: new Date()
            });
            res.send(response);
            console.log('adicao de item a lista concluida');
        
        }
        else{
            console.log('Erro: id do produto nao encontrado');
        }
       
    }else{
        console.log('Erro: id da lista nao encontrado');
    }
})

app.post('/buscaProduto', async (req,res)=>{
    let response=await produto.findOne({where:{usuarioId:req.body.id}})
    
    if(response!==null){
    
            res.send(response);
            console.log('produto encontrado:',response.nome, response.id);
    }
    else{
        console.log('Erro: produto nao encontrado');
    }
});

app.post('/buscaEnderecos', async (req,res)=>{
    const response=await endereco.findOne({
        where:{UsuarioId:req.body.usuarioId, nome:"Home"}})
    
    if(response!==null){
            res.send(response);
    }
    else{
        console.log('Erro: endereco nao encontrada');
    }
});

app.post('/buscaMercados', async (req,res)=>{
     mercado.findAll({
        include:[
            {model:endereco,
            where:{cidadeId:req.body.cidadeId}
            },
           
        ],
    }).then(data =>{
        const mercadoResultado = data.map(mercadoItem=>{
            return{
                id:mercadoItem.id,
                nome:mercadoItem.nome,
                enderecoId:mercadoItem.enderecoId,
                enderecoLatitude:mercadoItem.Endereco.latitude,
                enderecoLongitude:mercadoItem.Endereco.longitude,
                enderecoCidadeId:mercadoItem.Endereco.cidadeId
            }
        })
        res.status(200).send(mercadoResultado)
    
    }).catch(err=>{
        console.log(err);
    })
      
  
});

app.post('/update', async (req,res)=>{
    let response = await usuario.update(req.body,{
        where: {id:req.body.id}
    });
    let resUsu = await usuario.findOne({
        where:{id:req.body.id}
    })
    if(response===null && resUsu ===null){
        res.send(JSON.stringify('error'))
    }else{
        res.send(resUsu)
        
    }
})

app.post('/updateEmail', async (req,res)=>{
    let response = await usuario.findOne({
        where: {id:req.body.id}
    });
    let response2 = await usuario.findOne({
        where:{email:req.body.email}
    })

    if(response){
        if(response2){
            res.send(JSON.stringify('error'))
        }else{
        await usuario.update({ email:req.body.email, updateAt:new Date()}, {
            where: {
                id:req.body.id
            }
          });
          res.send(response)
        }
}});

app.post('/updateSenha', async (req,res)=>{
    let response = await usuario.findOne({
        where: {id:req.body.id}
    });
    let response2 = await usuario.findOne({
        where:{senha:req.body.senha}
    })

    if(response){
        if(response2){
            res.send(JSON.stringify('error'))
        }else{
        await usuario.update({ senha:req.body.senha, updateAt:new Date()}, {
            where: {
                id:req.body.id
            }
          });
          res.send(response)
        }
}});

app.post('/buscaListas', async (req,res)=>{
    const response=await lista.findAll({
        where:{usuarioId:req.body.id}})
    
    if(response!==null){
            res.send(response);
    }
    else{
        console.log('Erro: listas nao encontradas');
    }
});



let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor rodando...teste backend');
});