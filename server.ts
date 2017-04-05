import * as express from "express";
import * as path from "path";

const app = express();

app.use('/',             express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

function normalizePort(val:any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
 
    return val;
  }

  if (port >= 0) {

    return port;
  }

  return false;
}

var server = app.listen(port);