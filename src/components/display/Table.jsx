import React from "react";
import { useState, useEffect } from "react";

const Table = ({ data,enableState,disableState }) => {
    var emailList=[];
    var checked=0;


    function arrayRemove(arr, value) {
 
        return arr.filter(function(cer){
            return cer.certid.toNumber() != value;
        });
      
     }
    const send=(cert,clsname)=>{
        var checkBox = document.querySelector("."+clsname);
        if (checkBox.checked == true){
            
            emailList.push(cert);
            checked+=1;
            enableState();
          } else {
             
            emailList = arrayRemove(emailList, cert.certid.toNumber());
            checked-=1;
            if(checked<=0){
                disableState();
            }
          }

        console.log(emailList);
        
    }
    // useEffect(() => {
    //     if(checked>0){
    //         enableState();
    //     }else{
    //         disableState();
    //     }

        
    //   });
    return (
        <>
        {data !== undefined ? (
            <>
        <table class="content-table">
            <thead>
                <tr>
                <th><input type="checkbox" /></th>
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
                        <td><input type="checkbox" className={"chk"+item.certid.toNumber()} onClick={() => send(item,"chk"+item.certid.toNumber())}/></td>
                    <a href={"certificate/" + item.transactionHash}><td>{item.certid.toNumber()}</td></a>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.course}</td>
                                <td>{item.issueDate}</td>
                                {/* <a href={"certificate/" + item.transactionHash}><td>View</td></a> */}
        
                            </tr>
                ))}

            </tbody>
        </table>
        </>
         ) : null}
        </>
    );
};

export default Table;