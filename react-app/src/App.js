import React from 'react';
import { Link, Route, Switch, Redirect, NavLink, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Dashboard from './Dashboard';
import Statistics from './Statistics';
import SubMenu from './components/SubMenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faChartPie, faUser, faCog, faBullhorn } from '@fortawesome/free-solid-svg-icons'

function App() {

  const activeStyle = {
    color: '#2B90D9',
  };

  return (
    <Router>
      <div className="Container">

        <div className="Menu">
          <ul>
            <li>
              <NavLink to="/dashboard" activeStyle={activeStyle}>
              <span className="menu_icon"><FontAwesomeIcon icon={faTable} /></span>
              <span className="menu_title">대시보드</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/statistics" activeStyle={activeStyle}>
                <span className="menu_icon"><FontAwesomeIcon icon={faChartPie} /></span>
                <span className="menu_title">통계</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/customer" activeStyle={activeStyle}>
                <span className="menu_icon"><FontAwesomeIcon icon={faUser} /></span>
                <span className="menu_title">고객</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/marketing" activeStyle={activeStyle}>
                <span className="menu_icon"><FontAwesomeIcon icon={faBullhorn} /></span>
                <span className="menu_title">마케팅</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/setting" activeStyle={activeStyle}>
                <span className="menu_icon"><FontAwesomeIcon icon={faCog} /></span>
                <span className="menu_title">설정</span>
              </NavLink>
            </li>
          </ul>
        </div>
       
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/customer">
            <Statistics />
          </Route>
          <Route path="/marketing">
            <Dashboard />
          </Route>
          <Route path="/setting">
            <Statistics />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
