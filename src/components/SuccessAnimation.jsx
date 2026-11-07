import Lottie from 'lottie-react';
import animationData from '../assets/success.json';

/* Lottie success check. Imported lazily by ContactForm so lottie only loads after a send. */
export default function SuccessAnimation({ className = '' }) {
  return <Lottie animationData={animationData} loop={false} className={className} aria-hidden="true" />;
}
