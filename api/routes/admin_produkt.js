const restify = require('restify');
// const path = require('path'); // benyttes til at tjekke fil endelser 
const fs = require('fs'); // benyttes til at flytte og slette filer
// const mysql = require(path.join(__dirname, '..', 'config', 'sql'));
const db = require('../config/sql').connect();

module.exports = (app) => {

    // ---------------------- HENT ALLE PRODUKTER I EN LISTE FRA DB TIL ADMIN_PRODUKT.HTML --------- //

    app.get('/opret_produkt', (req, res, next) => {
        db.query(`SELECT * FROM produkt`, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.json(200, rows);
            }
        })
    });





    // ----------------------- OPRET PRODUKT I DB FRA ADMIN_PRODUKT.HTML ------------------------- //

    app.post('/opret_produkt', (req, res, next) => {
        let navn = (req.body.produktNavn == undefined ? '' : req.body.produktNavn);
        let beskrivelse = (req.body.produktBeskrivelse == undefined ? '' : req.body.produktBeskrivelse);
        let pris = (req.body.produktPris == undefined ? 0 : req.body.produktPris);
        let kategori = (req.body.produktKategori == undefined ? 0 : req.body.produktKategori);
        let producent = (req.body.produktProducent == undefined ? 0 : req.body.produktProducent);       
        pris = pris.replace(',', '.');
        db.execute(`INSERT INTO produkt SET navn = ?, beskrivelse = ?, pris = ?, fk_kategori_id = ?, fk_producent_id = ?`, [navn, beskrivelse, pris, kategori, producent], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.json(200, rows);
            }
        })
    });





    // --------------------- REDIGER PRODUKT I DB FRA ADMIN_PRODUKT.HTML ------------------------ //

    app.get('/rediger_produkt/:id', (req, res, next) => {
        let id = (isNaN(req.params.id) ? 0 : req.params.id);
        if (id > 0) {
            db.execute(`SELECT * FROM produkt WHERE id = ?`, [req.params.id], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(200, rows);
                }
            })

        } else {
            res.json(400, {
                message: 'id ikke valid'
            });
        }
    });


    app.put('/rediger_produkt/:id', (req, res, next) => {
        let navn = (req.body.produktNavn == undefined ? '' : req.body.produktNavn);
        let beskrivelse = (req.body.produktBeskrivelse == undefined ? '' : req.body.produktBeskrivelse);
        let pris = (req.body.produktPris == undefined ? 0 : req.body.produktPris);
        let id = (isNaN(req.params.id) ? 0 : req.params.id);
        pris = pris.replace(',', '.');

        if (navn != '' && beskrivelse != '' && !isNaN(pris) && id > 0) {

            db.execute(`UPDATE produkt SET navn = ?, beskrivelse = ?, pris = ?, fk_kategori_id = 1, fk_producent_id = 1  WHERE id = ?`, [navn, beskrivelse, pris, id], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(200, rows);
                }
            })

        }
        else {
            res.json(400, {
                message: 'validering fejlede'
            });
        }
    });




    // --------------------------- SLET PRODUKT FRA ADMIN_PRODUKT.HTML ------------------------- //

    app.del('/slet_produkt/:id', (req, res, next) => {
        let id = (isNaN(req.params.id) ? 0 : req.params.id);
        if (id > 0) {
            db.execute(`DELETE FROM produkt WHERE id = ?`, [req.params.id], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(204);
                }
            })

        } else {
            res.json(400, {
                message: 'id ikke valid'
            });
        }
    });



}