const express=require('express');   
const cors=require ('cors');
const bodyParser=require ('body-parser');
const models=require('./models');
const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
let usuario=models.Usuario;
let cidade=models.Cidade;
let endereco=models.Endereco;

app.get('/create', async(req,res)=>{
    let create =await usuario.create({
        nome:'testenome',
        email:'teste@email.com',
        senha:'123',
        enderecoId: null,
        createAt: new Date(),
        updateAt: new Date()
    });
    res.send('testando crud criar usuário');
});

app.get('/buscarCidades', async (req,res)=>{
    let buscarCidades=await cidade.findAll({ 
        raw:true
    })
    console.log(buscarCidades);
    
});


app.get('/',(req,res)=>{
    res.send('meu servidor já está rodando, teste 2');
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


let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor rodando...teste backend');
});