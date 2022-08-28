import React from "react";
const Table = ({ data }) => {
    return (
        <table class="content-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>SAP</th>
                    <th>Email</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>

                {data.map((item) => (
                    <tr key={item.certid.toNumber()}>
                        <td>{item.name}</td>
                        <td>{item.SAP.toNumber()}</td>
                        <td>{item.email}</td>
                        <a href={"certificate/" + item.transactionHash}><td>View</td></a>

                    </tr>
                ))}

            </tbody>
        </table>
    );
};

export default Table;