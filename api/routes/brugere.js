const restify = require('restify');
// const path = require('path'); // benyttes til at tjekke fil endelser 
const fs = require('fs'); // benyttes til at flytte og slette filer
// const mysql = require(path.join(__dirname, '..', 'config', 'sql'));
const db = require('../config/sql').connect();
const passwordHash = require ('password-hash'); 

module.exports = (app) => {

    // ---------------------- HENT ALLE BRUGERE I EN LISTE FRA DB TIL BRUGERE.HTML --------- //

    app.get('/opret_bruger', (req, res, next) => {
        db.query(`SELECT * FROM users`, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.json(200, rows);
            }
        })
    });





    // ----------------------- OPRET BRUGER I DB FRA BRUGER.HTML ------------------------- //

    app.post('/opret_bruger', (req, res, next) => {
        let userName = (req.body.userName == undefined ? '' : req.body.userName);
        let password = passwordHash.generate(req.body.password);
        db.execute(`INSERT INTO users SET username = ?, password = ?`, [userName, password], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.json(200, rows);
            }
        })
    });





    // --------------------- REDIGER BRUGER I DB FRA BRUGER.HTML ------------------------ //

// Hent brugeren der skal redigeres //
    app.get('/rediger_bruger/:id', (req, res, next) => {
        let id = (isNaN(req.params.id) ? 0 : req.params.id);
        if (id > 0) {
            db.execute(`SELECT * FROM users WHERE id = ?`, [req.params.id], (err, rows) => {
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

// Sæt den redigerede bruger tilbage i DB //
    app.put('/rediger_bruger/:id', (req, res, next) => {
        let userName = (req.body.userName == undefined ? '' : req.body.userName);
        if (userName != '' > 0) {

            db.execute(`UPDATE users SET username = ? where id = ?`, [userName, req.params.id], (err, rows) => {
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




    // --------------------------- SLET BRUGER FRA BRUGERE.HTML ------------------------- //

    app.del('/slet_bruger/:id', (req, res, next) => {
        let id = (isNaN(req.params.id) ? 0 : req.params.id);
        if (id > 0) {
            db.execute(`DELETE FROM users WHERE id = ?`, [req.params.id], (err, rows) => {
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