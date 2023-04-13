import Postlist from "./components/Postlist";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Persons from "./pages/Persons";
import Addresses from "./pages/Addresses";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/graphql_sbx" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/persons" element={<Persons />} />
        <Route path="/addresses" element={<Addresses />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
