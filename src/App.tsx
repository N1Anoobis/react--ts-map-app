import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
// import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import { MainLayout } from './components/MainLayout/MainLayout';
import { DetailsView } from './components/DetailsView/DetailsView';
import { Intel } from './components/Intel/Intel';
import { Currencies } from './components/Currencies/Currencies';
import { Chart } from './components/Chart/Chart';
import { PostCard } from './components/PostCard/PostCard';
import { NavBar } from './components/NavBar/NavBar';
// import Nav from './nav/Nav';
// import Content from './Content';

// import '../style/layout/App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline /> */}
        <NavBar />
        <MainLayout>
          <Switch>
            {/* <Route exact path='/' component={Homepage} /> */}
            <Route exact path="/" component={PostCard} />
            <Route exact path="/post/:id" component={DetailsView} />
            <Route exact path="/post/:id/:country" component={Intel} />
            <Route path="/currencies" component={Currencies} />
          </Switch>
        </MainLayout>
        {/* </ThemeProvider>
      </StylesProvider> */}
      </BrowserRouter>
    </Provider>
    // </Router>
  );
}

export default App;
