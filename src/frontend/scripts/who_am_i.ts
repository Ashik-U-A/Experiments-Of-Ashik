function change_background(): void {
    document.querySelector("body").style.background = "#fff";
    (document
        .querySelector("main-content")
        .shadowRoot.querySelector(".who-am-i") as HTMLElement).style.opacity =
        "1";
}

change_background();
