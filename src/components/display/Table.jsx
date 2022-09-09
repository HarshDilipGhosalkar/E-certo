import React from "react";
const Table = ({ data }) => {
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
                        <td><input type="checkbox" /></td>
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