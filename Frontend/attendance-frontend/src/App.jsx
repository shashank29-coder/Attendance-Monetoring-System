import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



import Login from "./Login";
import Signup from "./Signup";
import StudentDashboard from "./StudentDashboard";
import StudentAttendance from "./StudentAttendance";
import TeacherDashboard from "./TeacherDashboard";


function App() {

  return (

    <>

      <BrowserRouter>

        <Routes>

          

          <Route
            path="/"
            element={<Login />}
          />


        

          <Route
            path="/signup"
            element={<Signup />}
          />


        

          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />


          

          <Route
            path="/student/attendance"
            element={<StudentAttendance />}
          />


      

          <Route
            path="/teacher/dashboard"
            element={<TeacherDashboard />}
          />


        </Routes>

      </BrowserRouter>

    </>

  );

}


export default App;