import React, { Component } from "react";
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

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

// export default class TestChild extends Component {
//
//   componentDidMount() {
//     this.props.subscribeToMore({
//       document: "MEASUREMENT_SUBSCRIPTION",
//       updateQuery: (prev, { getLastKnownMeasurement }) => {
//         if (!getLastKnownMeasurement.data) return prev;
//         return {
//           allMessages: [
//             getLastKnownMeasurement.data.messageCreated,
//             ...prev.allMessages
//           ],
//         };
//       },
//     });
//   }
//
//   render() {
//     return (
//       <Subscription subscription={MEASUREMENT_SUBSCRIPTION}>
//       </Subscription>
//
//     )
//   }
// }
function Measurement() {
  const { data, loading } = useSubscription(
    MEASUREMENT_SUBSCRIPTION
  );

  // console.log(data)

  return <h4>{!loading && data.newMeasurement.value}</h4>
}


export default () => (
  <Measurement />
);
