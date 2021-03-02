import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

function SubMenu() {
  return (
    <div className="SubMenu">

      <p className="title">통계</p>
      <p className="subtitle">구분</p>

      <ul className="nav_ul">
        <li className="nav_li"><Link to="/statistics">종합</Link></li>
        <li className="nav_li"><Link to="/statistics">신규고객</Link></li>
        <li className="nav_li"><Link to="/statistics">재방문고객</Link></li>
        <li className="nav_li"><Link to="/statistics">이탈고객</Link></li>
      </ul>

    </div>
  );
}

export default SubMenu;
