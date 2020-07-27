import React from 'react';
import './App.css';

import Layout from "./containers/Layout";
import Builder from "./containers/Builder";

function App() {
  return (
    <div className="App">
      <Layout>
          <Builder />
      </Layout>
    </div>
  );
}

export default App;
