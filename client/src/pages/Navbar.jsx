import React from 'react'
import logo from '../images/logo.png';
import github from '../images/github1.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const handleLogo = () => {
        navigate('/welcome');
        window.location.reload();
    }
    return (
        <div className='nav'>
            <div className='left_logo' onClick={handleLogo}>
                <img src={logo} className='logo' />
                FileShare
            </div>
            <a href='https://github.com/AmanPathan/FileShare.app' target='_blank' className='link_github'><img src={github} className='github' /></a>
        </div>
    )
}

export default Navbar