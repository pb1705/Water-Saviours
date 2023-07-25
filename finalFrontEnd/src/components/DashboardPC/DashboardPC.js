import { useState } from "react";
import classes from "./DashboardPC.module.css";
const DashboardPC = () => {
    let coords = [0, 0];
    const [err,setErr] =useState(null);
    const setCords = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position.coords.latitude)
  
          // console.log(cords)
          coords = [position.coords.latitude, position.coords.longitude];
          
        });
      }
    }
    const sendIssue =async ()=>{
    setCords();
    try{
    const response = await fetch("http://localhost:4000/grievance/PC", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,

      "Content-Type": "application/json",
    },
    body: JSON.stringify({token:localStorage.getItem('token'),latitude:coords[0],longitude:coords[1]}),
  })

  const responseData =  await response.json();
  if(responseData.message==="Not Authorized" ){
    setErr(responseData.message)
  }
}catch{}}
    
    if(err=="Not Authorized" ){
        return <h1 style={{textAlign:'center'}}>Unauthorized</h1>
    }
  return (
    <div className={classes.thumbs}>
      <div className={classes.thumbCont}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/cfgdb-d6777.appspot.com/o/Thumbsup.jpg?alt=media&token=32c26306-74fa-4723-8209-7f20262a58f7"
          id="up"
          className={classes.thumb}
        />
        <div id="text1"></div>
      </div>
      <div className={classes.report}>
        <button onClick={sendIssue} id="btn">Report Breakdown</button>
        <div id="text2"></div>
      </div>
    </div>
  );
};
export default DashboardPC;
