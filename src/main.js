const express = require('express');
const { Database } = require('./configs/sequelize')

const db = Database.getInstance();

const app = express();

app.listen(8000, async() =>{
    require('./models/category');
    await db.sync();
    console.log('server is running on port 8000');
});
