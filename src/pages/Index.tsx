import { useLanguage } from '../context/LanguageProvider';
import index from '../language';
export default function Index() {
  const { lang } = useLanguage();
  return (
    <>
      <div className="index">
        <div style={{ display: 'block' }}>{index.title[lang]}</div>
      </div>
    </>
  );
}
