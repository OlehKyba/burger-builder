import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

import Layout from "./containers/Layout";
import Builder from "./containers/Builder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path={"/orders"}>
                            <Orders />
                        </Route>
                        <Route path={"/checkout"}>
                            <Checkout />
                        </Route>
                        <Route exact path={"/"}>
                            <Builder />
                        </Route>
                    </Switch>
                </Layout>
            </div>
        </BrowserRouter>
  );
}

export default App;
