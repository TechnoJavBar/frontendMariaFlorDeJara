import { WelcomeDiv } from "../components/welcomeDiv";
import "./index.css";

export function IndexPage() {
  return (
    <div className="index-page container-fluid w-100 min-vh-100">
      <div className="d-flex flex-column">
        <WelcomeDiv />
        {/* Additional components can be added here */}
      </div>
    </div>
  );
}
