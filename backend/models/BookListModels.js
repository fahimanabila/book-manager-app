import { Sequelize } from "sequelize";

import db from "../config/Database.js";
import BookCategory from "./BookCategoryModels.js";

const {DataTypes} = Sequelize;

// Define the BookList model
const BookList = db.define('BookList', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publication_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number_of_pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'book_list',
    freezeTableName: true,
    timestamps: false,
});

// Define the association (foreign key relationship)
BookList.belongsTo(BookCategory, { foreignKey: 'category', targetKey: 'id' });
BookCategory.hasMany(BookList, { foreignKey: 'category' });

export default BookList;

// // Sync the models with the database (create the tables)
// (async () => {
//     await db.sync({ force: true });
//     console.log('Tables have been created.');
// })();