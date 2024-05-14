import sidebar from '../../language/sidebar';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageProvider';
import './Menu.css';

export default function Menu() {
  const { lang } = useLanguage();
  return (
    <div className="menu">
      <Link to="aboutme">{sidebar.aboutme[lang]}</Link>
      <Link to="gallery">{sidebar.portfolio[lang]}</Link>
      <Link to="cv">{sidebar.cv[lang]}</Link>
    </div>
  );
}
