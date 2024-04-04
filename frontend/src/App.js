import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import List from "./pages/List";
import Write from "./pages/Write";
import append from "./pages/append";
function App() {
  return (
    <div> 
      <Header/>
      <Container>
        <Route path="/" exact component={List}/>
        <Route path="/write" exact component={Write}/>
        <Route path="/append" exact component={append}/>
      </Container>
    </div>
  );
}

export default App;
