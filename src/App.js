import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './helper/PrivateRoute';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Section from './pages/Section';
import Error from './Error';
import Home from './pages/Home';
import Forgotpassword from './pages/Forgotpassword';
// patient //

import Page2 from './pages/patient/Page2';
import Page3 from './pages/patient/Page3';
import Page4 from './pages/patient/Page4';
import Page7 from './pages/patient/Page7';
import Page8 from './pages/patient/Page8';
import Page9 from './pages/patient/Page9';
import Page5 from './pages/patient/Page5';
import Page6 from './pages/patient/Page6';
import Page10 from './pages/patient/Page10';
import Page11 from './pages/patient/Page11';
import Page12 from './pages/patient/Page12';
import Page13 from './pages/patient/Page13';
import Page14 from './pages/patient/Page14';
import Page15 from './pages/patient/Page15';
import Page16 from './pages/patient/Page16';
// Nurse // 
import NurseSearch from './pages/nurse/NurseSearch';
import Nurse1 from './pages/nurse/Page1';
import Nurse2 from './pages/nurse/Page2';
import Nurse3 from './pages/nurse/Page3';
import Nurse4 from './pages/nurse/Page4';
import Nurse5 from './pages/nurse/Page5';
import Nurse6 from './pages/nurse/Page6';

import RecoverPasword from './pages/RecoverPasword';

// global Domain
export const domain = 'https://thrombolink-server.herokuapp.com';

// export const domain = 'http://localhost:8000';
//

const App = () => {
   return (
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/Signin" component={Signin} />
         <Route exact path="/Register" component={Register} />
         <Route exact path="/Forgotpassword" component={Forgotpassword} />
         <PrivateRoute exact path="/User/Section" component={Section} />
         <Route exact path="/RecoverPasword/reset/:token" component={RecoverPasword} />
         {/* // patient // */}
         <PrivateRoute path="/User/Page2" component={Page2} />
         <PrivateRoute path="/User/Page3" component={Page3} />
         <PrivateRoute path="/User/Page4" component={Page4} />
         <PrivateRoute path="/User/Page5" component={Page5} />
         <PrivateRoute path="/User/Page6" component={Page6} />
         <PrivateRoute path="/User/Page7" component={Page7} />
         <PrivateRoute path="/User/Page8" component={Page8} />
         <PrivateRoute path="/User/Page9" component={Page9} />
         <PrivateRoute path="/User/Page10" component={Page10} />
         <PrivateRoute path="/User/Page11" component={Page11} />
         <PrivateRoute path="/User/Page12" component={Page12} />
         <PrivateRoute path="/User/Page13" component={Page13} />
         <PrivateRoute path="/User/Page14" component={Page14} />
         <PrivateRoute path="/User/Page15" component={Page15} />
         <PrivateRoute path="/User/Page16" component={Page16} />
         {/* // Nurse // */}
         <PrivateRoute path="/Nurse/patient_search" component={NurseSearch} />
         <PrivateRoute path="/Nurse/Nurse1" component={Nurse1} />
         <PrivateRoute path="/Nurse/Nurse2" component={Nurse2} />
         <PrivateRoute path="/Nurse/Nurse3" component={Nurse3} />
         <PrivateRoute path="/Nurse/Nurse4" component={Nurse4} />
         <PrivateRoute path="/Nurse/Nurse5" component={Nurse5} />
         <PrivateRoute path="/Nurse/Nurse6" component={Nurse6} />
         <Route component={Error} />
      </Switch>
   );
};

export default App;
