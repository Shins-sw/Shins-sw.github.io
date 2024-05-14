import './Sidebar.css';
import FaceLogo from './Sidebar/FaceLogo';
import Menu from './Sidebar/Menu';
import SignLogo from './Sidebar/SignLogo';
import Social from './Sidebar/Social';
import Footer from './Sidebar/Footer';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <SignLogo />
      <FaceLogo />
      <Social />
      <Menu />
      <Footer />
    </div>
  );
}
