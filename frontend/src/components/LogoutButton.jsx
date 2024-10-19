// // src/components/LogoutButton.jsx
// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { logoutUser } from '../services/api'; // Import the logout function

// const LogoutButton = () => {
//     const history = useHistory();

//     const handleLogout = async () => {
//         try {
//             await logoutUser(); // Call the API to logout the user
//             localStorage.removeItem('access_token'); // Remove the token from local storage
//             history.push('/login'); // Redirect to the login page
//         } catch (error) {
//             console.error('Logout failed', error);
//             // Optionally handle error (e.g., display a message)
//         }
//     };

//     return (
//         <button className="btn btn-outline-danger" onClick={handleLogout}>
//             Logout
//         </button>
//     );
// };

// export default LogoutButton;
