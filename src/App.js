import { Col, Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <div>
      <Header/>
      <Container>
        <HomeScreen/>
      </Container>
      <Footer/>
    </div>
  
  );
}

export default App;
