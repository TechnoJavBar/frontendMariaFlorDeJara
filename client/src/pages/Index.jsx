import { WelcomeDiv } from "../components/welcomeDiv"
import { CategoryIndex } from "../components/categoryIndex"
import "./index.css"

export function IndexPage() {
  return (
    <div className="index-page container-fluid w-100 min-vh-100">
      <div className="d-flex flex-column">
        <WelcomeDiv />
        <CategoryIndex />
        {/* Additional components can be added here */}
      </div>
    </div>
  );
}