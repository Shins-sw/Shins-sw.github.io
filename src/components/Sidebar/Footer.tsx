import polishFlag from '../../assets/poland_flag.gif';
import englishFlag from '../../assets/english_flag.png';
import { useLanguage } from '../../context/LanguageProvider';
import { Language } from '../../context/LanguageProvider';
import './Footer.css';

export default function Footer() {
  const { setLang } = useLanguage();
  return (
    <div className="footer">
      <img src={polishFlag} onClick={() => setLang(Language.polish)}></img>
      <img src={englishFlag} onClick={() => setLang(Language.english)}></img>
    </div>
  );
}
