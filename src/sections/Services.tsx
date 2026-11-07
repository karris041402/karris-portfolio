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
        {/* 6-column grid so a lone last card is centered on desktop instead of left-aligned */}
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {services.items.map((service, i) => {
            const n = services.items.length;
            const lone = i === n - 1 && n % 3 === 1;
            return (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                className={`lg:col-span-2 ${lone ? 'md:col-span-2 lg:col-start-3' : ''}`}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
