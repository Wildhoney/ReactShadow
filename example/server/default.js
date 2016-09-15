import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/example'));
server.listen(process.env.PORT || 5000);
