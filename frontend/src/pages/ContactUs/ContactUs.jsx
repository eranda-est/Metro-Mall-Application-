import React from "react";
import "./ContactUs.css";
import contactusImage from "../../images/contactusImage.png";

const ContactUs = () => {
  return (
    <div className="contactuspage">
      <div className="inputpart">
        <h2
          style={{
            fontFamily: "calibri",
            fontSize: 32,
            fontWeight: 400,
            color: "#031144",
            textAlign: "center",
            marginTop: 55,
          }}>
          CONTACT US
        </h2>
        <form>
          <label for="name">Name</label>
          <input type="text" name="name" placeholder="Your name.." />
          <br />
          <br />
          <label for="email">Email</label>
          <input type="text" name="email" placeholder="Your email.." />
          <br />
          <br />
          <label for="message">Message</label>
          <input type="text" name="message" placeholder="Your message.." />

          <input type="submit" value="SEND" />
        </form>
      </div>
      <div className="imagetpart" style={{ backgroundColor: "yellow" }}>
        <img src={contactusImage} style={{ height: 700, width: 400 }} />
      </div>
    </div>
  );
};

export default ContactUs;
