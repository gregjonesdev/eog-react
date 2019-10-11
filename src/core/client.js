import { Provider, createClient, useQuery } from "urql";

export { Provider, useQuery }

export const client = createClient({
  url: "https://react.eogresources.com/graphql"
});
