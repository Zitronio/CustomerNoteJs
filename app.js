var express=require ('express')
var mongoose=require ('mongoose')
var bodyParser=require ('body-parser')
var User=require("./models/User").User

mongoose.connect('mongodb://localhost:27017/customers')


var app=express()
var puerto=4000

app.use('/miassets',express.static('assets'))
app.set('view engine', 'pug')
//app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.get("/",(req,res)=>{
	//res.send("hola")
	res.render("index",{nombre:"Zitronio"})

})
app.get("/form_registro",(req,res)=>{
	//res.send("hola")++++

	res.render("registro")
	
}) 
app.get("/form_login",(req,res)=>{
	//res.send("hola")++++

	res.render("login")
	
}) 

app.get("/:nombre",(req,res)=>{
	//res.send("hola")
	var n=req.params.nombre
	res.render("index",{nombre:n})
	
}) 

app.post("/registro",(req,res)=>{
	let nombre=req.body.nombre
	let email=req.body.email
	let password=req.body.password
	let confirmacion_password=req.body.confirmacion_password
	let u =new User({nombre:nombre,email:email,password:password,confirmacion_password:confirmacion_password})
	u.save((error,usuarioGuardado)=>{
		if(error){
			res.send("Error al registrarte "+ String(error))
		}else{
			res.send("Registro completado con éxito "+usuarioGuardado.nombre+" "+usuarioGuardado.email)
		}
	})
	
}) 

app.post("/login",(req,res)=>{
	let email=req.body.email
	let password=req.body.password
	User.findOne(email:email,password:password,(error,usuarioEncontrado)=>{
		if(error){
			res.send("Error en el servidor al loguearte"+ String(error))
		}else if(usuarioEncontrado){
				res.send("Login.correcto")
			}else{
			
			res.send("email /" usuario encontrado)
			}
		}
	})
	
}) 
app.listen(puerto)