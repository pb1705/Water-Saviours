import classes from "./DashboardWMC.module.css";
import { Form, redirect } from "react-router-dom";
const DashboardWMC = () => {
  return (
    <div class={classes.elements}>
      <Form method="POST" action="/dashboardWMC">
        <div class={classes.ele}>
          <span>Chlorine</span>
          <input name="chlorine" type="number" step="0.01" />
        </div>
        <div className={classes.ele}>
          <span>Iron</span>
          <input name="Iron" type="number" step="0.01" style={{ marginLeft: "43px" }} />
        </div>
        <div className={classes.ele}>
          <span>Zinc</span>
          <input name="Zinc" type="number" step="0.01" style={{ marginLeft: "40px" }} />
        </div>
        <div className={classes.ele}>
          <span>Sodium</span>
          <input name="Sodium" type="number" step="0.01" style={{ marginLeft: "12px" }} />
        </div>
        <div className={classes.ele}>
          <span style={{ marginRight: "50px" }}>Magnesium</span>
          <input name="Magnesium" type="number" step="0.01" style={{ marginLeft: "-22px" }} />
        </div>
        <div className={classes.ele}>
          <span style={{ marginRight: "50px" }}>Calcium</span>
          <input  name="Calcium"type="number" step="0.01" style={{ marginLeft: "9px" }} />
        </div>
        <div className={classes.ele}>
          <span style={{ marginRight: "50px" }}>Village</span>
          <input name="village" type="text" step="0.01" style={{ marginLeft: "9px" }} />
        </div>
        <div style={{textAlign:'center'}}>
        <button  className={classes.btn}>Submit</button>
        </div>
      </Form>
    </div>
  );
};
export const action =async({request})=>{
    const formData = await request.formData();
    const data ={
        Chlorine: formData.get('chlorine'),
        Iron:formData.get('Iron'),
        Zinc:formData.get('Zinc'),
        Sodium:formData.get('Sodium'),
        Magnesium:formData.get('Magnesium'),
        Calcium:formData.get('Calcium'),
        village:formData.get('village')
    }
    console.log(data);
    try{
        const response = await fetch("http://localhost:4000/data/dashboardWMC", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
        
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        return redirect('/')
    }
    catch{

    }
    return null;
}
export default DashboardWMC;
