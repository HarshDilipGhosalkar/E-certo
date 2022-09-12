import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        emailList: [],
        checked: 0,
        check: 0,
        index:0,
      };
    }
   
    send =async (cert, clsname) => {
        var checkBox = document.querySelector(".chk" + clsname);
        var tr = document.querySelector(".tr" + clsname);
        if (checkBox.checked == true) {
            tr.style.backgroundColor = '#e6f7ff';
            await this.setState({emailList:[...this.state.emailList,cert]})
            await this.setState({checked: this.state.checked+1})
            this.props.enableState();
            if (this.state.checked == this.props.data.length) {
                document.querySelector(".allCheck").checked = true;
            } else {
                document.querySelector(".allCheck").checked = false;
            }
            console.log("checked")
        } else {
            var slicedData = this.state.emailList;
            
            let index = slicedData.indexOf(cert);
            console.log(index);
            
            if (index > -1) { 
                slicedData.splice(index, 1); 
              }
            await this.setState({emailList:slicedData});
            await this.setState({checked: this.state.checked-1})
            if (this.state.checked <= 0) {
                this.props.disableState();
            }
            tr.style.backgroundColor = 'white';
            document.querySelector(".allCheck").checked = false;
            // console.log("unchecked")
        }

        console.log(this.state.emailList);
        // console.log(this.state.checked);
        
    }
    tog= async () =>  {
        await this.setState({emailList:[]})
        const trs = document.querySelectorAll(".commontr");
        const checkBoxes = document.querySelectorAll(".commonChk");
        const allCheck = document.querySelector(".allCheck");
        if (allCheck.checked == true) {
            console.log("yes");
            await this.setState({emailList:this.props.data})
            await this.setState({checked: this.props.data.length})
            checkBoxes.forEach(chk => {
                chk.checked = true;
            });
            trs.forEach(tr => {
                tr.style.backgroundColor = '#e6f7ff';
            });
            
            console.log(this.state.emailList);
            this.props.enableState();
        } else {
            await this.setState({emailList:[]})
            await this.setState({checked: 0})
            checkBoxes.forEach(chk => {
                chk.checked = false;
            });
            trs.forEach(tr => {
                tr.style.backgroundColor = 'white';
            });
            console.log(this.state.emailList);
            this.props.disableState();
        }

    }
    render() {
      return (
        <>
            <div className="table-btn">
                {this.state.checked <= 1 ? (
                    <>
                         {this.state.checked == 1 ? (
<>
<h5>1 Certificate Selected
                        </h5>
</>
                         ):(
                            <>
                            <h5>{this.props.data.length} Certificates
                        </h5>
                            </>
                         )}
                        
                    </>
                ) : (
                    <>
                        <h5>{this.state.checked} Certificates Selected
                        </h5></>
                )}

                <div id="resend-btn" onClick={() => this.props.emailLoop(this.state.emailList)} >Resend Email</div>
            </div>
            <div className="hr2"></div>
            <div className="tab">
                {this.props.data !== undefined ? (
                    <>
                        <table class="content-table">
                            <thead>
                                <tr>
                                    {this.props.data.length != 0 ? (
                                        <>
                                            <th><input type="checkbox" className="allCheck" onClick={() => this.tog()} /></th>

                                        </>
                                    ) : (
                                        <>
                                            <th><input type="checkbox" className="allCheck" onClick={() => this.tog()} disabled /></th>

                                        </>
                                    )}
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Issue Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.data.map((item) => (
                                    <tr className={"commontr tr" + item.certid.toNumber()}>
                                        <td><input type="checkbox" className={"commonChk  chk" + item.certid.toNumber()} onClick={() => this.send(item, item.certid.toNumber())} /></td>
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
    }
  }

export default Table;