import React from 'react';
import './index.css';
import TeacherNavbar from '../TeacherNavbar';
import TeacherDashboard from '../../RoleComponents/TeacherDashboard';
 
const TeacherHome = () => {


  return (
    <div className='homePageContainer'>
      <TeacherNavbar /> 
      <div className='homePageBodyContainer'>
        <TeacherDashboard/>
      </div>
    </div>
  );
}

export default TeacherHome;
