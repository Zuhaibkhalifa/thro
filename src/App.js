import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './helper/PrivateRoute';
import Error from './Error';

//

const Home = React.lazy(() => import('./pages/Home'));
const Signin = React.lazy(() => import('./pages/Signin'));
const Register = React.lazy(() => import('./pages/Register'));
const Section = React.lazy(() => import('./pages/Section'));
const Forgotpassword = React.lazy(() => import('./pages/Forgotpassword'));
const RecoverPasword = React.lazy(() => import('./pages/RecoverPasword'));

// patient //
const Page2 = React.lazy(() => import('./pages/patient/Page2'));
const Page3 = React.lazy(() => import('./pages/patient/Page3'));
const Page4 = React.lazy(() => import('./pages/patient/Page4'));
const Page7 = React.lazy(() => import('./pages/patient/Page7'));
const Page8 = React.lazy(() => import('./pages/patient/Page8'));
const Page9 = React.lazy(() => import('./pages/patient/Page9'));
const Page6 = React.lazy(() => import('./pages/patient/Page6'));
const Page10 = React.lazy(() => import('./pages/patient/Page10'));
const Page11 = React.lazy(() => import('./pages/patient/Page11'));
const Page12 = React.lazy(() => import('./pages/patient/Page12'));
const Page13 = React.lazy(() => import('./pages/patient/Page13'));
const Page14 = React.lazy(() => import('./pages/patient/Page14'));
const Page15 = React.lazy(() => import('./pages/patient/Page15'));
const Page16 = React.lazy(() => import('./pages/patient/Page16'));

// Nurse //
const NurseSearch = React.lazy(() => import('./pages/nurse/NurseSearch'));
const AddPatient = React.lazy(() => import('./pages/nurse/AddPatient'));
const Nurse1 = React.lazy(() => import('./pages/nurse/Page1'));
const Nurse2 = React.lazy(() => import('./pages/nurse/Page2'));
const Nurse3 = React.lazy(() => import('./pages/nurse/Page3'));
const Nurse4 = React.lazy(() => import('./pages/nurse/Page4'));
const Nurse5 = React.lazy(() => import('./pages/nurse/Page5'));
const Nurse6 = React.lazy(() => import('./pages/nurse/Page6'));
const Recommendations = React.lazy(() => import('./pages/nurse/Recommendations'));
const ModifyRecommendations = React.lazy(() => import('./pages/nurse/ModifyRecommendations'));
const Dictation = React.lazy(() => import('./pages/nurse/Dictation'));

// global Domain
export const domain = 'https://thrombolink-server.herokuapp.com';
// export const domain = "http://localhost:8000"; 

const App = () => {
   return (
      <React.Suspense fallback={<></>}>
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
            <PrivateRoute path="/Nurse/add_patient" component={AddPatient} />
            <PrivateRoute path="/Nurse/Nurse1" component={Nurse1} />
            <PrivateRoute path="/Nurse/Nurse2" component={Nurse2} />
            <PrivateRoute path="/Nurse/Nurse3" component={Nurse3} />
            <PrivateRoute path="/Nurse/Nurse4" component={Nurse4} />
            <PrivateRoute path="/Nurse/Nurse5" component={Nurse5} />
            <PrivateRoute path="/Nurse/Nurse6" component={Nurse6} />
            <PrivateRoute path="/Nurse/Dictation" component={Dictation} />
            <PrivateRoute path="/Nurse/Recommendations" component={Recommendations} />
            <PrivateRoute path="/Nurse/modify-recommendation" component={ModifyRecommendations} />
            <Route component={Error} />
         </Switch>
      </React.Suspense>
   );
};

export default App;
