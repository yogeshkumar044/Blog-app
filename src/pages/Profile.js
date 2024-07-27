import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';

const Profile = () => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
       const getUserData = async () => {
           try {
               const userData = await authService.getCurrentUser();
               setUser(userData);
           } catch (err) {
               setError(err.message);
           } finally {
               setLoading(false);
           }
       };

       getUserData();
   }, []);

   if (loading) return <div className="text-center py-10">Loading...</div>;
   if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

   return (
       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
           <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Profile</h1>
           <div className="mb-4">
               <strong className="block text-gray-600">Name:</strong>
               <span className="text-gray-800">{user.name}</span>
           </div>
           <div className="mb-4">
               <strong className="block text-gray-600">Email:</strong>
               <span className="text-gray-800">{user.email}</span>
           </div>
       </div>
   );
};

export default Profile;
