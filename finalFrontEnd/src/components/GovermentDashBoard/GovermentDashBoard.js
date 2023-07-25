import React from "react";
import data from "../Dashboard/datagp";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
// import classes from "./dash.module.css";
import classes from "../GramPanchayat/GramPanchayat.module.css";
import classes2 from "../Dashboard/dash.module.css";
const GovermentDashboard = () => {
  const [data1, setData1] = useState(data);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gp: "Hajo",category:'Issues'
  });

  const [dataBackend, setDataBackend] = useState(null);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  console.log(formData);
  async function submitHandler(event) {
    event.preventDefault();
    console.log(formData);
    if (formData.category === "Issues") {
      try {
        const response = await fetch("http://localhost:4000/data/issuesGov", {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,

            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          setDataBackend("err");
        }
        const responseData = await response.json();
        setDataBackend(responseData.data);
        console.log(responseData);
      } catch (err) {
        console.log(err);
        setDataBackend("err");
      }
    }
    setSubmitted(true);
  }

  return (
    <>
      <div className={classes2.card}>
        <form onSubmit={submitHandler}>
          <label>
            <p className={classes.label0}>
              Select the GramPanchayat from the dropdown below::
            </p>
            <div className={classes.outselection0}>
              <select
                className={classes.selection0}
                required
                name="gp"
                value={formData.gp}
                onChange={changeHandler}
              >
                <option disabled selected>
                  Select Gram Panchayat
                </option>
                {data1.map((dat) => (
                  <option className={classes["text-black"]}>{dat.id}</option>
                ))}
              </select>
            </div>
          </label>

          <div className={classes.outselection0}>
            <button>Submit</button>
          </div>
        </form>
      </div>
      <div className={classes.outer0}>
        {dataBackend === "err" && (
          <p style={{ textAlign: "center" }}>
            CurrentlyFacing some error come back later!
          </p>
        )}

        {dataBackend && formData.category == "Issues" && (
          <div
            style={{ textAlign: "center", fontWeight: "500", margin: "10px" }}
          >
            The following issues need to be resolved ASAP:
          </div>
        )}
        {formData.category == "Issues" &&
          dataBackend &&
          dataBackend.length === 0 && (
            <h2 style={{ textAlign: "center" }}>No Issues as of yet</h2>
          )}

        {dataBackend && (
          <div>
            {formData.category == "Issues" && submitted && (
              <>
                <table className={classes.table}>
                  <tr>
                    <th>Village</th>
                    <th>Serial Number</th>
                    <th>DateTime</th>
                    <th>Issue</th>
                  </tr>
                  {dataBackend &&
                    dataBackend.map((data) => {
                      //   console.log(issue);
                      return (
                        <tr key={data._id}>
                          <td>
                            <span>{data.village}</span>
                          </td>
                          <td>
                            <span>{data.serialNumber}</span>
                          </td>
                          <td>
                            <span>
                              {data.date} {data.time}
                            </span>
                          </td>
                          <td>
                            <span>{data.issue}</span>
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default GovermentDashboard;
