export class Baby extends HTMLElement {
    // [assign style = "./baby-styles.css"]
    // [assign template = "./baby-template.html"]
    private template_content: string;
    private template: HTMLTemplateElement;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.template = document.createElement("template");
        this.template.innerHTML = this.template_content;
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["current-content"];
    }

    attributeChangedCallback(name, old_value, new_value) {
        if (name === "current-content") {
            this.change_baby_parts(new_value);
        }
    }

    private change_baby_parts(value) {
        this.shadowRoot.querySelector("#ashiku-image").className = value;
    }
}
