import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/app/Header";
import Wrapper from "./components/app/Wrapper";
import Chart from './components/app/Chart';
import Boxes from './components/app/Boxes';
import Test from './components/app/Test';
import Metrics from './components/app/Metrics';
import Grid from '@material-ui/core/Grid';
import { LAST_MEASUREMENT_RECEIVED, API_ERROR } from "./store/actions/metrics"
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

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



const MEASUREMENT_SUBSCRIPTION = gql`
  subscription {
      newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

function Measurement({metric}) {
  const dispatch = useDispatch();

  const { data } = useSubscription(
    MEASUREMENT_SUBSCRIPTION
  );
  //
  if (data && data.newMeasurement ) {
    const measurement = data.newMeasurement
    dispatch({ type: LAST_MEASUREMENT_RECEIVED, measurement });
  //   return <h1>{data.newMeasurement.value}</h1>

  }
  return null;
}


const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="flex-start"
          style={{ padding: "20px"}}
        >
          <Grid item xs={12} md={2}>
            <Metrics />
          </Grid>
          <Grid item xs={12} md={10}>
            <Boxes />
          </Grid>
          <Grid item xs={12}>
          <Measurement />
            <Chart />
          </Grid>
        </Grid>
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
