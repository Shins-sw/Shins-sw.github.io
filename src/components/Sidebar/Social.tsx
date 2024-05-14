import { Link } from 'react-router-dom';
import instagram_icon from '../../assets/instagram_icon.svg';
import artstation_icon from '../../assets/artstation_icon.webp';
import email_icon from '../../assets/email_icon.png';
import './Social.css';

export default function Social() {
  return (
    <div className="social">
      <Link to="/">
        <img src={instagram_icon}></img>
      </Link>
      <Link to="/">
        <img src={artstation_icon}></img>
      </Link>
      <Link to="/">
        <img src={email_icon}></img>
      </Link>
    </div>
  );
}
