import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import temp1 from "./temp1.png";
import { Button } from "@material-ui/core";
import photo from "./photo.svg";
import download from "./download.svg";
import download2 from "./download2.svg";
import pdf from "./pdf.svg";
import linkedin from "./linkedin.svg";
import qrcode from "./qr_code.svg";
import email from "./email.svg";
import bgImage from "./assets/certificate_background.png"
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

const DisplayCert = ({ AllCert, sendEmail, handleActiveLink }) => {
  useEffect(() => handleActiveLink(""));

  const { hash } = useParams();
  console.log("hashvalue", hash);
  const shareUrl = "http://localhost:3000/certificate/" + hash;
  let cert;
  AllCert.forEach((c) => {
    if (c.transactionHash == hash) {
      cert = c;
    }
  });

  const [url, setUrl] = useState("http://localhost:3000/details/" + hash);

  const [qr, setQr] = useState("");
  const [mounted, setMounted] = useState(false);

  const onclickprint = (cname) => {
    const input = document.getElementById("innerdiv");
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
      logging: true,
      letterRendering: 1,
    }).then((canvas) => {
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const doc = new jsPDF("p", "px", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      doc.addImage(image, "JPEG", marginX, marginY, canvasWidth, canvasHeight);
      doc.save(cname + "'s_certificate.pdf");
    });
  };

  const imageprint = (cname) => {
    const input = document.getElementById("innerdiv");
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
      logging: true,
      letterRendering: 1,
    }).then((canvas) => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png", 1.0);
      a.download = cname + "'s_certificate.png";
      a.click();
    });
  };
  if (!mounted) {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#fdf9f3FF",
          
        },
      },
      (err, url) => {
        if (err) return console.error(err);

        console.log(url);
        setQr(url);
      }
    );
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="root-div">
      {cert !== undefined ? (
        <>
          <div id="printcertificate">
            <div id="flex-section">
              <div id="innerdiv">
                <div id="template">
                  <img class="image_template" src={bgImage} alt="" />
                </div>
                <div id="clg-name">
                  <h1>SHRI BHAGUBHAI MAFATLAL POLYTECHNIC</h1>
                </div>
                <div id="recognition-text">
                  <h1>CERTIFICATE</h1>
                  <h3>OF DIPLOMA</h3>
                </div>
                <div id="passoutyear-div">
                  <h1>PASSOUT</h1>
                  <h1>{cert.passoutYear.toNumber()}</h1>
                </div>
                <div id="normal-text">
                  <h1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus tempus, quam viverra sit augue faucibus. Lobortis felis facilisis tortor mol.
                  </h1>
                </div>
                <div className="sign-div">
                  <div className="sign-name">
                  <h1>Neeta Kadukar</h1>
                  <hr />
                  <h3>Principal</h3>
                  </div>
                  <div className="sign-name">
                  <h1>Neeta Kadukar</h1>
                  <hr />
                  <h3>Vice Principal</h3>
                  </div>
                </div>
                <div className="last-div">
                  <div className="sign-name">
                  <h3>Certificate ID:</h3>
                  <h4>{cert.transactionHash}</h4>
                  </div>
                  <div className="sign-name">
                  <h3>Issue date</h3>
                  <h4>{cert.issueDate}</h4>
                  </div>
                </div>

                <div id="text-name">
                  <h1>{cert.name}</h1>
                  
                </div>
                
                {qr && (
                  <>
                    <img id="qr-code" width={100} height={100} src={qr} />
                  </>
                )}
              </div>
              <div id="download-section">
                <h1>Issued by</h1>
                <hr id="hr" />
                <h2>Shri Bhagubhai Mafatlal Polytechnic</h2>
                <h1 class="action">Actions</h1>

                <hr id="hr" />
                <h3>Download</h3>
                <div class="download-btns">
                  <div class="btn2">
                    <Button
                      id="image-btn"
                      class="image-btn"
                      onClick={() => imageprint(cert.name)}
                    >
                      As Image
                      <img id="photo-svg" src={photo} alt="" />
                      <img id="photo-svg" src={download} alt="" />
                    </Button>
                    <Button
                      class="pdf-btn"
                      id="image-btn"
                      onClick={() => onclickprint(cert.name)}
                    >
                      As Pdf
                      <img id="photo-svg" src={pdf} alt="" />
                      <img id="photo-svg" src={download2} alt="" />
                    </Button>
                    {qr && (
                      <>
                        <a class="btn2" href={qr} download="qrcode.png">
                          <Button class="image-btn" id="image-btn">
                            Download Qr code
                            <img id="photo-svg" src={qrcode} alt="" />
                            <img id="photo-svg" src={download} alt="" />
                          </Button>
                        </a>
                      </>
                    )}
                    <Button
                      id="image-btn"
                      class="linkedin-btn email"
                      onClick={() =>
                        sendEmail(cert.name, cert.email, cert.transactionHash, cert.course)
                      }
                    >
                      Send Email
                      <img id="photo-svg" src={email} alt="" />
                    </Button>
                    <Button id="image-btn" class="linkedin-btn">
                      Add to LinkedIn
                      <img id="photo-svg" src={linkedin} alt="" />
                    </Button>
                  </div>
                  <hr id="hr2" />
                  <h3>Share</h3>
                  <div>
                    <div id="share-btns">
                      <div class="social-btns">
                        <FacebookShareButton
                          url={shareUrl}
                          quote={"Title or jo bhi aapko likhna ho"}
                          hashtag={"#portfolio..."}
                        >
                          <FacebookIcon size={35} />
                        </FacebookShareButton>
                      </div>

                      <div class="social-btns">
                        <WhatsappShareButton
                          url={shareUrl}
                          quote={"Title or jo bhi aapko likhna ho"}
                          hashtag={"#portfolio..."}
                          class="social-btns"
                        >
                          <WhatsappIcon size={35} />
                        </WhatsappShareButton>
                      </div>

                      <div class="social-btns">
                        <LinkedinShareButton
                          url={shareUrl}
                          quote={"Title or jo bhi aapko likhna ho"}
                          hashtag={"#portfolio..."}
                          class="social-btns"
                        >
                          <LinkedinIcon size={35} />
                        </LinkedinShareButton>
                      </div>
                      <div class="social-btns">
                        <TwitterShareButton
                          url={shareUrl}
                          quote={"Title or jo bhi aapko likhna ho"}
                          hashtag={"#portfolio..."}
                          class="social-btns"
                        >
                          <TwitterIcon size={35} />
                        </TwitterShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DisplayCert;
