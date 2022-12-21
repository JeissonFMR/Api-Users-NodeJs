//PRUEBA DE COMO FUNCIONA MONGODB
const mongoose = require('mongoose')

//conexion a mongo
mongoose.connect('mongodb+srv://jeissonm:123@cluster.nazegu4.mongodb.net/miapp?retryWrites=true&w=majority')


const User = mongoose.model('User', {
    username: String,
    edad: Number,
})

const create = async () => {
    const user = new User({ username: 'chancho triste', edad: 245 })
    const savedUser = await user.save() //retorna promesa. por esop el await
    console.log(savedUser);
}
// create()


const buscarTodo = async () => {
    const users = await User.find()
    console.log(users);

}
// buscarTodo()

const buscar = async () => {
    const user = await User.find({ username: 'chancho feliz' })
    console.log(user);
}
// buscar()


const buscarUno = async () => {
    const user = await User.findOne({ username: 'chancho feliz' })
    console.log(user);
}
// buscarUno()


/**ACTUALIZAR */
const actualizar = async () => {
    const user = await User.findOne({ username: 'chancho feliz' })
    console.log(user);
    user.edad = 30
    await user.save()
}
// actualizar()

/**ELIMINAR */
const eliminar = async () => {
    const user = await User.findOne({ username: 'chancho triste' })
    console.log(user);
    if (user) {
        await user.remove()
    }

}
eliminar()