export class MainNav extends HTMLElement {
    // [assign style = "./style.css"]
    // [assign template = "./template.html"]
    private template_content: string;
    private template: HTMLTemplateElement;

    private state: { content: string } = null;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.template = document.createElement("template");
        this.template.innerHTML = this.template_content;
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));

        this.add_menu_selection_facility();
        this.add_menu_facility_for_mobile_platform();

        this.fetch_content_as_per_url(window.location.pathname);

        window.onpopstate = event => {
            console.log(event);
            if (event.state) {
                this.state = event.state;
            }
            if (this.state !== null) {
                this.set_content(this.state.content as string);
            }
        };
    }

    private add_menu_selection_facility() {
        let options = <HTMLElement[]>(
            Array.from(this.shadowRoot.querySelectorAll(".options > li"))
        );
        options.forEach(option => {
            option.onclick = () => {
                if (option.getAttribute("href") !== null) {
                    this.route_to(option.getAttribute("href"));
                }
                (this.shadowRoot.querySelector(
                    ".options"
                ) as HTMLElement).classList.add("inactive");
            };
        });
    }

    private set_current_route_active(href) {
        let options = <HTMLElement[]>(
            Array.from(this.shadowRoot.querySelectorAll(".options > li"))
        );
        options.forEach(option => {
            if (option.getAttribute("href") == href) {
                option.classList.add("active");
            } else {
                option.classList.remove("active");
            }
        });
    }

    private route_to(path: string) {
        this.get_content_from_server(path).then(res => {
            this.set_current_route_active(path);
            window.history.pushState({ content: res }, null, path);
            console.log(window.history.state);
            this.set_content(res);
        });
    }

    private set_content(res) {
        document
            .querySelector("main-content")
            .setAttribute("content", <string>res);
    }

    private get_content_from_server(url) {
        return new Promise((r, s) => {
            let x = new XMLHttpRequest();
            x.open("GET", url);
            x.setRequestHeader("navLoaded", "true");
            x.onreadystatechange = function() {
                if (x.readyState === 4 && x.status === 200) {
                    r(x.responseText);
                }
            };
            x.send();
        });
    }

    private add_menu_facility_for_mobile_platform() {
        (this.shadowRoot.querySelector(
            "#menu-icon"
        ) as HTMLElement).onclick = () => {
            (this.shadowRoot.querySelector(
                ".options"
            ) as HTMLElement).classList.remove("inactive");
        };
    }

    private fetch_content_as_per_url(path) {
        if (path === "/") {
            this.route_to("/home");
        } else {
            this.route_to(path);
        }
    }
}
