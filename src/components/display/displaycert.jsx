import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from 'qrcode';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

//  function onclickprint (){
//     printJS("printcertificate", "html");
//   };
  const onclickprint =(cname)=>{
   const input =document.getElementById("printcertificate")
   html2canvas(input,{logging: true, letterRendering:1, useCORS: true}).then(canvas => {
   const imgWidth =208;
   const imgHeight = canvas.height * imgWidth/ canvas.width;
   const imgData =canvas.toDataURL("img/png");
   const pdf =new jsPDF("p","mm","a4");
   pdf.addImage(imgData,"PNG",0,0,imgWidth,imgHeight);
   pdf.save(cname+"_certificate.pdf")
   })
  }
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
      <h1 >{cert.certid.toNumber()}</h1>
      <h1 id="styleIt">{cert.transactionHash}</h1>
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
          onClick={() => onclickprint(cert.metaData.name)}
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
