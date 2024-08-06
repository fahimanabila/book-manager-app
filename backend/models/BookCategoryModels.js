import { Sequelize } from "sequelize";

import db from "../config/Database.js";

const {DataTypes} = Sequelize;

// Define the BookCategory model
const BookCategory = db.define('BookCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
}, {
    tableName: 'book_category',
    freezeTableName: true,
    timestamps: false,
});

export default BookCategory;

// // Sync the models with the database (create the tables)
// (async () => {
//     await db.sync({ force: true });
//     console.log('Tables have been created.');
// })();