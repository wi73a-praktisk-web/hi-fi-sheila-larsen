const db = require('../config/sql').connect();

module.exports = function (app) {


app.post('/create', (req, res) => {
    
            let values = [];
            values.push(req.body.navn);
            values.push(req.body.type);
            values.push(req.body.pris);
            values.push(req.body.billede);
    
            db.execute('insert into fruit set navn = ?, fk_type = ?, pris = ?, image = ?', values, (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json(500, {
                        "message": "Internal Server Error",
                        "error": err
                    })
                }
                else {
                    res.json(200, {
                        "message": "Data indsat"
                    })
                }
            })
        });