import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.taskStatus, table => {
            table.increments('id').primary().index()
            table.integer('status').index().unique()
            table.string('description', 30)
         
            table.comment('Table with possible status for a task')
        })
        .then(() => {
            console.log(`# Created Table: ${ETableNames.taskStatus}`)
        })

}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.taskStatus)
        .then(() => {
            console.log(`# Dropped Table: ${ETableNames.taskStatus}`)
        })

}

