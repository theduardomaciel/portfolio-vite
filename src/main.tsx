import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import Layout from "./components/Layout/Layout";

// Default Stylesheet
import './index.css';

// Sections Stylesheets
import './sections/Home/home.css';
import './sections/Projects/projects.css';
import './sections/Technologies/technologies.css';

// App Context (Theme and Language)
import { ContextProvider } from './context/appContext';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ContextProvider>
            <Layout>
                <App />
            </Layout>
        </ContextProvider>
    </React.StrictMode>
);