import { WelcomeDiv } from "../components/welcomeDiv"
import { CategoryIndex } from "../components/categoryIndex"
import "./index.css"

export function IndexPage(){
    return (
        <div className='index-page'>
            <WelcomeDiv />
            <CategoryIndex />
            {/* Additional components can be added here */}
        </div>
    )
}