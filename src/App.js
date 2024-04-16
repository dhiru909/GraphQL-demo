// import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider,  } from '@apollo/client';
import DisplayData from './DisplayData';
function App() {


  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:"http://localhost:6969/"
  });



  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>List of User</h1>
        <DisplayData/>
      </div>
    </ApolloProvider>
    
  );
}

export default App;
