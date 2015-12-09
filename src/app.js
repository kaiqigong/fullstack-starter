import express from 'express';
import config from './config/config';
import mongoose from 'mongoose';
import configExpress from './config/express';

mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

const app = express();

configExpress(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

