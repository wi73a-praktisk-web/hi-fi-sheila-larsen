module.exports = (app) => {
    require('./produkt')(app);
    require('./kontakt')(app);
    require('./admin_produkt')(app);
    require('./login')(app);
    require('./brugere')(app);
    
};
