import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store'; 
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}> {/* Wrap App with Provider */}
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
