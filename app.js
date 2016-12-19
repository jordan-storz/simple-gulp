const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('port', 3000);

var server = app.listen(app.get('port'), () => {
  console.log(
    'Express server listening on port ',
    server.address().port);
});
