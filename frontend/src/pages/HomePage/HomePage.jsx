import React, { useState, useEffect } from "react";
import image1 from "../../images/shoppingmallimage3.jpg";
import image2 from "../../images/shoppingmallimage2.jpg";
import image3 from "../../images/shoppingmallimage5.jpg";
import image4 from "../../images/shoppingmallimage6.jpg";
import homecategory1 from "../../images/homecategory1.jpg";
import homecategory2 from "../../images/homecategory2.jpg";
import homecategory3 from "../../images/homecategory3.jpg";

const HomePage = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showDivs(slideIndex);
  }, [slideIndex]);

  function plusDivs(n) {
    setSlideIndex((prevIndex) => prevIndex + n);
  }

  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) setSlideIndex(1);
    if (n < 1) setSlideIndex(x.length);
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
  }

  return (
    <div className="homepageslideshow">
      <div className="homeimage-container">
        <img
          className="mySlides"
          src={image3}
          alt="slide1"
          style={{ width: 1950, height: 600 }}
        />
        <img
          className="mySlides"
          src={image2}
          alt="slide2"
          style={{ width: 1950, height: 600 }}
        />
        <img
          className="mySlides"
          src={image1}
          alt="slide3"
          style={{ width: 1950, height: 600 }}
        />
        <img
          className="mySlides"
          src={image4}
          alt="slide4"
          style={{ width: 1950, height: 600 }}
        />

        <button
          className="w3-button w3-black w3-display-left"
          onClick={() => plusDivs(-1)}></button>
        <button
          className="w3-button w3-black w3-display-right"
          onClick={() => plusDivs(1)}></button>
      </div>
      <div className="homeservices">
        <h1
          style={{
            fontFamily: "calibri",
            fontSize: 72,
            marginLeft: 450,
            color: "#031144",
            marginTop: 120,
          }}>
          Services
        </h1>
        <div
          className="firstPart"
          style={{
            display: "flex",
            direction: "row",
            marginTop: 50,
          }}>
          <div
            style={{
              height: 300,
              width: 300,
              marginLeft: 80,
            }}>
            <h1
              style={{
                fontFamily: "calibri",
                fontSize: 80,
                textAlign: "center",
                color: "#031144",
              }}>
              5
            </h1>
            <h4
              style={{
                fontFamily: "calibri",
                fontSize: 32,
                textAlign: "center",
                color: "#0311448c",
              }}>
              LEVELS
            </h4>
          </div>
          <div
            style={{
              height: 300,
              width: 300,
              marginLeft: 50,
            }}>
            <h1
              style={{
                fontFamily: "calibri",
                fontSize: 80,
                textAlign: "center",
                color: "#031144",
              }}>
              69
            </h1>
            <h4
              style={{
                fontFamily: "calibri",
                fontSize: 32,
                textAlign: "center",
                color: "#0311448c",
              }}>
              RETAIL SHOPS{" "}
            </h4>
          </div>
          <div
            style={{
              height: 300,
              width: 300,
              marginLeft: 50,
            }}>
            <h1
              style={{
                fontFamily: "calibri",
                fontSize: 80,
                textAlign: "center",
                color: "#031144",
              }}>
              3
            </h1>
            <h4
              style={{
                fontFamily: "calibri",
                fontSize: 32,
                textAlign: "center",
                color: "#0311448c",
              }}>
              RESTURANTS
            </h4>
          </div>
        </div>
        <div
          className="secondPart"
          style={{
            display: "flex",
            direction: "row",
            marginBottom: 100,
          }}>
          <div
            style={{
              height: 300,
              width: 300,
              marginLeft: 80,
            }}>
            <h1
              style={{
                fontFamily: "calibri",
                fontSize: 80,
                textAlign: "center",
                color: "#031144",
              }}>
              2
            </h1>
            <h4
              style={{
                fontFamily: "calibri",
                fontSize: 32,
                textAlign: "center",
                color: "#0311448c",
              }}>
              THEATERS
            </h4>
          </div>
          <div
            style={{
              height: 300,
              width: 300,
              marginLeft: 50,
            }}>
            <h1
              style={{
                fontFamily: "calibri",
                fontSize: 80,
                textAlign: "center",
                color: "#031144",
              }}>
              2
            </h1>
            <h4
              style={{
                fontFamily: "calibri",
                fontSize: 32,
                textAlign: "center",
                color: "#0311448c",
              }}>
              GAMING CENTERS
            </h4>
          </div>
          <div
            style={{
              height: 300,
              width: 300,
              marginLeft: 50,
            }}>
            <h1
              style={{
                fontFamily: "calibri",
                fontSize: 80,
                textAlign: "center",
                color: "#031144",
              }}>
              12h
            </h1>
            <h4
              style={{
                fontFamily: "calibri",
                fontSize: 32,
                textAlign: "center",
                color: "#0311448c",
              }}>
              PARKING
            </h4>
          </div>
        </div>
      </div>
      <div
        class="vl"
        style={{
          borderLeft: "2px solid #0311448c",
          height: "600px",
          position: "absolute",
          left: "60%",
          marginLeft: "-3px",
          top: "0",
          marginTop: 940,
        }}></div>
      <div
        className="imageContainer"
        style={{
          position: "absolute",
          left: "65%",
          top: "0",
          marginTop: 980,
          display: "flex",
          direction: "column",
        }}>
        <img
          src={homecategory1}
          alt="clickable image 1"
          style={{
            width: 550,
            height: 150,
            marginBottom: 20,
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "http://localhost:5173/foodbeverages";
          }}
        />
      </div>
      <div
        className="imageContainer"
        style={{
          position: "absolute",
          left: "65%",
          top: "0",
          marginTop: 1175,
          display: "flex",
          direction: "column",
        }}>
        <img
          src={homecategory2}
          alt="clickable image 1"
          style={{
            width: 550,
            height: 150,
            marginBottom: 20,
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "http://localhost:5173/foodbeverages";
          }}
        />
      </div>
      <div
        className="imageContainer"
        style={{
          position: "absolute",
          left: "65%",
          top: "0",
          marginTop: 1375,
          display: "flex",
          direction: "column",
        }}>
        <img
          src={homecategory3}
          alt="clickable image 1"
          style={{
            width: 550,
            height: 150,
            marginBottom: 20,
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "http://localhost:5173/foodbeverages";
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
