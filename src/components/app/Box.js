import React from "react";
import { useSelector } from "react-redux";



export default ({metric}) => {
  return (
    <div style={{border:"1px solid blue"}}>
      {metric}
    </div>
  );
};
