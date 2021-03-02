import ReactDOM from 'react-dom';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

import DayPage from './DayPage';

function SubHeader() {
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
        <li className="nav_li"><Link to="/daypage">일간</Link></li>
        <li className="nav_li"><Link to="/">주간</Link></li>
        <li className="nav_li"><Link to="/">월간</Link></li>
      </ul>

    </div>

    <div>
      <div>day</div>
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
