'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Evaluacion extends Model {
    tareas () {
        return this.hasMany('App/Models/Tarea')
    }
}

module.exports = Evaluacion
