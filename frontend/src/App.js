import React,{lazy,Suspense} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
// import Landing from './components/Landing/Landing';
// import Register from './components/Register/Register';
// import Status from './components/Status/Status';

// import Navigation from './components/Navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/Auth/PrivateRoute';
import Loading from './Loading';
const Status = lazy(()=>import("./components/Status/Status"));
const Landing = lazy(()=>import("./components/Landing/Landing"));
const Register = lazy(()=>import('./components/Register/Register'));

function App() {
  return (
    <>
  
    <Suspense fallback={<Loading/>}>
      {/* ToDo: Navigation Bar */}
      
      <Router>
        {/* <Navigation/> */}
        <Switch>
            <Route exact  path="/" component={Landing} />
            <PrivateRoute path="/register" exact component={Register} />
            <PrivateRoute path="/status" exact component={Status} />
        </Switch>
     </Router>
  
    </Suspense>
    </>
  );
}

export default App;
