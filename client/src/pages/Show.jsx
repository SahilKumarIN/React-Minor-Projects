import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import download_icon from '../images/download.png';
import download_icon1 from '../images/download1.png';
import success_icon from '../images/success1.png';
import copy_icon from '../images/copy1.png';
import upload_icon from '../images/upload1.png';
import doc_icon from '../images/doc.png';
import whatsapp_icon from '../images/whatsapp.png';
import mail_icon from '../images/mail.png';
import { useNavigate } from 'react-router-dom';

import emailjs from '@emailjs/browser';
emailjs.init("_tkNbPWngWwPRS8yh");

const Show = () => {
    const navigate = useNavigate();
    const BASE_URL = 'https://fileshare-app-8e4k.onrender.com';

    const { uuid } = useParams();
    const [fileData, setFileData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [fileLink, setFileLink] = useState('');
    const [fileUUID, setFileID] = useState('');
    const [fileSize, setFileSize] = useState('');

    const fetchUsers = async () => {
        axios.get(`http://localhost:8000/files/${uuid}`) //8000
            .then((res) => {
                setFileData(res.data);
                setFileName(res.data.fileName);
                setFileLink(res.data.downloadLink);
                setFileID(res.data.uuid);
                setFileSize(res.data.size);
            }).catch((err) => {
                console.log("error fetching data", err);
            })
        console.log(fileData);
    }


    useEffect(() => {
        fetchUsers();
    }, []);

    const handleNavigate = () => {
        navigate('/');
    }

    const [email_to, setEmailTo] = useState('');
    const [email_subject, setEmailSubject] = useState('');

    var templateParams = {
        email_to: email_to,
        email_subject: email_subject,
        email_link: fileLink, //8000
    };
    const sendMail = () => {

        emailjs.send('service_vb0s9br', 'template_15ld6rk', templateParams)
            .then((result) => {
                console.log('Email Sent');
                setEmailTo("");
                setEmailSubject("");
                toast.success('Email Sent Successfully!');
            }, (error) => {
                toast.error('Error Sending Email!')
                console.log('Error sending mail!', error);
            });
    }

    const wts_link = `whatsapp://send?text=Download Your File Shared Using FileShare App : ${fileLink}` //3000
    const handleSubmit = () => {
        sendMail();
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="container">
                <div className="container-center uploaded_container">
                    <div className='container_left'>

                        <div className="show-container">
                            <div className='heading heading_download'>
                                <img className="upload-icon" src={success_icon} />
                                <h2>Upload Successful!</h2>
                            </div>
                            <h3 className='text'>Copy & Share This Link With Your Friends</h3>
                            <div className='file-box'>
                                <img src={doc_icon} className='file_logo' />
                                <p className='filename_text'>{fileName}</p>
                                <p className='filesize_text'>{Math.floor(fileSize / 1024) + "." + fileSize % 1024 + " KB"}</p>
                            </div>
                        </div>
                        <div className="link-box">
                            <div className='link_div'>
                                <img src={download_icon1} className='copy_icon2' />
                                <p className='link'>{`${fileLink}`}</p>
                            </div>
                            <div className='share_btns'>
                                <img src={copy_icon} onClick={() => { navigator.clipboard.writeText(`${fileLink}`); toast.success('Copied to Clipboard') }} className='copy_icon1' alt='copy link' />
                                <a href={wts_link} data-action="share/whatsapp/share">
                                    <img src={whatsapp_icon} className='copy_icon1' alt='copy link' />
                                </a>

                            </div>
                        </div>

                    </div>
                    <div className='container_right'>
                        <div className='container_email'>
                            <img className="upload-icon" src={mail_icon} />
                            <p className='email_title'>You can also send the link through mail directly</p>
                            <div className='email_form'>
                                <label className='label'>Email To</label>
                                <input className='input_container' type='email' onChange={(e) => setEmailTo(e.target.value)} />
                                <label className='label'>Subject</label>
                                <input className='input_container' type='text' onChange={(e) => setEmailSubject(e.target.value)} />
                            </div>
                            <div className='btn_container'>
                                <div className='download_btn' onClick={handleSubmit}>
                                    Send Email
                                </div>
                                {/* <div className='link_div'> */}
                                <div className='download_btn' onClick={handleNavigate}>
                                    <img src={upload_icon} className='file_logo_1 file_logo_2' />
                                    Upload New
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Show;