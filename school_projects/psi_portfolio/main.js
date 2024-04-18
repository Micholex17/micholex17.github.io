const nav_menu = document.getElementById("nav_menu")

function toggle_nav_menu()
{
    if (nav_menu.style.display == "none")
    {
        nav_menu.style.display = "flex"
    }
    else
    {
        nav_menu.style.display = "none"
    }
}

function navbarLink(arg)
{
    if (arg == "About")
    {
        window.scrollTo(0, 0)
    }
    else if (arg == "Projects")
    {
        let elem = document.getElementById("projects_header")
        window.scroll(0, findPosition(elem) - 100)
    }
    else if (arg == "Skills")
    {
        let elem = document.getElementById("skills_header")
        window.scroll(0, findPosition(elem) - 100)
    }
    else if (arg == "Contact")
    {
        let elem = document.getElementById("contact_header")
        window.scroll(0, findPosition(elem) - 100)
    }
}

function findPosition(obj) {
    let currenttop = 0;
    if (obj.offsetParent) {
        do {
            currenttop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [currenttop];
    }
}

document.querySelectorAll(".skillProgress").forEach((e) => {
    e.style.width = e.innerHTML;
})