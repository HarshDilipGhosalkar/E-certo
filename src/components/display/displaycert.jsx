import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from 'qrcode';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import temp1 from "./temp1.png";
import { Button, MenuItem, TextField, Typography } from "@material-ui/core";



const DisplayCert = ({ AllCert }) => {
  const { hash } = useParams();
  console.log("hashvalue", hash);

  let cert;
  AllCert.forEach(c => {
    if (c.transactionHash == hash) {
      cert = c;
    }
  });

  const [url, setUrl] = useState('http://localhost:3000/details/' + hash);


  const [qr, setQr] = useState('')
  const [mounted, setMounted] = useState(false)


  const onclickprint = (cname) => {
    const input = document.getElementById("innerdiv")
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
      logging: true,
      letterRendering: 1
    }).then(canvas => {
      const image = canvas.toDataURL('image/jpeg', 1.0);
      const doc = new jsPDF('p', 'px', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
      doc.save(cname + "'s_certificate.pdf")
    });
  }

  const imageprint = (cname) => {
    const input = document.getElementById("innerdiv");
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
      logging: true,
      letterRendering: 1
    }).then(canvas => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png', 1.0);
      a.download = cname + "'s_certificate.png";
      a.click();
    });
  }
  if (!mounted) {

    QRCode.toDataURL(url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#335383FF',
        light: '#FFCA60FF'
      }
    }, (err, url) => {
      if (err) return console.error(err)

      console.log(url)
      setQr(url)
    })
  }

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      {cert !== undefined ? (
        <>

          <div id="printcertificate">

            <div id="innerdiv">
              <div id="template">
                <img class="image_template" src={temp1} alt="" />
              </div>
              <div id="cert-id">
                <h1 id="styleIt">{cert.transactionHash}</h1>
              </div>

              <div id="text-name">
                <h1>{cert.name}</h1>
              </div>
              <div id="course-text">
                <h1>{cert.course} with {cert.percentage.toNumber()} %</h1>
              </div>
              <h1>{cert.contact.toNumber()}</h1>

              {qr && <>
                <img id="qr-code" width={100} height={100} src={qr} />


              </>}
            </div>
          </div>

          <div id="btn-div">
            <div class="btns1">

              <div class="btn2">
                <Button variant="outlined" color="primary" onClick={() => onclickprint(cert.name)}>
                  Print Certificate as Pdf
                </Button>
              </div>
              <div class="btn2">
                <Button variant="contained" color="primary" onClick={() => imageprint(cert.name)}>
                  Print Certificate as Image
                </Button>
              </div>


              {qr && <>
                <a class="btn2" href={qr} download="qrcode.png">
                  <Button variant="outlined" color="primary" >
                    Print QR Code
                  </Button>
                </a>
              </>}
            </div>
          </div>

        </>
      ) : null}


    </>
  );
};

export default DisplayCert;
