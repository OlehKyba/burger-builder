import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import store from "./store";

import './App.css';

import Layout from "./containers/Layout";
import Builder from "./containers/Builder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";

function App() {
    return (
        <Provider store={store}>
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
        </Provider>
  );
}

export default App;
