import cv from '../assets/cv.pdf';
export default function Cv() {
  return (
    <div className="cv">
      <iframe src={cv} width="1000" height="900"></iframe>
    </div>
  );
}
