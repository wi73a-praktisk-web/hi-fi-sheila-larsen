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




























    //----------------------ADMIN-----------------------------//

    // VISER ALLE PRODUKTER PÅ OPRET.HTML // 
    // app.get('/opret_produkt', function (req, res) {
    //     db.query(`
    // SELECT * 
    // FROM produkt 
    // `,
    //         function (err, data) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             else {
    //                 res.send(data);
    //             }
    //         })
    // })

    // VISER ALLE KATEGORIER I DROPDOWN //
    // app.get('/opret_produkt', function (req, res) {
    //     db.query(`
    // SELECT * 
    // FROM kategori
    // `,
    //         function (err, data) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             else {
    //                 res.send(data);
    //             }
    //         })
    // });


// v MIT FORSØG PÅ ORETTELSE AF PRODUKT I DB v - Virker ikke ... //
// OPRET PRODUKT I DATABASE //
    // const db = require('../config/sql').connect();
    // module.exports = function (app) {
        
    //     app.post('/opret_nyt_produkt', (req, res) => {
    
    //         let values = [];
    //         values.push(req.body.opret-navn);
    //         values.push(req.body.opret-pris);
    //         values.push(req.body.opret-beskrivelse);
    
    
    //         db.execute('insert into opret set navn = ?, pris = ?, beskrivelse = ?', values, (err, rows) => {
    //             if (err) {
    //                 console.log(err);
    //                 res.json(500, {
    //                     "message": "Internal Server Error",
    //                     "error": err
    //                 })
    //             }
    //             else {
    //                 res.json(200, {
    //                     "message": "Gemt"
    //                 })
    //             }
    //         })
    //     });
    // }


// v JACKS KODE TIL OPRETTELSE AF PRODUKT I DB v - VIRKER IKKE ... //
    // app.post('/opret_nyt_produkt', (req, res, next) => {
        
    //           let navn = (req.body.navn == undefined ? '' : req.body.navn);
    //           let beskrivelse = (req.body.beskrivelse == undefined ? '' : req.body.beskrivelse);
    //           let pris = (req.body.pris == undefined ? 0 : req.body.pris);
    //           pris = pris.replace(',', '.');
        
    //           if (navn != '' && beskrivelse != '' && !isNaN(pris)) {
        
    //              let db = mysql.connect();
    //              db.execute(`INSERT INTO produkts SET produkt_navn = ?, produkt_beskrivelse = ?, produkt_pris = ?`, [navn, beskrivelse, pris], (err, rows) => {
    //                 if (err) {
    //                    console.log(err);
    //                 } else {
    //                    res.json(200, rows);
    //                 }
    //              })
    //              db.end();
    //           } else {
    //              res.json(400, {
    //                 message: 'validering fejlede'
    //              });
    //           }
    //        });






// v DET NEDENSTÅENDE UDKOMMENTEREDE ER FRA JACKS KODE v //

    // HENTER SPECIFIKT PRODUKT FRA DB //
    // app.get('/produkt/:id', (req, res, next) => {
    //     let id = (isNaN(req.params.id) ? 0 : req.params.id);
    //     if (id > 0) {
    //         let db = mysql.connect();
    //         db.execute(`SELECT * FROM produkt WHERE produkt_id = ?`, [req.params.id], (err, data) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 res.json(200, data);
    //             }
    //         })
    //         db.end();
    //     } else {
    //         res.json(400, {
    //             message: 'id ikke valid'
    //         });
    //     }
    // });

    // SÆTTER OPRETTET PRODUKT IND I DB //
    // app.post('/produkt', (req, res, next) => {

    //     let navn = (req.body.navn == undefined ? '' : req.body.navn);
    //     let beskrivelse = (req.body.beskrivelse == undefined ? '' : req.body.beskrivelse);
    //     let pris = (req.body.pris == undefined ? 0 : req.body.pris);
    //     pris = pris.replace(',', '.');

    //     if (navn != '' && beskrivelse != '' && !isNaN(pris)) {

    //         let db = mysql.connect();
    //         db.execute(`INSERT INTO produkt SET produkt_navn = ?, produkt_beskrivelse = ?, produkt_pris = ?`, [navn, beskrivelse, pris], (err, data) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 res.json(200, data);
    //             }
    //         })
    //         db.end();
    //     } else {
    //         res.json(400, {
    //             message: 'validering fejlede'
    //         });
    //     }
    // });



    // SÆTTER DET REDIGEREDE IND I DB //
    // app.put('/produkt/:id', (req, res, next) => {

    //     let navn = (req.body.navn == undefined ? '' : req.body.navn);
    //     let beskrivelse = (req.body.beskrivelse == undefined ? '' : req.body.beskrivelse);
    //     let pris = (req.body.pris == undefined ? 0 : req.body.pris);
    //     let id = (isNaN(req.params.id) ? 0 : req.params.id);
    //     pris = pris.replace(',', '.');

    //     if (navn != '' && beskrivelse != '' && !isNaN(pris) && id > 0) {

    //         let db = mysql.connect();
    //         db.execute(`UPDATE produkt SET produkt_navn = ?, produkt_beskrivelse = ?, produkt_pris = ? WHERE produkt_id = ?`, [navn, beskrivelse, pris, id], (err, data) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 res.json(200, data);
    //             }
    //         })
    //         db.end();
    //     } else {
    //         res.json(400, {
    //             message: 'validering fejlede'
    //         });
    //     }
    // });



    // SLETTER PRODUKT FRA DB //
    // app.del('/produkt/:id', (req, res, next) => {
    //     let id = (isNaN(req.params.id) ? 0 : req.params.id);
    //     if (id > 0) {
    //        let db = mysql.connect();
    //        db.execute(`DELETE FROM produkt WHERE produkt_id = ?`, [req.params.id], (err, data) => {
    //           if (err) {
    //              console.log(err);
    //           } else {
    //              res.json(204);
    //           }
    //        })
    //        db.end();
    //     } else {
    //        res.json(400, {
    //           message: 'id ikke valid'
    //        });
    //     }
    //  });
  


}











