import { Container} from '@material-ui/core'

import {Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <Container maxWidth = "lg">
      <Navbar/>
       <Switch>
         <Route path="/" exact component={Home}/>
         <Route path="/auth" exact component={Auth}/>
       </Switch>
    </Container>
  );
}

export default App;
