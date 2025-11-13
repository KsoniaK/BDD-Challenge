// Se mettre dans dossier "client" puis : 1-commande npm install (si node_modules non present) puis 2-npm start pour lancer react !!
// Se mettre dans dossier "server" puis : 1-npm start. 2-Si mdp necessaire faire: sudo npm start et suivre ce que le terminal demande. 3- si tout ça ne marche pas faire la commande : "sudo npm install -g nodemon --unsafe-perm."
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Series from './components/Series';
import Films from './components/Films';
import Navigation from './components/Navigation';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
          <Navigation />
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/series' component={Series} />
                <Route exact path='/films' component={Films} />
            </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
