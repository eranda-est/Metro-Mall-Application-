import React from "react";
import Adminsidemenu from "../../components/AdminSidemenu/Adminsidemenu";
import "./DashboardLayout.css";


const DashboardLayout = (props) => {
  return (
    <div className="outsideStyle">

      <Adminsidemenu />
      <div className="innersideStyle">{props.component}</div>

    </div>
  );
};

export default DashboardLayout;
