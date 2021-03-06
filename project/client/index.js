import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import client from "./utils/apolloService";
import { ApolloProvider } from "@apollo/react-hooks";

// Create the jss rtl fix plugin
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <StylesProvider jss={jss}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </StylesProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
