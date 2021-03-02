import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <div className="Header">
      <span className="title">대시보드</span>
      <span className="option"><FontAwesomeIcon icon={faBars} /></span>
    </div>
  );
}

export default Header;
