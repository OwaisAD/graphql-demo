import Postlist from "./components/Postlist";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import CreatePostForm from "./components/CreatePostForm";
import PersonList from "./components/Personlist";
import CreatePersonForm from "./components/CreatePersonForm";

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
      <div>
        <h1>Frontpage</h1>
        <CreatePersonForm />
        <PersonList />
        {/* <CreatePostForm />
        <Postlist /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
