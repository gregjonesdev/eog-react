import React from "react";
import { useSelector } from "react-redux";
import Box from "./Box";


export default () => {

  const allMetrics = useSelector(state => state.metrics);
  const activeMetrics = allMetrics.results.map((metric) => {
    return metric.isActive ? metric.name : null
  })


  return (
    <div style={{border:"1px solid red"}}>
      { allMetrics.results.map((metric, index) => {
        return metric.isActive ? <Box key={index} metric="what" /> : null
      }) }
    </div>
  );
};
