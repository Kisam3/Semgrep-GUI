// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import './landingpage.css';
// eslint-disable-next-line
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import {MenuIcon, XIcon} from '@heroicons/react/outline';
import FileUpload from "./upload";
import ResultsPage from "./fetch";

// eslint-disable-next-line
function Landing() {
    const navigate = useNavigate();

    // eslint-disable-next-line
    const navigatetoUpload = () => {
        navigate("/upload");
    }

    const navigatetoResults = () => {
        navigate("/result");
    }

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)
    return (
        <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
            <div className='px-2 flex justify-between items-center w-full h-full'>
                <h1 className='text-3xl font-bold mr-4 sm:text-4xl text-green-500'>SEMGREP-GUI</h1>
            <div className='hidden md:flex pr-10'>
                <button className='px-5 py-3 mr-7'><Link to="/upload">Upload</Link></button>
                <button className='px-5 py-3 mr-7'><Link to="/result">View Results</Link></button>
            </div>
                <div className='md:hidden' onClick={handleClick}>
                    {!nav ? <MenuIcon className='w-5'></MenuIcon> : <XIcon className='w-5'></XIcon>}
                </div>
            </div>
            <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
                <div className={'flex flex-col my-6'}>
                    <button className={'bg-transparent text-indigo-800 px-8 py-3 mb-5'}><Link to="/upload">Upload</Link></button>
                    <button className={'px-8 py-3 mb-5'}><Link to="/result">View Results</Link></button>
                </div>
            </ul>
            <Routes>
                <Route path = "/upload" element = {<FileUpload />} />
                <Route path = "/result" element = {<ResultsPage />} />
            </Routes>
            <img src={require("./img/background.jpg")} alt={'Backgroung'} />
        </div>
    );
}

export default Landing;