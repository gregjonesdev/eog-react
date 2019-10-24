import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Measurement {
    metric: String!
    at: Timestamp!
    value: Float!
    unit: String!
  }
  type Query {
    getLastKnownMeasurement(metricName: String!): Measurement
  }
  type Subscription {
    newMeasurement: Measurement
  }
`;
