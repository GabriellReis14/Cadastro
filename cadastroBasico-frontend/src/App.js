import React from "react";

import Routes from "./routes";
import { LoadingProvider } from "./contexts/loadingContext";
import { AuthProvider } from "./contexts/authContext";

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';

function App() {
    return (
        <div className="App">
            <LoadingProvider>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </LoadingProvider>
        </div>
    );
}

export default App;
