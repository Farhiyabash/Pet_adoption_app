import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import { Provider } from 'react-redux';
import store from './redux/store'; // Import the Redux store
import Navigation from './components/Navigation'; // Import the Navigation component
import HomePage from './pages/HomePage'; // Import the HomePage component
import './styles/App.css'; // Global styles

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navigation />
                <div className="container mt-4">
                    <Routes> {/* Replace Switch with Routes */}
                        <Route path="/" element={<HomePage />} /> {/* Update Route syntax */}
                        {/* Additional routes can be added here */}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
