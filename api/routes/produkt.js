const db = require('../config/sql').connect();
module.exports = function (app) {




    // VISER 2 NYESTE PRODUKTER TIL FORSIDEN (INDEX.HTML) // 
    app.get('/index_produkt', function (req, res) {
        db.query(`
        SELECT * 
        FROM produkt 
        ORDER BY id desc limit 2
        `,
            function (err, data) {
                res.send(data);
            })
    })


   
    // VISER ALLE KATEGORIER PÅ PRODUKTER.HTML // 
    app.get('/kategori', function (req, res) {
        db.query(`
        SELECT * 
        FROM kategori
        `,
            function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            })
    })


    // VISER EN KATEGORI PÅ PRODUKTER.HTML // 
    app.get('/kategori_produkt/:id', function (req, res) {
        db.query(`
        SELECT 
            produkt.*, kategori.navn AS kategori 
        FROM produkt 
        INNER JOIN kategori ON fk_kategori_id = kategori.id 
        WHERE fk_kategori_id = ?
        `,
            [req.params.id],
            function (err, data) {
                res.send(data);
            })
    })



    // VISER ET SPECIFIKT PRODUKT I EN KATEGORI PÅ PRODUKTER.HTML // 
    app.get('/specifikt_produkt/:id', function (req, res) {
        db.query(`
        SELECT 
            produkt.*, kategori.navn AS kategori, 
            producent.navn AS producent 
        FROM produkt 
        INNER JOIN kategori on fk_kategori_id = kategori.id 
        JOIN producent on fk_producent_id = producent.id 
        WHERE produkt.id = ?
        `,
            [req.params.id],
            function (err, data) {
                res.send(data);
            })
    })




    //SØGNING//
    app.get('/soeg/:id', function (req, res) {
        db.query(`
        SELECT 
            produkt.*, kategori.navn AS kategori, 
            producent.navn AS producent 
        FROM produkt 
        INNER JOIN kategori on fk_kategori_id = kategori.id 
        INNER JOIN producent on fk_producent_id = producent.id 
        WHERE kategori.navn like "%"?"%"
        OR produkt.id like "%"?"%"
        OR produkt.navn like "%"?"%"  
        OR producent.id like "%"?"%"      
        `,
        [req.params.id, req.params.id, req.params.id, req.params.id],
            function (err, data) {
                res.send(data);
            })
    })

}















