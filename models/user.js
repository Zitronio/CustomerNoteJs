var mongoose=require ('mongoose')
var Schema= mongoose.Schema
var valores_sexo=["M","F"]
var email_regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
var validaPassIguales=(p)=>{
	return this.pass_conf==p
}
var userSchemaJSON={
	nombre:{type:String,require:true,minlength:3},
	email:{type:String,require:"El email es obligatorio",match:[email_regex,"email mal escrito"]},
	password:{type:String,require:"El email es obligatorio",minlength:[6,"Pasword mínimo de seis caracteres"],validate:{validator:validaPassIguales,message:"Los passwords no son iguales"}},
	edad:{type:Number,min:[2,"La edad no puede ser menor de 2"],max:[120,"La edad no puede ser mayor de 120"]},
	fecha_nac:Date,
	sexo:{type:String,enum:{values:valores_sexo,message:"opción no válida en el sexo"}}
} 

var userSchema = new Schema(userSchemaJSON)
var User= mongoose.model('User',userSchema)
userSchema.virtual("confirmacion_password").get(()=>{
	return this.pass_conf
}).set((password)=>{
	this.pass_conf=password
})
module.exports.User=User