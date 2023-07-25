import React, { useState } from "react";
import classes from "./GramPanchayat.module.css";
import { useLoaderData } from "react-router-dom";
const Tables = () => {
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
      const response = await fetch('http://localhost:4000/data/raisetoGram', {
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
        issue.raisedToGram=true;
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
          <th>Lat/Long</th>
          <th>Issue</th>
          <th>Raise Issue to GramPanchayat</th>
        </tr>
        {loaderData &&
          loaderData.issues.map((issue) => {
            console.log(issue)
            return (
              <tr key={issue._id}>
                <td>
                  <span>{issue.serialNumber}</span>
                </td>
                <td>
                  <span>
                    {issue.date} {issue.time}
                  </span>
                </td>
                <td>
                  <span>
                    {issue.latitude}/{issue.longitutde}
                  </span>
                </td>
                <td>
                  <span>{issue.issue}</span>
                </td>
                <td>
                  <button onClick={raiseIssue.bind(null, issue)}>
                    {`${issue.raisedToGram===true ?'Raised':'Raise'}`}
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </>
  );
};
export const loader = async () => {
  const response = await fetch("http://localhost:4000/data/dashboardWUC", {
    method: "get",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return response;
};
export default Tables;
