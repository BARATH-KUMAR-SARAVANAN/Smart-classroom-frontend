import React, { useEffect, useState } from 'react';
import './index.css';

const AdminAssignPage = () => {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('select');
  const [classId, setClassId] = useState('');
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/admin/unassigned-users')
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch('http://localhost:8000/admin/classes')
      .then(res => res.json())
      .then(data => setClasses(data));
  }, []);

  const assignRole = async () => {
    if (!selectedUser || !role) return alert("Select user and role");

    const payload = role === 'student'
      ? { user_id: selectedUser, role, class_id: parseInt(classId) }
      : { user_id: selectedUser, role, subject, department };

    const res = await fetch(`http://localhost:8000/admin/assign-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (res.ok) {
      alert("User assigned successfully");
      setUsers(users.filter(u => u.id !== selectedUser));
      setSelectedUser(null);
      setClassId('');
      setSubject('');
    } else {
      alert(result.message || "Error assigning role");
    }
  };

  const getOptions = () => {
    if (role === "student") {
      return (
        <div className="form-group">
          <label htmlFor='classId'>Class</label>
          <select id="classId" value={classId} onChange={e => setClassId(e.target.value)}>
            <option value="">Select a class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                Grade {c.grade} - Section {c.section}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return (
      <div className="form-group">
        <label htmlFor='subject'>Subject</label>
        <input
          id="subject"
          value={subject}
          onChange={e => {
            setSubject(e.target.value);
            setDepartment(e.target.value);
          }}
        />
      </div>
    );
  };

  return (
    <div className="admin-container">
      <h1>🛠️ Admin Role Assignment</h1>

      <div className="form-group">
        <label>Select User:</label>
        <select onChange={e => setSelectedUser(e.target.value)} value={selectedUser || ''}>
          <option value="" disabled>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Assign Role:</label>
        <select onChange={e => setRole(e.target.value)} value={role}>
          <option value="select">select</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      {role !== "select" && getOptions()}

      <button className="assign-btn" onClick={assignRole}>✅ Assign</button>
    </div>
  );
};

export default AdminAssignPage;
