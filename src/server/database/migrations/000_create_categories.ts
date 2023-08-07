import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.categories, table => {
            table.bigIncrements('id').primary().index()
            table.string('name', 100).index().notNullable()
         
            table.comment('Table to save categories')
        })
        .then(() => {
            console.log(`# Created Table: ${ETableNames.categories}`)
        })

}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.categories)
        .then(() => {
            console.log(`# Dropped Table: ${ETableNames.categories}`)
        })

}

