import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

import Layout from "./containers/Layout";
import Builder from "./containers/Builder";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path={"/orders"} render={() => <h1>Orders page</h1>}/>
                        <Route path={"/checkout"} render={() => <h1>Checkout page</h1>}/>
                        <Route exact path={"/"} component={Builder}/>
                    </Switch>
                </Layout>
            </div>
        </BrowserRouter>
  );
}

export default App;
