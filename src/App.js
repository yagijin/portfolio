import React from 'react';
import './App.scss';
import Profile from './components/Profile.js';
import Research from './components/Research.js';
import Products from './components/Products.js';
import NotFound from './components/NotFound.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import CmdPage from './components/CmdPage.js';
import { Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Switch>{/* switchでは最初にURLにマッチした要素が描画される　*/}
            {/*<Route exact path="/" component={Welcome} />} />*/}
            <Route exact path="/" component={CmdPage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/research" component={Research}/>
            <Route exact path="/products" component={Products}/>
            <Route exact path="/privacypolicy" component={PrivacyPolicy}/>
            <Route component={NotFound}/>
    </Switch>
  );
}

export default App;
