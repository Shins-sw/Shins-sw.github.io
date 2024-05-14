import logo from '../../assets/Szymon_logo_new.png';
import { Link } from 'react-router-dom';
import './FaceLogo.css';

export default function FaceLogo() {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo}></img>
      </Link>
    </div>
  );
}
