import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import Status from './components/Status/Status';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <Router>
        <Switch>

            <Route exact  path="/" component={Landing} />
            <Route exact path="/register" component={Register} /> 
            <Route exact path="/status" component={Status} /> 

                        
            {/* @Todo: PrivateRoute */}
            {/* <PrivateRoute path="/register" exact component={Register} />
            <PrivateRoute path="/status" exact component={Status} /> */}
        </Switch>
    </Router>
  
  );
}

export default App;
