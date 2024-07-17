import React, { useState } from 'react';
import '@dotlottie/player-component'; // Import the dotLottie player component
import './welcome.css';
import Header from './header';
import Footer from './footer';
import { NavLink } from 'react-router-dom';

const Welcome = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={`${darkMode ? 'dark-mode' : 'light-mode'} mouse`}>
            <Header toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
            <div className="welcome-container">
                <dotlottie-player
                    src="https://lottie.host/531a5ec8-4088-4d11-b426-63c4d2c6c1b0/cS4lV9VQfk.lottie"
                    background="transparent"
                    speed="1"
                    style={{ width: '300px', height: '300px' }}
                    className="dotlottie-player"
                    loopheppu
                    autoplay>
                </dotlottie-player>
                <div className='welcome-main'>
                    <div className="welcome-text">
                        <h1 className="animated-text">Hi 👋! <span>RGUKTian</span> </h1>
                        <h2 className="animated-text">Welcome to RGUKT Grade Mate</h2>
                    </div>
                    <div>
                        <p className='color text-center'>This project helps you calculate your SGPA and CGPA with ease. Select your branch and semester, and enter your grades to get started.</p>
                        <div className="btns">
                            <NavLink to="/cgpa">
                                <button className="btn gradient-button mx-2">Calculate CGPA</button>
                            </NavLink>
                            <NavLink to="/sgpa">
                                <button className="btn gradient-button mx-2">Calculate SGPA</button>
                            </NavLink>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='about'>
                <div className="welcome-text col-md-6">
                    <h4 className='animated-text'>About</h4>
                    <p className='color' style={{ textIndent: '100px' }}>This project simplifies SGPA and CGPA calculations: select your branch and semester, input grades, and begin. Developed by an RGUKT AP student, it adheres to exam cell norms. The site operates without a database for enhanced privacy; no user data is collected. For accuracy, users are encouraged to consult their exam cell for any discrepancies. This initiative aims to assist students in achieving academic excellence in upcoming semesters. All credit goes to RGUKT AP for their support and assistance.</p>
                </div>

                <dotlottie-player
                    src="https://lottie.host/008eb9a3-2f8c-4f82-913e-fa9c9f9ce21b/4GCQJ1Iqfz.lottie"
                    background="transparent"
                    speed="1"
                    style={{ width: '300px', height: '300px' }}
                    className="dotlottie-player col-md-6"
                    loop
                    autoplay>
                </dotlottie-player>
            </div>
            <div className='about'>
                <div className="image-container col-md-6 ">
                    <img src="/manikanta.png" alt="manikanta" className="mani" />
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/veera-manikanta-nandikolla-0b0ba0255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank' className="text-white mx-2"><img src="https://img.icons8.com/ios-filled/30/FFFFFF/linkedin.png" alt="LinkedIn" /></a>
                        <a href="https://x.com/Nandikolla65209?t=_lAS86KUbpiLtjBKJghdkw&s=09" className="text-white mx-2" target='_blank'><img src="https://img.icons8.com/ios-filled/30/FFFFFF/twitter.png" alt="Twitter" /></a>
                        <a href="https://www.instagram.com/mani_kanta353?igsh=Zmhpbnk3M2d3Ymk2" className="text-white mx-2" target='_blank'><img src="https://img.icons8.com/ios-filled/30/FFFFFF/instagram-new.png" alt="Instagram" /></a>
                        <a href="https://github.com/mani-353" className="text-white mx-2" target='_blank'><img src="https://img.icons8.com/ios-filled/30/FFFFFF/github.png" alt="GitHub" /></a>
                        <a href="https://api.whatsapp.com/send/?phone=9063374811" className="text-white mx-2" target='_blank'><img src="https://img.icons8.com/ios-filled/30/FFFFFF/whatsapp.png" alt="WhatsApp" /></a>
                    </div>
                </div>
                <div className="welcome-text col-md-6">
                    <h4 className='animated-text'>Developer</h4>
                    <p className='color mt-5' style={{ textIndent: '100px' }}>Hi👋,Hello, I'm Veera Manikanta Nandikolla, a third-year B.Tech student in Computer Science at RGUKT Nuzvid. I'm passionate about computer science and aspiring to be a full-stack developer. Eager to collaborate on innovative projects and learn Web 3 technologies. Seeking opportunities to contribute and connect with like-minded professionals. Feel free to reach out for collaborations or hiring. Contact details in the footer. Let's connect and create something impactful together!
                    </p>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Welcome;
