import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.boards, table => {
            table.bigIncrements('id').primary().index()
            table.string('name').index().notNullable().checkLength('<=', 60)
            table.string('color').checkLength('<=', 7)
            table.integer('icon')
                .references('id')
                .inTable(ETableNames.boardIcons)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table
                .bigInteger('owner')
                .references('id')
                .inTable(ETableNames.users)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
         
            table.comment('Table to save boards')
        })
        .then(() => {
            console.log(`# Created Table: ${ETableNames.boards}`)
        })

}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.boards)
        .then(() => {
            console.log(`# Dropped Table: ${ETableNames.boards}`)
        })

}

