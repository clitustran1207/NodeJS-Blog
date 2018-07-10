const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const session = require('express-session');

//Setup Express
const app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get('secret-key'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//Setup Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setup template engine
app.set('views', __dirname + '/apps/views');
app.set('view engine', 'ejs');

//Static folder (express.static(root, [options]))
app.use(express.static(__dirname + '/public'));

//Setup Controller
app.use(require(__dirname +  '/apps/controllers'));

//Config for server
const host = config.get('server.host');
const port = config.get('server.port');
app.listen(port, host, () => console.log('Server is running on port', port));