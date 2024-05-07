'use strict'

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    //langs: [String], // Para que no sea muy complicado, se deja como string simplemente
    langs: String,
    year: Number,
    image: String

});

module.exports = mongoose.model('Project', ProjectSchema);/**Project se pone en singular porque
mongoose lo que hace es poner todo en minúscula y pluraliza la variable, así, en la base de datos
quedaría una colección llamada projects, la cual es la que se creó y guarda los documentos en
esa colección directamente */