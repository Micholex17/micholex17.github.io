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