import { Provider, createClient, useQuery, useSubscription } from "urql";

export { Provider, useQuery, useSubscription }

export const client = createClient({
  url: "https://react.eogresources.com/graphql"
});
