import React from "react";
// import { useState, useEffect, useRef } from "react";

const Table = ({ allCert, data, enableState, disableState, emailLoop }) => {
    // const resendStatus = useRef(false);
    var emailList = [];
    var checked = 0;
    function arrayRemove(arr, value) {

        return arr.filter(function (cer) {
            return cer.certid.toNumber() != value;
        });

    }
    const send = (cert, clsname) => {
        var checkBox = document.querySelector("." + clsname);
        if (checkBox.checked == true) {

            emailList.push(cert);
            checked += 1;
            enableState();
            if(checked==data.length){
                document.querySelector(".allCheck").checked=true;
            }else{
                document.querySelector(".allCheck").checked=false;
            }
        } else {

            emailList = arrayRemove(emailList, cert.certid.toNumber());
            checked -= 1;
            if (checked <= 0) {
                disableState();
            }
            document.querySelector(".allCheck").checked=false;
        }

        console.log(emailList);

    }
    function tog() {
    const checkBoxes=document.querySelectorAll(".commonChk");
    const allCheck=document.querySelector(".allCheck");
    if (allCheck.checked==true) {
        console.log("yes");
        emailList=[]
        emailList=[...data];
        checkBoxes.forEach(chk => {
          chk.checked=true;
        });
        console.log(emailList);
        enableState();
    } else {
        emailList=[]
        checkBoxes.forEach(chk => {
        chk.checked=false;
        });
        console.log(emailList);
        disableState();
    }

    }
    return (
        <>
            <div className="table-btn">
                <h5>{allCert.length} Certificates
                </h5>
                <div id="resend-btn" onClick={() => emailLoop(emailList)} >Resend Email</div>
            </div>
            <div className="hr2"></div>
            <div className="tab">
                {data !== undefined ? (
                    <>
                        <table class="content-table">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" className="allCheck" onClick={()=>tog()}/></th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Issue Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data.map((item) => (
                                    <tr >
                                        <td><input type="checkbox" className={"commonChk  chk" + item.certid.toNumber()}  onClick={() => send(item, "chk" + item.certid.toNumber())} /></td>
                                        <td><a href={"certificate/" + item.transactionHash}>{item.certid.toNumber()}</a></td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.course}</td>
                                        <td>{item.issueDate}</td>


                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </>
                ) : null}
            </div>

        </>
    );
};

export default Table;