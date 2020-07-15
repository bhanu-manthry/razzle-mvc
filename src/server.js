import App from './App';
import React from 'react';
import express from 'express'
import theme from './theme';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import apiRoutes from './apiRoutes';
import bodyParser from 'body-parser';
import session from 'express-session';
import routes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(session({ secret: 'keyboard cat' }));

server.use('/api', apiRoutes)

function auth(req, res, next) {
  if (!req.session.user && req.path != '/login') {
    res.redirect('/login')
    return;
  }

  else if (req.session.user && req.path == '/login') {
    res.redirect('/')
    return;
  }

  next();
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', auth, (req, res) => {

    const matches = routes.map((route, index) => {
      const match = matchPath(req.url, route.path, route);

      if (match) {
        const obj = {
          route,
          match,
          promise: route.component.getInitialData
            ? route.component.getInitialData({ match, req, res })
            : Promise.resolve(null)
        };

        return obj;
      }

      return null;
    });

    if (matches.length === 0) {
      res.status(404).send('Not Found');
    }

    const promises = matches.map(match => (match ? match.promise : null));

    Promise.all(promises)
      .then(data => {
        const context = {};
        const sheets = new ServerStyleSheets();
        const markup = renderToString(
          sheets.collect(
            <StaticRouter context={context} location={req.url}>
              <ThemeProvider theme={theme}>
                <App routes={routes} initialData={data} />
              </ThemeProvider>
            </StaticRouter>
          )
        );
        const css = sheets.toString();
        res.status(200).send(`
        <!doctype html>
        <html lang="">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500">
          ${assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
          }
          ${css ? `<style id='jss-ssr'>${css}</style>` : ''}
            ${process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
        </head>
        <body>
          <div id="root">${markup}</div>
          <script>
            window._INITIAL_DATA_ = ${JSON.stringify(data)};
          </script>
        </body>
        </html>`);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message, stack: error.stack });
      })
  });

export default server;
