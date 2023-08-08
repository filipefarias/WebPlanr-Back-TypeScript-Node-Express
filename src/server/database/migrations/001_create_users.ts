import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.users, table => {
            table.bigIncrements('id').primary().index()
            table.string('username',50).unique().index().notNullable().checkLength('<=', 50)
            table.string('password').index().checkLength('>', 8).notNullable()
            table.string('email').unique().index().notNullable()
            table.string('firstName', 50).notNullable()
            table.string('lastName', 50).notNullable()
            table.foreign('userStatus', ETableNames.userStatus).references('id')
         
            table.comment('Table to save users')
        })
        .then(() => {
            console.log(`# Created Table: ${ETableNames.users}`)
        })

}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.users)
        .then(() => {
            console.log(`# Dropped Table: ${ETableNames.users}`)
        })

}

