const products = require('../public/products.json') 
const express = require('express')
const app = express()
const { Router } = express
const router = Router()
const multer = require('multer')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('views', './views')
app.set('view engine', 'ejs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now())    
})
const upload = multer(storage)

/* router.get('/', (request, response) => {
    response.send(`<h3>Hola</h3>`)
}) */

router.get('/', (request, response) => { // Get configurado para que en caso que no se pasen queries, muestre todos los objetos, y si se pasa una query de referencia muestre ese objeto
    if(Object.entries(request.query).length > 0){
        const product = products.find(prod => prod.id == request.query.id)
        response.json(product)
    }else{
        response.render('prods.ejs', {products})
    }    
    //response.send(`<p>${JSON.stringify(contenedor.getAll())}</p>`)    
}) 

// Get para agregar obj a products usando query en la url
/* app.get('/api/productos/new', (request, response) => {
    const name = request.query.name
    products.push({name})  
    response.send("Request recibido")
}) */

// Get para ver el producto cuyo id sea igual al parametro pasado por query en la url
/* app.get('/api/productos-prod', (request, response) => {
    const product = products.find(prod => prod.id == request.query.id)
    response.json(product)
    
}) */

// Get para mostrar prod el cual su id sea igual al pasado como parámetro /:id
router.get('/:num', (request, response) => {
    const num = Number(request.params.num)
    if(isNaN(num)){
        response.json({error: 'El parametro no es un número'})
        response.status(400)
    } else if(num > products.length){
        response.json({error: 'producto no encontrado'})
        response.status(404)
    } else{
        const product = products.find(prod => prod.id == num)
        response.json(product)
    }    
})

router.post('/productos', (request, response) => { // Arreglar
    console.log('POST Recibido')
    products.push(request.body)  
    response.render('prods.ejs', {products})

})

router.put('/:id', (request, response) => { // Arreglar
    console.log('PUT Recibido')
    response.json('PUT Requested')
    console.log(request.body)
    products.push(request.body)    
})

router.delete('/:id', (request, response) => { // Arreglar
    console.log('DEL Recibido')
    response.json('DEL Requested')
    console.log(request.body)
    products.push(request.body)    
})

router.get('/productoRandom', (request, response) => {
    let indice = Math.floor(Math.random() * contenedor.getAll().length)
    response.send(`<p>${JSON.stringify(contenedor.getAll()[indice])}</p>`)
})

module.exports = router