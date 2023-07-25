import React, { useState } from "react";
import classes from "../GramPanchayat/GramPanchayat.module.css";
import { useLoaderData } from "react-router-dom";
const GramPanchayatdashboard = () => {
  const loaderData = useLoaderData();
  // console.log(loaderData);
  const [state, setState] = useState(false);
  if (loaderData && loaderData.message) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>{loaderData.message}</h1>
      </div>
    );
  }
  const raiseIssue = async (issue) => {
    
    try {
      const response = await fetch('http://localhost:4000/data/raisetoGov', {
        method: "POST",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
      
            "Content-Type": "application/json",
          },
        body:JSON.stringify(issue)
      });
      if(response.status===200){
        issue.raisedToGov=true;
      }
      setState(prev=>!prev)
    } catch (err){
        console.log(err);
    }
  };
  return (
    <>
      <table className={classes.table}>
        <tr>
          <th>Serial Number</th>
          <th>DateTime</th>
          <th>Village</th>
          <th>Issue</th>
          <th>Raise Issue to Goverment</th>
        </tr>
        {loaderData &&
          loaderData.issues.map((issue) => {
            return (
              <tr key={issue._id}>
                <td>
                  <span>{issue.serialNumber}</span>
                </td>
                <td>
                  <span>{issue.date} {issue.time}</span>
                </td>
                <td>
                  <span>{issue.village}</span>
                </td>
                <td>
                  <span>{issue.issue}</span>
                </td>
                <td>
                  <button onClick={raiseIssue.bind(null,issue)}> {`${issue.raisedToGoverment===true ?'Raised':'Raise'}`}</button>
                </td>
              </tr>
            );
          })}
        
      </table>
    </>
  );
};

export const loader =async()=>{
    const response = await fetch("http://localhost:4000/data/dashboardGram", {
        method: "get",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response;
}
export default GramPanchayatdashboard;