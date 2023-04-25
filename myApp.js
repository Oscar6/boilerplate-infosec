const express = require('express');
const app = express();
const helmet = require('helmet');

let ninetyDaysInSeconds = 90*24*60*60;

app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  hsts: {
    maxAge: ninetyDaysInSeconds,
    force: true
  },
  dnsPrefetchControl: false,
  contentSecurityPolicy: {
    directives: {
    'defaultSrc': ["'self'"],
    'scriptSrc': ["'self'", "trusted-cdn.com"]
    }
  }
}));

// Hiding information from known exploits in Express/Node
// app.use(helmet.hidePoweredBy());

// Mitigate the Risk of Clickjacking by means of iFraming
// app.use(helmet.frameguard({
//   action: 'deny'
// }))

// XSS attacks
// app.use(helmet.xssFilter());

// Avoid Inferring the Response MIME Type
// app.use(helmet.noSniff());

// Prevent IE from Opening Untrusted HTML
// app.use(helmet.ieNoOpen());

// Ask Browsers to Access Your Site via HTTPS Only
// let ninetyDaysInSeconds = 90*24*60*60;

// app.use(helmet.hsts({
//   maxAge: ninetyDaysInSeconds,
//   force: true
// }))

// Disable DNS Prefetching
// app.use(helmet.dnsPrefetchControl());

//Disable Client-Side Caching
// app.use(helmet.noCache());

//Set Content Security Policy
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     'defaultSrc': ["'self'"],
//     'scriptSrc': ["'self'", "trusted-cdn.com"]
//   }
// }))


























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
