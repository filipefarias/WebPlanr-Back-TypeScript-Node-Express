import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.boardIcons, table => {
            table.increments('id').primary().index()
            table.string('icon').index().unique()
            table.string('label').index()
         
            table.comment('Table with possible icons for a board')
        })
        .then(() => {
            console.log(`# Created Table: ${ETableNames.boardIcons}`)
        })

}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.boardIcons)
        .then(() => {
            console.log(`# Dropped Table: ${ETableNames.boardIcons}`)
        })

}

