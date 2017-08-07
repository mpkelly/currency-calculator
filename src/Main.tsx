import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppTheme} from "./style/AppTheme";
import {ThemeProvider, Text} from "react-style-helpers";
import { CurrencyCalculator } from "./pages/CurrencyCalculator";

export const App = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <CurrencyCalculator />
    </ThemeProvider>
  )
}

ReactDOM.render(
  <App/>, document.getElementById("app")
);