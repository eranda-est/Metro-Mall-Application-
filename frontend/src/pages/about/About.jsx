import React from "react";
import aboutImage from "../../images/aboutImage.png";

function About() {
  return (
    <div className="aboutpage">
      <h2
        style={{
          fontFamily: "calibri",
          marginTop: 80,
          marginLeft: 830,
          fontSize: 32,
          fontWeight: 400,
          color: "#031144",
        }}>
        ABOUT US
      </h2>
      <div
        className="aboutpage-paracontent"
        style={{
          marginLeft: 200,
          marginRight: 900,
          marginTop: 80,
          fontFamily: "calibri",
          fontSize: 22,
          textAlign: "justify",
          marginBottom: 100,
          color: "#031144",
        }}>
        <p>
          <b>Welcome to Metro Mall: Where Shopping Meets Excitement!</b>
        </p>
        <p>
          <br />
          At Metro Mall, we believe that shopping isn't just a chore; it's an
          experience. Nestled in the heart of the bustling city, Metro Mall
          stands tall as a beacon of convenience, luxury, and entertainment.
          With an illustrious history spanning decades, we have been the go-to
          destination for fashionistas, families, and fun-seekers alike.
        </p>
        <br />
        <p>
          <b>Our Story</b>
          <br /> Metro Mall was born out of a vision to create a one-stop
          destination for all your shopping needs. Established in [insert year],
          we've grown from a humble marketplace to a sprawling complex, housing
          hundreds of renowned brands and boutique shops. Over the years, we've
          adapted and evolved to cater to the changing tastes and preferences of
          our valued customers.
        </p>
        <br />
        <p>
          <b>Our Promise</b>
          <br />
          At Metro Mall, customer satisfaction is our top priority. We strive to
          offer an unparalleled shopping experience characterized by exceptional
          service, a diverse selection of products, and a welcoming atmosphere.
          Whether you're on the hunt for the latest fashion trends, tech
          gadgets, or household essentials, you'll find it all under one roof at
          Metro Mall.
        </p>
        <br />
        <p>
          <b>What Sets Us Apart</b> <br />
          Metro Mall isn't just a place to shop it's a destination in itself.
          Step inside, and you'll be greeted by a vibrant ambiance, with stylish
          décor and spacious walkways that make browsing a pleasure.
        </p>
        <img
          src={aboutImage}
          style={{ marginLeft: 1000,alignItems: screenLeft, marginTop: -800, height: 700 }}
        />
      </div>
    </div>
  );
}

export default About;
