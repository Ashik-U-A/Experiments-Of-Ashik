export class HomePlant extends HTMLElement {
    // [assign style = "./home-plant-styles.css"]
    // [assign template = "./home-plant-template.html"]
    private template_content: string;
    private template: HTMLTemplateElement;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.template = document.createElement("template");
        this.template.innerHTML = this.template_content;
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
}
