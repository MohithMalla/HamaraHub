import React, { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import DashBoard from './components/dashboard/DashBoard';
import Profile from './components/user/Profile';
import { useAuth } from './authContext';
import CreateRepo from './components/repo/CreateRepo';
import RepoDetail from './components/repo/RepoDetail';
import Settings from './components/user/Settings';

const ProjectRoutes = () => {
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem('userId');

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }
        if(!userIdFromStorage && !['/auth', '/signup'].includes(window.location.pathname)){
            navigate('/auth');
        }
        if(userIdFromStorage && window.location.pathname === '/auth'){
            navigate('/');
        }
    
    }, [currentUser, navigate, setCurrentUser]);  

    let element = useRoutes([
        {
            path:"/",
            element: <DashBoard />
        },
        {
            path:"/auth",
            element: <Login />
        },
        {
            path:"/signup",
            element: <SignUp />
        },
        {   
            path:"/profile",
            element: <Profile />
        },
        {
            path:"/create",
            element: <CreateRepo />
        },
        {
            // Route for the Repo Details/Editor page
            path:"/repo/:id",
            element: <RepoDetail />
        },
        {
            path:"/settings", // <-- Add this new route
            element: <Settings />
        },
    ]);

    return element;
}

export default ProjectRoutes;