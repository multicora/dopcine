// import registerServiceWorker from "./registerServiceWorker";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./store";
import App from "containers/App/App.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

const target = document.querySelector("#root")

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MuiThemeProvider>
          <App />
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
// registerServiceWorker();
