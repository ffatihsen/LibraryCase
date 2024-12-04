const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes")
const sequelize = require("./config/databaseconfig")

const { User, Borrow, Book } = require("./models");

const { errorHandler } = require('./middlewares/errorHandler');


const app = express()
app.use(cors())
app.use(express.json({limit:"2mb"}))
app.use(express.urlencoded({limit:"2mb", extended:true}))


app.use("/", routes);


app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found." });
});



app.use(errorHandler);




const PORT = process.env.PORT || 3000


sequelize.authenticate()
.then(() => {console.log("Database connection successful");})
.catch((error) => {console.log("Database connection failed :",error);})



sequelize.sync({alter:true})
.then(() => {console.log("Models are synchronized with the database.");})
.catch((error) => {console.log("Error during model synchronization:",error);})






app.listen(PORT, () => {
    console.log(`The server is running successfully at ${PORT}.`);
})