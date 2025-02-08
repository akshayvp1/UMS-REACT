import React, { useEffect, useState, useRef } from 'react';
import adminInstance from '../../../utils/axiosInstance'; 
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const debounceTimeout = useRef(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminInstance.get(`/admin/userss?search=${debouncedSearchTerm}`);
        if (response.data.success) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [debouncedSearchTerm]); 

  const handleEdit = (userId, currentName, currentImage) => {
    setEditingUserId(userId);
    setEditedName(currentName);
    setEditedImageUrl(currentImage);
  };

  const handleSave = async (userId) => {
    try {
      const response = await adminInstance.patch(`/admin/users/${userId}`, {
        name: editedName,
      });
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, name: editedName } : user
          )
        );
        setEditingUserId(null);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await adminInstance.delete(`/admin/users/${userId}`);
      if (response.data.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleImageUpload = async (event, userId) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ad-upload');

      const response = await fetch('https://api.cloudinary.com/v1_1/dedrcfbxf/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      setEditedImageUrl(imageUrl);

      const updateResponse = await adminInstance.patch(`/admin/users/${userId}/profile-picture`, {
        imageUrl,
      });

      if (updateResponse.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === userId ? { ...user, image: imageUrl } : user))
        );
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

 

  const handleLogout = async () => {
    try {
      const response = await adminInstance.get('/admin/logout');
      
      if (response.data.success) {
        localStorage.removeItem('token');
        
        navigate('/admin');
        
        toast.success('Logged out successfully');
      } else {
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      
      toast.error('An error occurred during logout. Please try again.');
    }
  };
  

  const handleClick = () => {
    navigate('/add-user');
  };

  // Debounce the search term change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, 500); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
     
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center gap-4 ml-[800px]" >
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm} 
                onChange={handleSearchChange}
              />
              <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Add User
              </button>

              <button
              onClick={handleLogout}
             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
               Logout
             </button>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <label htmlFor={`profilePic-${user._id}`} className="cursor-pointer">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                              {user.image ? (
                                <img
                                  src={user.image}
                                  alt={user.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                  {user.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            id={`profilePic-${user._id}`}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, user._id)}
                          />
                        </div>
                        <div className="ml-4">
                          {editingUserId === user._id ? (
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingUserId === user._id ? (
                        <button
                          className="text-green-600 hover:text-green-900 mr-3"
                          onClick={() => handleSave(user._id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => handleEdit(user._id, user.name, user.image)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
