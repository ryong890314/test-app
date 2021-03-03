import ReactDOM from 'react-dom';
import { Link, Route, Switch, BrowserRouter as Router, useParams,
  useRouteMatch, NavLink, Redirect } from "react-router-dom";

import DayPage from './DayPage';

function SubHeader() {

  let { path, url } = useRouteMatch();  

  const activeStyle = {
    color: '#2B90D9',
  };

  return (
    <>
    <div className="SubHeader">
      <ul className="visit_ul">
        <li className="visit_li">
          <p className="stat_title">오늘 방문수</p>
          <p className="stat_text">100</p>
        </li>
        <li className="visit_li">
          <p className="stat_title">어제 방문수</p>
          <p className="stat_text">300</p>
        </li>
        <li className="visit_li">
          <p className="stat_title">누적 방문수</p>
          <p className="stat_text">100,000</p>
        </li>
        <li className="visit_li">
          <span className="datetime" id="timer">
            <p className="date dumy">0000-00-00</p>
            <span className="time dumy">00:00:00</span>
          </span>
        </li>
      </ul>

      <ul className="nav_ul">
        <li className="nav_li"><NavLink to={`${url}/day`} activeStyle={activeStyle} activeClassName="current">일간</NavLink></li>
        <li className="nav_li"><NavLink to={`${url}/week`} activeStyle={activeStyle} activeClassName="current">주간</NavLink></li>
        <li className="nav_li"><NavLink to={`${url}/month`} activeStyle={activeStyle} activeClassName="current">월간</NavLink></li>
      </ul>

    </div>

    <div className="MainPage">
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/day`} />
        </Route>
        <Route path={`${path}/day`}>
          <DayPage />
        </Route>
        <Route path={`${path}/week`}>
          <DayPage />
        </Route>
        <Route path={`${path}/month`}>
          <DayPage />
        </Route>
      </Switch>
    </div>

    </>
  );
}

function tick() {
  const date = new Date();
  const element = (
    <>
    <p className="date">{ date.getFullYear() + "-" + ("00" + (date.getMonth()+1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2)}</p>
    <span className="time">{date.toLocaleTimeString('en-GB')}</span>
    </>
  );
  ReactDOM.render(element, document.getElementById('timer'));
}

setInterval(tick, 1000);

export default SubHeader;
