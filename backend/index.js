import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "./routes/AuthRoutes.js";
import BookCategory from "./routes/BookCategoryRoutes.js";
import BookList from "./routes/BookListRoute.js";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors( { credentials:true, origin:'http://localhost:3001'} ));
app.use(cookieParser())
app.use(express.json());
app.use(fileUpload());
app.use(router);
app.use(BookCategory);
app.use(BookList);
app.use(express.static("public"))

// try {
//     await db.authenticate();
//     // await BookCategory.sync();
//     // await BookList.sync();

// } catch (error) {
//     console.log(error);
// }

app.listen(5000, ()=> console.log('Server up and running in port 5000...'));