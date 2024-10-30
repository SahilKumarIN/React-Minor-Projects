import './App.css';
import React, { useRef, useState, useEffect } from 'react';
// import { uploadFile } from './services/api';
import { useNavigate } from 'react-router-dom';
import upload_icon from './images/upload.png';
import pdf_icon from './images/folder1.png';
import link_icon from './images/link.png';
import copy_icon from './images/copy1.png';
import check_icon from './images/check.png';
import cross_icon from './images/cross.png';
import upload_btn from './images/upload_btn.png';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const App = () => {


  const PINATA_JWT = process.env.PINATA_JWT;
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  const navigate = useNavigate();

  const maxSizeAllowed = 100 * 1024 * 1024;
  const fileInputRef = useRef();

  const [file_path, setFile_Path] = useState('');
  const [fileHash, storeHash] = useState('');
  const [uuid, setUUID] = useState('');
  const [file_unique_name, setUniqueName] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);


  const [fileSize, setFileSize] = useState(0);

  const [filename, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('none');

  const handleClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFileSize(event.target.files[0].size);
      setFileName(event.target.files[0].name);
    }
  };

  const [classFlag, setClassFlag] = useState(false);

  const handleDragIn = (event) => {
    event.preventDefault();
    setClassFlag(true);
  }
  const handleDragOut = (event) => {
    event.preventDefault();
    setClassFlag(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setClassFlag(false);
    const files = e.dataTransfer.files;
    setFileName(files[0].name);
    setSelectedFile(e.dataTransfer.files[0]);
    setFileSize(e.dataTransfer.files[0].size);
  }

  const clearFileInput = () => {
    fileInputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus('none');
  }
  const handleUpload = async () => {
    if (fileSize > maxSizeAllowed) {
      toast.error("Can't Upload More Than 100mb");
      clearFileInput();
      return;
    }
    if (uploadStatus === 'done') {
      setUploadStatus('done');
      clearFileInput();
      navigate(`/files/${uuid}`);
      return;
    }
    try {
      setUploadStatus('uploading');
      const formData = new FormData();
      const uniqueName = `${currentDate}-${Math.round(Math.random() * 1E9)}-FileShare`;
      formData.append("file", selectedFile);
      formData.append('pinataOptions', '{"cidVersion": 0}');
      formData.append('pinataMetadata', `{"name":"${uniqueName}"}`);
      console.log(selectedFile);
      const response = await axios({
        method: "post",
        url: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
        data: formData,
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjZDU1NzI2Yy1mZDZjLTRjYTQtOTUzMi01NWU1YWFjYTEwMmUiLCJlbWFpbCI6InRoZWRldmVsb3BlcnJvbmluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1MzEyMzhkNGI0YmU5YmIxMjMxNyIsInNjb3BlZEtleVNlY3JldCI6IjAzOGQxZWE2NzUyNTgwMjNkMTJkYTNhODBiY2Y5NjU1NTExZTEwZWM3MTA0ZTlhM2JiMTQxZWU3YzBlMDljOTMiLCJpYXQiOjE3MDU3NDgxMzR9.jRjaJkQ-LIKq5k5E4xtuL31AmiMDgYYSPHz1WOLU_nU`
        },
        onUploadProgress: (progressEvent) => {
          const percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentageCompleted);
          if (percentageCompleted === 100) {
            setUploadStatus('done');
            toast.success('File Uploaded Sucessfully');
          }
        }
      });

      const uuid = uuidv4();
      setUUID(uuid);
      setUniqueName(uniqueName);

      const ImgHash = `${response.data.IpfsHash}`;
      storeHash(ImgHash);

      setFile_Path(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
      console.log(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);


        let fileName = uniqueName;
        let fileUUID = uuid;
        let fileHash = ImgHash;
        let fileLink = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      const backRes = await axios.post('http://localhost:8000/api/files',{fileName,fileUUID,fileHash,fileLink,fileSize});
      console.log(backRes.data.data);
      if(backRes.data.data){
        navigate(`/files/${uuid}`);
      }
    }
    catch (error) {
      setUploadStatus('none');
    }
  }

  console.log("below navigate");

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="container container_in_download">
        <div className="container-center">
          <div className={!classFlag ? "upload-container" : "upload-container-drag"} onDragOver={handleDragIn} onDragLeave={handleDragOut} onDrop={handleDrop}>

            <div className='heading'>
              <img className="upload-icon" src={upload_icon} />
              <h3>Drag and Drop Your File Here</h3>
              <p className='or'>or</p>
            </div>
            <div className="input_div">
              <button onClick={handleClick} className='upload-btn'>Browse</button>
              <input className='input' type="file" ref={fileInputRef} onChange={handleFileChange} />
            </div>
          </div>
          {selectedFile && (
            <div className="after-upload">
              <img src={pdf_icon} className='file_logo file_logo_none' />
              <div className='file_status_div'>
                <div className="progress_div">
                  <p className='file_name file_name_crop'>{filename}</p>
                  <p className='file_name'>{progress}%</p>
                </div>
                <div className='loader_div'>
                  <div className="loader" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              {(uploadStatus === 'uploading') ?
                <div className='icon_div'>
                  <img className="cross-icon" src={cross_icon} onClick={clearFileInput} />
                </div> : ""}
              {(uploadStatus === 'none' && progress < 100) ?
                <div className="upload_final_btn" onClick={handleUpload}>
                  <img className="cross-icon1" src={upload_btn} />
                  <p>Upload</p>
                </div> : ""}
              {(uploadStatus === 'done' || progress === 100) ? <div className='icon_div'><img className="cross-icon" src={check_icon} /></div> : ""}
            </div>
          )}

          {/* <div className="link-box">
            <div className='link_div'>
              <img src={link_icon} className='copy_icon' />
              <a href='#' className='link'>{file_link}</a>
            </div>
            <img src={copy_icon} onClick={() => { navigator.clipboard.writeText(file_link); toast.success('Copied to Clipboard')  }} className='copy_icon1' alt='copy link' />
          </div> */}

        </div>
      </div>
    </>
  );
}

export default App;
