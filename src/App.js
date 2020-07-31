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
                        <Route path={"/orders"}>
                            <h1>Orders page</h1>
                        </Route>
                        <Route path={"/checkout"}>
                            <h1>Checkout page</h1>
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
