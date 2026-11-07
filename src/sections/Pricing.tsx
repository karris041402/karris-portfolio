import { pricing } from '../data/content';
import PricingCard from '../components/PricingCard';
import SectionHeading from '../components/SectionHeading';

/* Hidden entirely when pricing.enabled is false in content.ts. */
export default function Pricing() {
  if (!pricing.enabled) return null;
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-pad">
      <div className="container-x">
        <SectionHeading id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.subtitle} />
        <ul className="mx-auto grid max-w-6xl items-stretch gap-8 pt-4 md:grid-cols-3">
          {pricing.plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
