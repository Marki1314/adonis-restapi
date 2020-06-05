'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EvaluacionSchema extends Schema {
  up () {
    this.create('evaluacions', (table) => {
      table.increments()
      table.integer('tarea_id').unsigned().references('id').inTable('tareas')
      table.boolean('aprobada').defaultTo(false)
      table.string('description', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('evaluacions')
  }
}

module.exports = EvaluacionSchema
