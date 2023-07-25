import { useRef, useState } from "react";
import classes from "./Grievance.module.css";
// import classes from './../LogIn/Auth.module.css';
import { Form, useActionData, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
const Grievance = () => {
  const [showModal, setShowModal] = useState(false);
  const latRef = useRef();
  const longRef = useRef();
  const data = useActionData();
  const navigate = useNavigate();
  let coords = [0, 0];
  const setCords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude)

        // console.log(cords)
        coords = [position.coords.latitude, position.coords.longitude];
        latRef.current.value = position.coords.latitude;
        longRef.current.value = position.coords.longitude;
      });
    }
  };
  const clickHandler = () => {
    setShowModal(false);
    navigate('/');
  };
  setCords();

  return (
    <div style={{ margin: "40px" }}>
      {showModal && <Modal onClick={clickHandler}><h3>{`Submitted Successfully`}</h3></Modal>}
      <Form
        onSubmit={() => {
          setShowModal(true);
        }}
        method="post"
        action="/grievances"
        className={classes.form}
      >
        <label for="village">Village Name:</label>
        <input type="text" id="village" name="village" required />

        <label for="scheme">Scheme ID:</label>
        <input type="text" id="scheme" name="scheme" required />

        <label for="noWater">
          <img src="nowatersupply.png" alt="No Water" />
          <input
            type="radio"
            id="noWater"
            name="waterStatus"
            value="noWater"
            required
          />
          No Water Supply
          {/* </label> */}
          {/* <label for="dirtyWater"> */}
          <img src="dirtywater.png" alt="Dirty Water" />
          <input
            type="radio"
            id="dirtyWater"
            name="waterStatus"
            value="dirtyWater"
            required
          />
          Dirty Water Supply
        </label>
        <input
          name="latitude"
          ref={latRef}
          value={coords[0]}
          style={{ display: "none" }}
        />
        <input
          name="longitude"
          ref={longRef}
          value={coords[1]}
          style={{ display: "none" }}
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export const grievanceAction = async ({ request }) => {
  console.log("ran");
  const formData = await request.formData();
  const data = {
    serialnumber: formData.get("scheme"),
    village: formData.get("village"),
    latitude: formData.get("latitude"),
    longitutde: formData.get("longitude"),
    issue: formData.get("waterStatus"),
  };

  // console.log(data);
  const response = await fetch("http://localhost:4000/grievance", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,

      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
export default Grievance;
