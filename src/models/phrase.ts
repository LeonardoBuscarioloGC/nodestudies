import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../instances/pg';

export interface PhraseInstance extends Model {
    author: string,
    txt: string,
    id: number
};

export const Phrase = sequelize.define<PhraseInstance>('Phrase', {
    author: {
        type: DataTypes.STRING
    },
    txt: {
        type: DataTypes.STRING
    },
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'phrases',
    timestamps: false
})