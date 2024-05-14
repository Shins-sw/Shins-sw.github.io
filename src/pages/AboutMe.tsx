import { useLanguage } from '../context/LanguageProvider';
import aboutme from '../language/aboutme';
import './AboutMe.css';

export default function AboutMe() {
  const { lang } = useLanguage();
  return (
    <>
      <div className="aboutme">
        <div style={{ display: 'block' }}>
          {aboutme.title[lang]}
          {aboutme.description[lang]}
        </div>
      </div>
    </>
  );
}
