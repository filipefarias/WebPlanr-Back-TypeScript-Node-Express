import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.tasks, table => {
            table.bigIncrements('id').primary().index()
            table.string('name').index().notNullable().checkLength('<=', 60)
            table.string('description', 400).checkLength('<=', 400)
            table
                .bigInteger('board')
                .references('id')
                .inTable(ETableNames.boards)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table
                .integer('status')
                .references('id')
                .inTable(ETableNames.taskStatus)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

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

