import React from "react";
import { useState,useEffect } from "react";

const Table = ({ data,enableState,disableState }) => {
    const [checked,setchecked]=useState(0);
    const emailList=[];

   
    const send=(cert,clsname)=>{
        var checkBox = document.querySelector("."+clsname);
        if (checkBox.checked == true){
            emailList.push(cert);
            setchecked(checked+1);
          } else {
             emailList.pop(cert);
             setchecked(checked-1);
          }
        
        console.log(emailList);
        // console.log("hello",cert);
    }

    useEffect(() => {
        if(checked>0){
            enableState();
        }else{
            disableState();
        }
      });
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