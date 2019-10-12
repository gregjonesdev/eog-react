import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/app/Header";
import Wrapper from "./components/app/Wrapper";
import Chart from './components/app/Chart';
import MetricsList from './components/app/Metrics';
import Grid from '@material-ui/core/Grid';



const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

console.log(store.getState())

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <Grid container spacing={2} direction="row"
          alignItems="baseline"
        >
          <Grid item xs={12} md={2}>
            <MetricsList />
          </Grid>
          <Grid item xs={12} md={10}>
            <Chart />
          </Grid>
        </Grid>
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
