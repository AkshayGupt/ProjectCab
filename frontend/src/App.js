import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import Status from './components/Status/Status';
import Navigation from './components/Navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <>
      {/* ToDo: Navigation Bar */}
      {/* <Navigation/> */}
      <Router>
        <Switch>
            <Route exact  path="/" component={Landing} />
            <PrivateRoute path="/register" exact component={Register} />
            <PrivateRoute path="/status" exact component={Status} />
        </Switch>
     </Router>
  
    </>
    
  );
}

export default App;
