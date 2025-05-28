// Importing required modules and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

// Check if the current environment is production
// If it is, disable the React Developer Tools for security purposes
if (process.env.NODE_ENV === 'production') disableReactDevTools();

// Create a root concurrent mode (also known as React's experimental mode) c
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
// The application is wrapped in React's StrictMode and AuthProvider
// React's StrictMode is a tool for highlighting potential problems in an application
// AuthProvider is a context provider that allows child components to have access to the authentication context
root.render(
 <React.StrictMode>
    <AuthProvider>
         <App />
    </AuthProvider>
  </React.StrictMode>
);

