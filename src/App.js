import { Container } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Explore from "./Components/Explore";


function App() {

  return (
    <Container className="py-5">
      <Explore/>
    </Container>
  );
}

export default App;