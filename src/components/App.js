import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Dashboard from './dashboard/Dashboard';
import TrainingCreate from './trainings/TrainingCreate';
import TrainingDetails from './trainings/TrainingDetails';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import '../styles/styles.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/create' component={TrainingCreate} />
          <Route path='/training/:id' component={TrainingDetails} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
