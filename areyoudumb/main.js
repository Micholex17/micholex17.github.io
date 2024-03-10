const nobtn = document.getElementById("nobtn")

nobtn.addEventListener("mouseenter",move)
function move()
{
    let i = Math.floor(Math.random() * 500) + 1
    let j = Math.floor(Math.random() * 500) + 1
    nobtn.style.left = i+"px"
    nobtn.style.top = j+"px"
}