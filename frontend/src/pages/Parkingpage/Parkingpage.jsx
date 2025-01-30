import React from "react";
import parkingImage from "../../images/parkingImage.png";

const Parkingpage = () => {
  return (
    <div className="parkingpage">
      <h2
        style={{
          fontFamily: "calibri",
          marginTop: 80,
          marginLeft: 830,
          fontSize: 32,
          fontWeight: 400,
          color: "#031144",
        }}>
        PARKING SERVICE
      </h2>
      <button
        style={{
          marginLeft: 1575,
          height: 50,
          width: 200,
          fontFamily: "Calibri",
          fontSize: 20,
          border:"none",
          backgroundColor:"#031144cb",
          color:"white",
          cursor:"pointer",
          borderRadius:5,
          fontWeight:600
        }}>
        BOOK NOW
      </button>
      <div
        className="parkingpage-paracontent"
        style={{
          marginLeft: 130,
          marginRight: 900,
          marginTop: 60,
          fontFamily: "calibri",
          fontSize: 22,
          textAlign: "justify",
          marginBottom: 200,
          color: "#031144",
        }}>
        <p>
          <b>Ample Parking Spaces: </b>Metro Mall boasts a vast parking area
          with plenty of spaces available, ensuring convenience for shoppers
          even during peak hours.
        </p>
        <br />
        <p>
          <b>Accessible Design: </b>Our parking facilities are designed with
          easy access in mind, featuring wide lanes and clear signage to guide
          drivers effortlessly to available spots.
        </p>
        <br />
        <p>
          <b>Security Measures: </b>With round-the-clock surveillance and
          well-lit parking areas, shoppers can feel confident that their
          vehicles are safe and secure while they enjoy their shopping
          experience.
        </p>
        <br />
        <p>
          <b>Valet Parking: </b>For those seeking added convenience, Metro Mall
          offers valet parking services, allowing patrons to drop off and pick
          up their vehicles with ease.
        </p>
        <br />
        <p>
          <b>Parking Assistance: </b> Our friendly staff members are always on
          hand to assist shoppers with parking, whether it's directing them to
          available spots or providing guidance on navigating the parking
          structure.
        </p>
        <br />
        <p>
          <b>Electric Vehicle Charging Stations: </b> As part of our commitment
          to sustainability, we provide charging stations for electric vehicles,
          encouraging eco-friendly transportation options for our patrons.
        </p>
        <img
          src={parkingImage}
          style={{ marginLeft: 950, marginTop: -700, height: 550 }}
        />
      </div>
    </div>
  );
};

export default Parkingpage;
