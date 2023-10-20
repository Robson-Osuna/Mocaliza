const express = require('express');
const sqlite3 = require('sqlite3');
const { Category } = require('./models/category.js')

const db = new sqlite3.Database('mocaliza_db.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS categories (id INTERGER PRIMARY KEY, name TEXT)");
    db.get("SELECT count(id) as total from categories GROUP BY id", null, (err, row) => {
        if (err) {
            throw err;
        }
        if (row.count == 0){
            db.run("INSERT INTO categories(name) VALUES('Carros')");
            db.run("INSERT INTO categories(name) VALUES('Motos')");
            db.run("INSERT INTO categories(name) VALUES('SUVs')");
            db.run("INSERT INTO categories(name) VALUES('Hatch')");
            db.run("INSERT INTO categories(name) VALUES('Sedan')");
        }
    });
});

const app = express();

app.get('/', (request, response) => {
    db.serialize(() => {
        const categories = [];
        db.each("SELECT id, name from categories", (err, row) => {
            if (err) {
                throw err;
            }

            const categoryData = new Category(row.id, row.name);

            categories.push(category);

        });

        response.json({
            categories,
        });

    })

    response.json({
        data: Date.now(),
    });
});

app.listen(8000, () =>{
    const c = Category.from(1, 'Cars', true, Date.now(), Date.now());
    console.log(c);
    console.log('server is running on port 8000');
});
