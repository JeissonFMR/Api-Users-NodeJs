const express = require('express');
const user = require('./user.controller')
const mongoose = require('mongoose')


const app = express();
app.use(express.json()) //midle recibir peticiones post
const port = 3000;


//conexion a mongo
mongoose.connect('mongodb+srv://jeissonm:123@cluster.nazegu4.mongodb.net/miapp?retryWrites=true&w=majority')

// user.* (refactorizacion de user.controller)
app.get('/users', user.list)
app.get('/users/:id', user.get)
app.post('/users', user.create)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id', user.destroy)


app.use(express.static('frontend/client')) //nos sirve para buscar los archivos js,html,cssetc

//consumir api
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/index.html`)
})


//errores cuando noe xista ruta
app.get('*', (req, res) => {
    res.status(404).send('Esta página no existe')
})


app.listen(port, () => {
    console.log('Arrancando la aplicación');
})