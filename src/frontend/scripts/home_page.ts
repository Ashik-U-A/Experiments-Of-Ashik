let content_shadow_root;

function init_home_page() {
    content_shadow_root = document.querySelector("main-content").shadowRoot;
    init_greeting();
}

function init_greeting() {
    let hour_of_the_day = new Date().getHours();
    content_shadow_root.getElementById("greeting").innerHTML =
        hour_of_the_day >= 5 && hour_of_the_day < 12
            ? "Good Morning!"
            : hour_of_the_day >= 12 && hour_of_the_day < 18
            ? "Good Afternoon!"
            : "Good Evening!";
}

init_home_page();
