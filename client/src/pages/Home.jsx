import React from 'react'
import '../App.css';
import home from '../images/illustration.png';
import start from '../images/start.png';
import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    AOS.init({
        
        disable: false, 
        startEvent: 'DOMContentLoaded', 
        initClassName: 'aos-init', 
        animatedClassName: 'aos-animate', 
        debounceDelay: 50, 
        throttleDelay: 99,         
        offset: 50, 
        delay: 0, 
        duration: 1000, 
        easing: 'ease', 
        once: false, 
        mirror: false, 
        anchorPlacement: 'top-bottom', 
    });

    const handleBtn = ()=>{
        navigate('/');
    }
    return (
        <>
            <Navbar />
            <div className='container_home'>
                <div className='container_home_center'>
                    <img className='left_img' src={home} data-aos="fade-up"/>
                    <div className='home_right'>
                        <h2 data-aos="fade-in">FileShare : Fast, and Reliable File Sharing</h2>
                        <p className='description' data-aos="fade-in">Easily Share Files, Anytime, Anywhere
                        <br></br>
                        <span className='description1'>  
                            Say goodbye to cumbersome email attachments and USB drives. With FileShare, effortlessly share files with anyone, anywhere, with just a few clicks.
                        </span>
                        </p>
                        <button className='home_btn' onClick={handleBtn}><img src={start} className='start_icon' /> Get Started</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;