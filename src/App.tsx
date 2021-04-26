import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MainLayout } from './components/MainLayout/MainLayout';
import { DetailsView } from './components/DetailsView/DetailsView';
import { Intel } from './components/Intel/Intel';
import { Currencies } from './components/Currencies/Currencies';
import { Chart } from './components/Chart/Chart';
import { PostCard } from './components/PostCard/PostCard';
import { NavBar } from './components/NavBar/NavBar';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <MainLayout>
          <Switch>
            <Route exact path="/" component={PostCard} />
            <Route exact path="/post/:id" component={DetailsView} />
            <Route exact path="/post/:id/:country" component={Intel} />
            <Route exact path="/currencies" component={Currencies} />
            <Route exact path="/currencies/:code/rates" component={Chart} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
