import React from 'react';
import { hydrate } from 'react-dom';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

const data = window._INITIAL_DATA_;

hydrate(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App routes={routes} initialData={data} />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
  () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
    const jssStyles = document.getElementById('jss-ssr');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
);

if (module.hot) {
  module.hot.accept();
}
