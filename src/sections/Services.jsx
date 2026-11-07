import { services } from '../data/content';
import CircuitLines from '../components/CircuitLines';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad">
      <CircuitLines />
      <div className="container-x relative">
        <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.title} subtitle={services.subtitle} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
