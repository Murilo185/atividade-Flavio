var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/cursos', function(req, res) {

    var mysql = require('mysql2');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "qikbyte",
    });
    connection.query("SELECT descricao FROM curso;", function(error, result) {
        res.render('pages/cursos.ejs', { dados: result });
    })
});

app.post('/cursos/salvar', function(req, res) {

    var dados = req.body;

    connection.query('INSERT INTO curso SET ?', dados, function(error, result) {
        res.redirect('/cursoInsert');
    })
})

app.listen(3000, function() {
    console.log("Rodando...");
});