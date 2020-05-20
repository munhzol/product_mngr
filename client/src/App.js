import React from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import {Router} from '@reach/router';

import Products from './components/Products';
import Forms from './components/Forms';


function App() {
  return (
    <div className="App">
      <Router>
        <Products path="/"/>
        <Forms path="/forms/:id"/>
      </Router>
    </div>
  );
}

export default App;
