const FOCUS_IMAGE = document.getElementById("focus_image")
const FOCUS_CLASS = document.querySelector(".focus_image");

function focus(event) {
    FOCUS_IMAGE.src = event.target.src

    FOCUS_CLASS.classList.remove("hidden")
}

function unfocus() {
    FOCUS_CLASS.classList.add("hidden")
}

const IMAGES = document.querySelectorAll(".image");

IMAGES.forEach((e) => {
    e.addEventListener("click", (ev) => {
        focus(ev);
    })
})
