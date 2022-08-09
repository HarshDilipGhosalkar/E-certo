import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from 'qrcode';
import printJS from 'print-js'
// import  Puppeteer  from 'puppeteer';
// const nodemailer = require('nodemailer');

const DisplayCert = ({ AllCert }) => {
  const { hash } = useParams();
  console.log("hashvalue",hash);
  
let cert;
AllCert.forEach(c => {
    if(c.transactionHash == hash){
        cert =c;
    }
});

const [url, setUrl] = useState('http://localhost:3000/details/'+ hash);

  
	const [qr, setQr] = useState('')
  const [mounted, setMounted] = useState(false)
 function onclickprint (){
    // event.preventDefault();
    // window.print();
    printJS("printcertificate", "html");
  };
  
	// const GenerateQRCode = () => {
	// 	QRCode.toDataURL(url, {
	// 		width: 800,
	// 		margin: 2,
	// 		color: {
	// 			dark: '#335383FF',
	// 			light: '#EEEEEEFF'
	// 		}
	// 	}, (err, url) => {
	// 		if (err) return console.error(err)

	// 		console.log(url)
	// 		setQr(url)
	// 	})
	// }
  if(!mounted){
    
      QRCode.toDataURL(url, {
			width: 800,
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, url) => {
			if (err) return console.error(err)

			console.log(url)
			setQr(url)
		})
  }

  useEffect(() =>{
    setMounted(true)
  },[])
  return (
    <>
    {cert !== undefined && cert.metaData !== undefined? (
      <>
     
      <div id="printcertificate">
      <h1>{cert.certid.toNumber()}</h1>
      <h1>{cert.transactionHash}</h1>
      <h1>{cert.metaData.name}</h1>
      <h1>{cert.metaData.course}</h1>
      <h1>{cert.metaData.contact}</h1>
      {qr && <>
				<img width={200} height={200} src={qr} />
        
        <br />
				<a class="downloadcert" href={qr} download="qrcode.png">Download</a>
			</>}
      </div>
      <br />
      <button
          className="btn"
          onClick={onclickprint}
          variant="success"
          type="submit"
          class="btns"
        >
          Print
        </button>
        <br />
        <button
          className="btn"
          onClick={onclickprint}
          variant="success"
          type="submit"
          class="btns"
        >
          Print and send email
        </button>
       
      </>
        ) : null}
        
        
    </>
  );
};

export default DisplayCert;
