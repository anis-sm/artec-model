import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    mobile: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [databases, setDatabases] = useState([
    { id: 1, name: "MySQL - Production" },
    { id: 2, name: "PostgreSQL - Staging" }
  ]);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/me', {
          method: 'GET',
          credentials: 'include'
        });
        if (response.status === 401) {
          toast.warn('Please log in to view your settings', {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUser({
          firstName: data.first_name,
          lastName: data.last_name,
          username: data.username,
          mobile: data.mobile_number || ''
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
        toast.error('Failed to fetch user information', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddDatabase = () => {
    const name = prompt("Enter new database name:");
    if (name) {
      setDatabases([...databases, { id: Date.now(), name }]);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/update', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          mobile_number: user.mobile
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('User settings updated successfully', {
          position: "top-right",
          autoClose: 3000,
        });
        setIsEditing(false);
      } else {
        console.error('Failed to update user settings:', data.message);
        toast.error(`Failed to update settings: ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating user settings:', error);
      toast.error('Error updating user settings', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleModify = () => {
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

      {/* Toast Container */}
      <ToastContainer />

      {/* User Information Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">User Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${
                !isEditing ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'text-gray-800'
              }`}
              placeholder="First Name"
              readOnly={!isEditing}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${
                !isEditing ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'text-gray-800'
              }`}
              placeholder="Last Name"
              readOnly={!isEditing}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${
                !isEditing ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'text-gray-800'
              }`}
              placeholder="Username"
              readOnly={!isEditing}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleInputChange}
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${
                !isEditing ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'text-gray-800'
              }`}
              placeholder="Mobile Number"
              readOnly={!isEditing}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="mt-6 space-x-4">
          {!isEditing ? (
            <button
              onClick={handleModify}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
            >
              Modify
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Database Connections Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Connected Databases</h2>
          <button
            onClick={handleAddDatabase}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Connection
          </button>
        </div>

        <ul className="space-y-2">
          {databases.map((db) => (
            <li key={db.id} className="border border-gray-200 p-3 rounded bg-gray-50">
              {db.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}