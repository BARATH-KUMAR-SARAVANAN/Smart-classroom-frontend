import React, { useState } from 'react';
import Navbar from '../Navbar';
import AssignmentList from '../../DashboardComponent/AssignmentList';
import ChatBox from '../ChatBox';
import AssignmentDetail from '../../DashboardComponent/AssignmentDetail'; // Importing the AssignmentDetail component
import './index.css';

const Home = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Manage the selected assignment

  const handleAssignmentSelection = (assignment) => {
    setSelectedAssignment(assignment); // Set the selected assignment
  };

  return (
    <div className='homePageContainer'>
      <Navbar /> 
      <div className='homePageBodyContainer'>
        <ChatBox/>
        {/* {!selectedAssignment ? (
          <AssignmentList onAssignmentSelect={handleAssignmentSelection} /> // Pass the function to AssignmentList to trigger assignment selection
        ) : (
          <AssignmentDetail assignment={selectedAssignment} /> // Pass selected assignment to AssignmentDetail component
        )} */}
      </div>
    </div>
  );
}

export default Home;
