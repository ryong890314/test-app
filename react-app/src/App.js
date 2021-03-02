import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Dashboard from './Dashboard';
import Statistics from './Statistics';
import SubMenu from './components/SubMenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faChartPie, faUser, faCog, faBullhorn } from '@fortawesome/free-solid-svg-icons'

function App() {

  return (
    <Router>
      <div className="Container">

        <div className="Menu">
          <ul>
            <li>
              <Link to="/">
              <span className="menu_icon"><FontAwesomeIcon icon={faTable} /></span>
              <span className="menu_title">대시보드</span>
              </Link>
            </li>
            <li>
              <Link to="/statistics">
                <span className="menu_icon"><FontAwesomeIcon icon={faChartPie} /></span>
                <span className="menu_title">통계</span>
              </Link>
            </li>
            <li>
              <Link to="/statistics">
                <span className="menu_icon"><FontAwesomeIcon icon={faUser} /></span>
                <span className="menu_title">고객</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span className="menu_icon"><FontAwesomeIcon icon={faBullhorn} /></span>
                <span className="menu_title">마케팅</span>
              </Link>
            </li>
            <li>
              <Link to="/statistics">
                <span className="menu_icon"><FontAwesomeIcon icon={faCog} /></span>
                <span className="menu_title">설정</span>
              </Link>
            </li>
          </ul>
        </div>
       
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/statistics" component={Statistics} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
