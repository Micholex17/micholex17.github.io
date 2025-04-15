const LINKS = document.querySelector(".links");

const observer = new IntersectionObserver( (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("SHOW");
        }/* else {
            entry.target.classList.remove("SHOW");
        }*/
    })
})

function toggleLinksMenu() {
    LINKS.classList.toggle("mobile_hidden");
}

const hiddenElements = document.querySelectorAll(".HIDDEN")

hiddenElements.forEach((e) => observer.observe(e))
