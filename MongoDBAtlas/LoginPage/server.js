const express = require('express');
const mongoose= require('mongoose');
const app=express();
const PORT= 3000;
//conexion mongo atlas
mongoose.connect ('mongodb+srv://djvm1591:GaW7jHT35hjoXfNl@cluster0.rmq6q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => console.log('Conectado a la base de datos'))
    .catch((err) => console.log(err));
//middleware
app.use(express.json());

// modelo del usuario 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['normal', 'admin'],
        default: 'normal'
      }
});

const User = mongoose.model('User', userSchema);

//Ruta para un Nuevo Usuario solo admin 

app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    // validacion existencia 
    const existUser = await User.findOne({ email });
    if (!existUser) {
        return res.status(400).send('El usuario ya existe')
    }
    // ya podemso crear un usuario

    const newUser = new User({
        email,
        password,
        role
      });
      await newUser.save();
    res.status(201).json(newUser);
});
// ruta de inicio de sesion 
app.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user|| user.password !== password){
    return res.status(400).send('Credenciales incorrectas');
    }
    res.status(200).send('Todo bien puede acceder')

});


//incializar server

app.listen(PORT,()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`)
});