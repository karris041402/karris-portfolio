import { process } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import Timeline from '../components/Timeline';

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-pad">
      <div className="container-x">
        <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} subtitle={process.subtitle} />
        <Timeline />
      </div>
    </section>
  );
}
