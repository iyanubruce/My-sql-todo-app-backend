import {sequelize} from '../utils/db'
import {DataTypes} from 'sequelize';

const Task = sequelize.define('Task',{
    content:{
        type:DataTypes.STRING,
        validate:{
            max:150
        }
    },
    description:{
        type:DataTypes.TEXT
    },
    is_complete:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }

})


// sequelize.sync()

 export {Task}