const fs = require("fs")
const express = require("express")

class Contenedor{
    constructor(nombre){
        this.nombre = nombre

        this.productos  = []
        this.id         = 1
    }

    async init(){
        try {
            const datos = await this.readFile()
            if (datos.length > 0){
                this.productos = datos
                this.id = this.productos[datos.length-1].id + 1
                console.log('Datos cargados desde el archivo');
            }
        }catch(e) {
            console.log('No se pudo leer la información');
        }
    }

    async save(obj) {
        obj.id = this.id
        this.productos.push(obj)
        this.id++

        try {
            await this.saveFile()
        }catch(e){
            console.log(e);
        } 
        return this.id
        console.log(this.id)
    }

    saveFile() {
        return fs.promises.writeFile(this.nombre, JSON.stringify(this.productos))
    }

    getById(id){
        const datos = this.productos.find(prod => prod.id == id)
        return datos ? datos : null
    }

    getAll(){
        return this.productos
    }
    
    async deleteById(id){
        const idx = this.productos.findIndex(prod => prod.id == id)
        this.productos.splice(idx, 1)

        try {
            await this.saveFile()
        }catch(e) {
            console.log(e);
        }
    }

    readFile() {
        return fs.promises.readFile(this.nombre, 'utf-8')
        .then(datos => JSON.parse(datos))
    }

    async deleteAll(){  
        this.productos.length = 0
        try {
            await this.saveFile()
        }catch(e) {
            console.log(e);
        }
    }
}

module.exports = Contenedor