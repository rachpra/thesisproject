
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'jquery'

import { BrowserRouter } from 'react-router-dom';
import Header from './header/header'
import Footer from './footer/footer'
import Container from './Container/container'



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
   
        <Container/>
        
        <Footer />
        </div>
    </BrowserRouter>
    


  );
}


export default App;