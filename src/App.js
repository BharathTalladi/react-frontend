import './App.css';
import ListStudent from './components/ListStudent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import AddStudent from './components/AddStudent';
import RegistrationComponent from './components/RegistrationComponent';
import LoginComponent from './components/LoginComponent';
import ListDepartmentComponent from './components/ListDepartmentComponent';
import DepartmentComponent from './components/DepartmentComponent';
import StudentDepartmentMappingComponent from './components/StudentDepartmentMappingComponent';
import { isUserLoggedIn } from './services/Service';
import PaymentComponent from './components/PaymentComponent';



function App() {

  function AuthenticatedRoute({children}){
    const isUserAuthenticated = isUserLoggedIn();
      if(isUserAuthenticated){
        return children;
      }
      return <Navigate to="/"/>
  }

  return (
  <div>
    <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          <Route path="/"  element={<LoginComponent/>}></Route>
          <Route path="/students"  element={<AuthenticatedRoute><ListStudent/></AuthenticatedRoute>}></Route>
          <Route path="/department"  element={<AuthenticatedRoute><ListDepartmentComponent/></AuthenticatedRoute>}></Route>
          <Route path="/add-department"  element={<AuthenticatedRoute><DepartmentComponent/></AuthenticatedRoute>}></Route>
          <Route path="/edit-department/:id"  element={<AuthenticatedRoute><DepartmentComponent/></AuthenticatedRoute>}></Route>
          <Route path="/add-student" element={<AuthenticatedRoute><AddStudent/></AuthenticatedRoute>}></Route>
          <Route path = "/edit-student/:id" element = {<AuthenticatedRoute><AddStudent/></AuthenticatedRoute>}></Route>
          <Route path = "/assign-department/:id" element = {<AuthenticatedRoute><StudentDepartmentMappingComponent/></AuthenticatedRoute>}></Route>
          <Route path = "/payment" element = {<AuthenticatedRoute><PaymentComponent stripekey="pk_test_51HeLPKDIN7kdA8BtHZsl5rQsZdIAq5GPfn2qROf4JkzvwPWUEDeIKvBHfdVSEuJuMMkdqp5sR6k0KgOYmGs1ru4500sT597LaY"/></AuthenticatedRoute>}></Route>
          <Route path="/register" element={<RegistrationComponent/>}></Route>
          <Route path="/login" element={<LoginComponent/>}></Route>
        </Routes>
      <FooterComponent/>
    </BrowserRouter>
  </div>
  );
}

export default App;
