import { iBoard, iTask, iTaskStatus, iUser, iUserStatus } from '../../models'

declare module 'knex/types/tables' {
    interface Tables {
        boards: iBoard,
        tasks: iTask,
        users: iUser
        taskStatus: iTaskStatus
        userStatus: iUserStatus
    }
}