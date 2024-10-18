import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AdoptionRequestsPage from './pages/AdoptionRequestsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage
import './styles/App.css';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navigation />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/adopt" element={<AdoptionRequestsPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<ProfilePage />} /> {/* New route for Profile */}
                        {/* Additional routes can be added here */}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;

