import React from "react";
import ShopOwnerSidemenu from "../../components/ShopOwnerSidemenu/ShopOwnerSidemenu";
import "./SDashboardLayout.css";

const SDashboardLayout = (props) => {
  return (
    <div className="outsideStyle">
      <ShopOwnerSidemenu />
    <div className="innersideStyle">{props.component}</div>
    </div>
  );
};

export default SDashboardLayout;
