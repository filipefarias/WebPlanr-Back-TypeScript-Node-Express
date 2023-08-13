import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.boardIcons).count<[{ count: number }]>('* as count')
    if (!Number.isInteger(count) || Number(count) > 0) return

    const iconsToInsert = [
        { icon: 'fa-solid fa-file-lines', label: 'Default' },
        { icon: 'fa-solid fa-building', label: 'Building' },
        { icon: 'fa-solid fa-house', label: 'House' },
        { icon: 'fa-solid fa-school', label: 'School' },
        { icon: 'fa-solid fa-hotel', label: 'Hotel' },
        { icon: 'fa-solid fa-hospital', label: 'Hospital' },
        { icon: 'fa-solid fa-church', label: 'Church' },
        { icon: 'fa-solid fa-warehouse', label: 'Warehouse' },
        { icon: 'fa-solid fa-industry', label: 'Industry' },
        { icon: 'fa-solid fa-car', label: 'Car' },
        { icon: 'fa-solid fa-plane', label: 'Plane' },
        { icon: 'fa-solid fa-phone', label: 'Phone' },
        { icon: 'fa-solid fa-envelope', label: 'Envelope' },
        { icon: 'fa-solid fa-clipboard', label: 'Clipboard' },
        { icon: 'fa-solid fa-pen', label: 'Pen' },
        { icon: 'fa-solid fa-tag', label: 'Tag' },
        { icon: 'fa-solid fa-book', label: 'Book' },
        { icon: 'fa-solid fa-compass', label: 'Compass' },
        { icon: 'fa-solid fa-calendar', label: 'Calendar' },
        { icon: 'fa-solid fa-bullhorn', label: 'Bullhorn' },
        { icon: 'fa-solid fa-route', label: 'Route' },
        { icon: 'fa-solid fa-heart', label: 'Heart' },
        { icon: 'fa-solid fa-gift', label: 'Gift' },
        { icon: 'fa-solid fa-dollar-sign', label: 'Dollar' },
        { icon: 'fa-solid fa-cart-shopping', label: 'Cart Shopping' },
        { icon: 'fa-solid fa-wallet', label: 'Wallet' },
        { icon: 'fa-solid fa-graduation-cap', label: 'Graduation Cap' },
        { icon: 'fa-solid fa-laptop-code', label: 'Laptop Code' }
    ]
   
    await knex(ETableNames.boardIcons).insert(iconsToInsert)
}