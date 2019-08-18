const timeline_points = ["baby", "tcs", "nissan"];
let _TIMELINE_POINTER = 0;

const _TIMELINE_DESCRIPTION = {
    baby: {
        time: "1994 July",
        desc:
            "A baby boy was born and they named him <strong>Ashik Unni</strong>. He had no idea that he had a weird name, but he kept crying after hearing it."
    },
    tcs: {
        time: "2016 August",
        desc:
            "He got into his first job after participating in a coding competition held by TCS. Did some good work over there. (Get to know about his work <a>over here</a>)."
    },
    nissan: {
        time: "2018 November",
        desc:
            "Was sipping coffee when a friend called and told about a Coding competition conducted by Nissan. Attended the competition and got into Nissan as <strong>Software Engineer Level II</strong>. Get to know about his work @ Nissan over here."
    }
};

function change_background(): void {
    document.querySelector("body").style.background = "#fff";
    (document
        .querySelector("main-content")
        .shadowRoot.querySelector(".who-am-i") as HTMLElement).style.opacity =
        "1";
}

function enable_timeline_button_events() {
    let content_element = document
        .querySelector("main-content")
        .shadowRoot.querySelector(".who-am-i") as HTMLElement;

    let baby_ashik_element = content_element.querySelector(
        "baby-ashik"
    ) as HTMLElement;

    let time_element = content_element.querySelector(
        ".scroll-timeline .desc h3"
    ) as HTMLElement;

    let desc_element = content_element.querySelector(
        ".scroll-timeline .desc p"
    ) as HTMLElement;

    (<HTMLElement>content_element.querySelector("#backward")).onclick = () => {
        baby_ashik_element.setAttribute(
            "current-content",
            _TIMELINE_POINTER > 0
                ? timeline_points[--_TIMELINE_POINTER]
                : timeline_points[0]
        );

        change_timeline_description(
            _TIMELINE_DESCRIPTION[timeline_points[_TIMELINE_POINTER]].time,
            time_element
        );

        change_timeline_description(
            _TIMELINE_DESCRIPTION[timeline_points[_TIMELINE_POINTER]].desc,
            desc_element
        );
    };

    (<HTMLElement>content_element.querySelector("#forward")).onclick = () => {
        baby_ashik_element.setAttribute(
            "current-content",
            _TIMELINE_POINTER < timeline_points.length - 1
                ? timeline_points[++_TIMELINE_POINTER]
                : timeline_points[timeline_points.length - 1]
        );

        change_timeline_description(
            _TIMELINE_DESCRIPTION[timeline_points[_TIMELINE_POINTER]].time,
            time_element
        );

        change_timeline_description(
            _TIMELINE_DESCRIPTION[timeline_points[_TIMELINE_POINTER]].desc,
            desc_element
        );
    };
}

function change_timeline_description(content: string, element: HTMLElement) {
    element.classList.add("fade-out");
    setTimeout(() => {
        element.innerHTML = content;
        element.classList.remove("fade-out");
    }, 500);
}

change_background();
enable_timeline_button_events();
