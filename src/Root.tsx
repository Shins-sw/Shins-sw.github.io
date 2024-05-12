import { Outlet, Link } from 'react-router-dom';
import { Language, useLanguage } from './context/LanguageProvider';
import sidebar from './language/sidebar';
import logo from './assets/Szymon.png';
import polishFlag from './assets/poland_flag.gif';
import englishFlag from './assets/english_flag.png';
import instagram_icon from './assets/instagram_icon.svg';
import artstation_icon from './assets/artstation_icon.webp';
import email_icon from './assets/email_icon.png';
import logo2 from './assets/Shins_logo.png';

export default function Root() {
  const { lang, setLang } = useLanguage();
  return (
    <>
      <div className="sidebar">
        <div className="logo_sign">
          <img src={logo2}></img>
        </div>
        <div className="logo">
          <Link to="/">
            <img src={logo}></img>
          </Link>
        </div>
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
        <div className="menu">
          <Link to="aboutme">{sidebar.aboutme[lang]}</Link>
          <Link to="gallery">{sidebar.portfolio[lang]}</Link>
          <Link to="cv">{sidebar.cv[lang]}</Link>
        </div>
        <div className="footer">
          <img src={polishFlag} onClick={() => setLang(Language.polish)}></img>
          <img
            src={englishFlag}
            onClick={() => setLang(Language.english)}
          ></img>
        </div>
      </div>
      <div className="main">
        <Outlet></Outlet>
      </div>
    </>
  );
}
