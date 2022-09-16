import React from "react";

import ThunderGraph from "../components/ThunderGraph";
import DashboardCard from "../components/DashboardCard";
import ThunderCommunity from "../components/ThunderCommunity";
import '../css/ThunderAdmin.css';

const ThunderAdmin=()=>{


  return(
    <>
    <div className="thunderAdmin_all">

      <h1>관리자 번개모임</h1>
      <div className="thunderAdmin_container">
        <ThunderGraph/>
        <ThunderCommunity/>
      </div>

    </div>
    </>
  )
}

export default ThunderAdmin;