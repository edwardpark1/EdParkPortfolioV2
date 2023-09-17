/*
    File: App.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import {
    useEffect,
    useState,
} from "react";
import PageStructure from './components/PageStructure';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Resume from './pages/Resume';
import ErrorPage from './pages/404';
import ThankYou from './pages/ThankYou';

function App() {
    // Dark Mode is default
    const intialTheme = () => {
        const userPref = localStorage.getItem("darkmode");
        const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;

        //return true for dark mode, false for light mode
        return (userPref === "dark" || (!userPref && systemPref));
    };

    const [isDarkMode, setIsDarkMode] = useState(intialTheme());

    const toggleDarkMode = () => {
        localStorage.setItem("darkmode", !isDarkMode ? "dark" : "light");
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <PageStructure isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
            errorElement: (
                <PageStructure isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
                    <ErrorPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                </PageStructure>
            ),
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "services",
                    element: <Services />,
                },
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "resume",
                    element: <Resume />,
                },
                {
                    path: "thank-you",
                    element: <ThankYou />,
                },
                {
                    // This is needed to avoid getting error when toggling light and dark mode within 404 page
                    path: '*',
                    element: <ErrorPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App