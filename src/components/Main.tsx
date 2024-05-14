import border from '../assets/separator2.png';
import { Outlet } from 'react-router-dom';
import './Main.css';

export default function Main() {
  return (
    <div className="main">
      <img src={border}></img>
      <Outlet></Outlet>
      <img src={border}></img>
    </div>
  );
}
