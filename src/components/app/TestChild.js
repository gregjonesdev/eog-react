import React, { Component } from "react";

const MEASUREMENT_SUBSCRIPTION = gql`
  subscription {
      newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export default class TestChild extends Component {

  // componentDidMount() {
  //   this.props.subscribeToMore({
  //     document: MEASUREMENT_SUBSCRIPTION,
  //     updateQuery: (prev, { getLastKnownMeasurement })
  //   })
  // }

  render() {
    return (
      <span>{this.props.value} {this.props.unit}</span>
    )
  }
}
