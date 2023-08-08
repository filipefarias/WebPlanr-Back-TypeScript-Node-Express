import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.tasks, table => {
            table.bigIncrements('id').primary().index()
            table.string('name').index().notNullable().checkLength('<=', 60)
            table.string('description', 400).checkLength('<=', 400)
            table.foreign('board', ETableNames.boards).references('id')
            table.foreign('status', ETableNames.taskStatus).references('id')
         
            table.comment('Table to save tasks')
        })
        .then(() => {
            console.log(`# Created Table: ${ETableNames.tasks}`)
        })

}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.tasks)
        .then(() => {
            console.log(`# Dropped Table: ${ETableNames.tasks}`)
        })

}

