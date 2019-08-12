export class MainContent extends HTMLElement {
    // [assign style = "./main-content-styles.css"]
    // [assign template = "./main-content-template.html"]
    private template_content: string;
    private template: HTMLTemplateElement;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.template = document.createElement("template");
        this.template.innerHTML = this.template_content;
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this.adjust_height_to_fit();
    }

    private adjust_height_to_fit() {
        let x = (<HTMLElement>document.querySelector("main-nav")).offsetHeight;
        this.style.height = "calc(100% - " + x + "px)";
    }

    static get observedAttributes() {
        return ["content"];
    }

    attributeChangedCallback(name, old_value, new_value) {
        if (name === "content") {
            this.change_content(new_value);
        }
    }

    private change_content(content) {
        let container = this.shadowRoot.querySelector(".content");
        if (container !== null) {
            container.classList.add("fade");
            setTimeout(() => {
                container.innerHTML = content;
                this.re_initialize_assets();
            }, 600);
        }
    }

    private re_initialize_assets() {
        let container = this.shadowRoot.querySelector(".content");
        let all_links: Array<HTMLElement> = Array.from(
            container.querySelectorAll("link")
        );
        let all_scripts: Array<HTMLElement> = Array.from(
            container.querySelectorAll("script")
        );

        let link_counter = 0;

        all_links.forEach(link => {
            let l = document.createElement("link");
            l.setAttribute("href", link.getAttribute("href"));
            l.setAttribute("rel", link.getAttribute("rel"));
            l.onload = () => {
                link_counter++;
                if (link_counter == all_links.length) {
                    this.shadowRoot
                        .querySelector(".content")
                        .classList.remove("fade");
                }
            };
            container.appendChild(l);
            link.remove();
        });

        all_scripts.forEach(script => {
            let s = script.getAttribute("src");
            if (s !== undefined && s !== null) {
                let scr = document.createElement("script");
                scr.setAttribute("src", s);
                container.appendChild(scr);
                script.remove();
            }
        });
    }
}
