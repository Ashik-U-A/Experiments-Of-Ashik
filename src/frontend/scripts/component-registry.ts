import { MainNav } from "../components/main-nav/MainNav";
import { MainLogo } from "../components/main-logo/MainLogo";
import { MainContent } from "../components/main-content/MainContent";
import { HomePlant } from "../components/home-plant/HomePlant";

export function register_components(): void {
    customElements.define("main-logo", MainLogo);
    customElements.define("main-nav", MainNav);
    customElements.define("main-content", MainContent);
    customElements.define("home-plant", HomePlant);
}
