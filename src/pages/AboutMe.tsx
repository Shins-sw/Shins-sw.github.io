import { useLanguage } from '../context/LanguageProvider';
import aboutme from '../language/aboutme';

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
