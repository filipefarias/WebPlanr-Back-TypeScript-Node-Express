import { iCategories } from '../../models'


declare module 'knex/types/tables' {
    interface Tables {
        categories: iCategories,
        // task: iTask,
        // user: iUser
        // task_status: iTaskStatus
        // user_status: iUserStatus
    }
}