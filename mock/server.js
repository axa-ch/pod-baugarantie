const express = require('express');
const cors = require('cors');
const compress = require('compression');
const api = require('./api');
const bodyParser = require('body-parser');

const app = express();
app.use(compress());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/', api);

const args = {}; // eslint-disable-line object-curly-newline
process.argv
  .slice(2)
  .filter(arg => ~arg.indexOf('='))
  .forEach((arg) => {
    const { 0: key, 1: value } = arg.split('=');
    args[key] = value;
  });

const port = args.port ? args.port : 8080;

app.listen(port, () => console.log(`
  Example API listening on port ${port}!
`));
