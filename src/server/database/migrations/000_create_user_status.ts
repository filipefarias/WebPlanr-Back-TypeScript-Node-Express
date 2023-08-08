import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.userStatus, table => {
            table.increments('id').primary().index()
            table.integer('status').index().unique()
            table.string('description', 30)
         
            table.comment('Table with possible status for an user')
        })
        .then(() => {
            console.log(`# Created Table: ${ETableNames.userStatus}`)
        })

}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.userStatus)
        .then(() => {
            console.log(`# Dropped Table: ${ETableNames.userStatus}`)
        })

}

