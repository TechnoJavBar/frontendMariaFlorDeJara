import { TerminosYCondiciones } from "../components/termsAndConditions"

export function TermsAndConditionsPage() {
  return (
    <div className="container-fluid bg-light min-vh-100">
      <TerminosYCondiciones  
    marketplaceName="MariaFlorDeJara"
    city="Sevilla"
    country="España"
    contactEmail="elbingo33@gmail.com"
    paymentProcessorName="Stripe"
    lastUpdated="23 de agosto de 2025"
    privacyPolicyUrl="/politica-de-privacidad"

    />
    </div>
  );
}