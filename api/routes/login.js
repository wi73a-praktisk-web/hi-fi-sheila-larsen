const db = require('../config/sql').connect();
const passwordHash = require('password-hash');
const crypto = require('crypto');

module.exports = (app) => {
    app.post('/login', (req, res) => {
        if (req.body.password !== '' && req.body.username !== '') {
            console.log(passwordHash.generate(req.body.password));
            db.execute('SELECT id, password FROM users WHERE username = ?', [req.body.username], (selError, rows) => {
                console.log(rows.length)
                if (rows.length != 0) {
                    if (passwordHash.verify(req.body.password, rows[0].password)) {
                        crypto.randomBytes(256, (err, buf) => {
                            if (err) return res.status(500).end();
                            else {
                                const token = buf.toString('hex');
                                db.execute('INSERT INTO accesstokens SET userid = ?, token = ?', [rows[0].id, token], (insError) => {
                                    if (insError) return res.status(500).end();
                                    else return res.send({ "ID": rows[0].id, "AccessToken": token });
                                });
                            }
                        });
                    } else {
                        res.json(401,{
                            "message": "FORKERT BRUGERNAVN ELLER KODEORD"
                        })
                    }
                }
                else{
                    res.json(401,{
                        "message": "FORKERT BRUGERNAVN ELLER KODEORD"
                    })
                }
            });
        } else {
            res.send(401);
        }
    });
};