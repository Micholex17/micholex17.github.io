// ===== VARIABLES =====

// --- Game ---

let money = 0;
let MpC = 1; // Money Per Click
let MpS = 0; // Money Per Seconds

// --- Game ---

// --- Core ---

var subscribedUpgrades = [
]
var subscribedBuildings = [
]

var UpgradeType = {
    Blank: -1,
    ClickUpgrade: 0,
    BuildingUpgrade: 1 // Requires 'upgradeArg'!
}
var registerredUpgrades = [
    {
        id: "example",
        name: "Example",
        price: -1,
        upgradeType: null,
        upgradeValue: -1,
        upgradeArg: null
    }
]
var registerredBuildings = [
    {
        id: "example",
        name: "Example",
        price: -1,
        value: -1
    }
]

// --- Core ---

// --- Core2 ---

var Options = {
    Sounds: true
}

// --- Core2 ---

// ===== VARIABLES =====

// ===== CODE =====

// --- Game ---

RegisterUpgrade("betterMouses", "Better Mouses", 50, UpgradeType.BuildingUpgrade, 2, "mouse", "Mouses are twice effective."); // Building
RegisterUpgrade("goToCodingSchool", "Go To Coding School", 100, UpgradeType.ClickUpgrade, 1, null, "+1 MpC."); // Click
RegisterUpgrade("betterKeyboards", "Better Keyboards", 500, UpgradeType.BuildingUpgrade, 2, "keyboard", "Keyboards are twice effective."); // Building
RegisterUpgrade("readCodingBooks", "Read Coding Books", 1000, UpgradeType.ClickUpgrade, 1, null, "+1 MpC."); // Click
RegisterUpgrade("evenBetterMouses", "Even Better Mouses", 1500, UpgradeType.BuildingUpgrade, 2, "mouse", "Mouses are twice more effective."); // Building
RegisterUpgrade("betterMonitors", "Better Monitors", 5000, UpgradeType.BuildingUpgrade, 2, "monitor", "Monitors are twice effective."); // Building
RegisterUpgrade("evenBetterKeyboards", "Even Better Keyboards", 5500, UpgradeType.BuildingUpgrade, 2, "keyboard", "Keyboards are twice more effective."); // Building
RegisterUpgrade("betterPcs", "Better PC's", 10000, UpgradeType.BuildingUpgrade, 2, "pc", "PC's are twice effective."); // Building
RegisterUpgrade("evenBetterMonitors", "Even Better Monitors", 13500, UpgradeType.BuildingUpgrade, 2, "monitor", "Monitors are twice more effective.") // Building
RegisterUpgrade("watchTutorials", "Watch Tutorials", 15000, UpgradeType.ClickUpgrade, 1, null, "+1 MpC."); // Click
RegisterUpgrade("eventBetterPcs", "Even Better PC's", 17500, UpgradeType.BuildingUpgrade, 2, "pc", "PC's are twice more effective."); // Building
RegisterUpgrade("betterServers", "Better Servers", 20000, UpgradeType.BuildingUpgrade, 2, "server", "Servers are twice effective."); // Building
RegisterUpgrade("trainCodingSkills", "Train Coding Skills", 35000, UpgradeType.ClickUpgrade, 1, null, "+1 MpC."); // Click
RegisterUpgrade("evenBetterServers", "Even Better Servers", 45000, UpgradeType.BuildingUpgrade, 2, "server", "Servers are twice more effective."); // Building
RegisterUpgrade("qualifiedJrDevs", "Qualified Jr. Dev's", 50000, UpgradeType.BuildingUpgrade, 2, "jrDev", "Jr. Devs are twice effective."); // Building
RegisterUpgrade("qualifiedSrDevs", "Qualified Sr. Dev's", 75000, UpgradeType.BuildingUpgrade, 2, "srDev", "Sr. Devs are twice effective."); // Building
RegisterUpgrade("qualifiedProjectManagers", "Qualified Project Managers", 100000, UpgradeType.BuildingUpgrade, 2, "projectManager", "Project managers are twice effective."); // Building
RegisterUpgrade("qualifiedManagers", "Qualified Managers", 150000, UpgradeType.BuildingUpgrade, 2, "manager", "Managers are twice effective."); // Building
SubscribeUpgrades();

RegisterBuilding("mouse", "Mouse", 20, 1, "Just a nice mouse. [+1 MpS (each)]");
RegisterBuilding("keyboard", "Keyboard", 100, 1.5, "For your typing needs. [+1.5 MpS (each)]");
RegisterBuilding("monitor", "Monitor", 500, 2, "I guess you have to see what you're doing, am i right? [+2 MpS (each)]");
RegisterBuilding("pc", "PC", 1000, 2.5, "Used to play or make games (and for other stuff, but we'll skip them). [+2.5 MpS (each)]");
RegisterBuilding("server", "Server", 2500, 3, "You can host your Craftmine server on it! [+3 MpS (each)]");
RegisterBuilding("jrDev", "Jr. Dev", 5000, 3.5, "A developer starting his/her career. Not the best, but will do the work for you. [+3.5 MpS (each)]");
RegisterBuilding("srDev", "Sr. Dev", 10000, 4, "Better than Jr. Dev. [+4 MpS (each)");
RegisterBuilding("projectManager", "Project Manager", 15000, 4.5, "Oversees devs working on the project. [+4.5 MpS (each)]");
RegisterBuilding("manager", "Manager", 20000, 5, "Oversees all workers. [+5 MpS (each)]");
SubscribeBuildings();

function Start() // Runs when site is loaded
{
    _saveSysLoad();

    subscribedBuildings.forEach(elem =>
        {
            elem.price = elem.ogprice;
            elem.price += (elem.ogprice * 0.35) * elem.ownedAmount;
        });

    GenerateHTMLItems();
}

function Update() // Updates every 1/4 second (250 milliseconds)
{
    document.title = "$" + __abbrNum(money) + " - Idle Game Dev";

    subscribedUpgrades.forEach(elem =>
        {
            var shopItem = document.getElementById("PCShopUpgrade_" + elem.id);
            if (elem.owned == false)
            {
                shopItem.innerHTML = elem.name + " [$" + __abbrNum(elem.price) + "]";
                if (money >= elem.price)
                {
                    shopItem.className = "PCShopUpgrade";
                }
                else
                {
                    shopItem.className = "PCShopUpgradeUnavailable";
                }
            }
            else
            {
                shopItem.className = "PCShopUpgradeOwned";
                shopItem.innerHTML = elem.name + " [Owned]";
            }
        });
    subscribedBuildings.forEach(elem =>
        {
            var shopItem = document.getElementById("PCShopBuilding_" + elem.id);
            shopItem.innerHTML = elem.name + " [$" + __abbrNum(elem.price) + "] (" + elem.ownedAmount + " Owned)";
            if (money >= elem.price)
            {
                shopItem.className = "PCShopBuilding";
            }
            else
            {
                shopItem.className = "PCShopBuildingUnavailable";
            }
        });
}
function FixedUpdate() // Updates every second
{
    MpS = 0;
    subscribedBuildings.forEach(elem =>
        {
            var earned = elem.value * elem.ownedAmount;
            subscribedUpgrades.forEach(elem2 =>
                {
                    if (elem2.owned)
                    {
                        if (elem2.upgradeType == UpgradeType.BuildingUpgrade)
                        {
                            if (elem2.upgradeArg == elem.id)
                            {
                                earned *= elem2.upgradeValue;
                            }
                        }
                    }
                });
            MpS += earned;
        });
    money += MpS;

    MpC = 1;
    subscribedUpgrades.forEach(elem =>
        {
            if (elem.upgradeType == UpgradeType.ClickUpgrade)
            {
                if (elem.owned)
                {
                    MpC += elem.upgradeValue;
                }
            }
        });
}
function QuickUpdate() // Updates every 100 milliseconds
{
    document.getElementById("moneyDisplay").innerHTML = "Money: $" + __abbrNum(money);
    document.getElementById("mPCDisplay").innerHTML = "Money per Click (MpC): " + __abbrNum(MpC);
    document.getElementById("mPSDisplay").innerHTML = "Money per Second (MpS): " + __abbrNum(MpS);
    subscribedBuildings.forEach(elem =>
        {
            elem.price = elem.ogprice;
            elem.price += (elem.ogprice * 0.35) * elem.ownedAmount;
        });
}
function SlowUpdate() // Updates every 30 seconds
{
    _saveSysSave();
}

function captureClick()
{
    money += MpC;
    if (Options.Sounds == true) {
        var keypress = new Audio('./resources/sounds/keypress.wav');
        keypress.play();
    }
}

// --- Game ---

// --- Core ---

function SubscribeUpgrades()
{
    registerredUpgrades.forEach(elem =>
        {
            if (elem.id != "example" && elem.id != "blank")
            {
                alreadyExists = false
                subscribedUpgrades.forEach(elem2 =>
                    {
                        if (elem.id == elem2.id)
                        {
                            alreadyExists = true
                        }
                    })
                if (alreadyExists == false)
                {
                    var subbedUpgrade = {
                        id: elem.id,
                        name: elem.name,
                        price: elem.price,
                        upgradeType: elem.upgradeType,
                        upgradeValue: elem.upgradeValue,
                        upgradeArg: elem.upgradeArg,
                        description: elem.description,
                        owned: false
                    }
                    subscribedUpgrades.push(subbedUpgrade);
                }
            }
        });
}
function SubscribeBuildings()
{
    registerredBuildings.forEach(elem =>
        {
            if (elem.id != "example" && elem.id != "blank")
            {
                alreadyExists = false
                if (subscribedBuildings.length > 0)
                {
                    subscribedBuildings.forEach(elem2 =>
                        {
                            if (elem.id == elem2.id)
                            {
                                alreadyExists = true
                            }
                        })
                }
                if (alreadyExists == false)
                {
                    var subbedBuilding = {
                        id: elem.id,
                        name: elem.name,
                        ogprice: elem.price,
                        price: elem.price,
                        value: elem.value,
                        description: elem.description,
                        ownedAmount: 0
                    }
                    subscribedBuildings.push(subbedBuilding);
                }
            }
        })
}
function RegisterUpgrade(id, name, price, upgradeType, upgradeValue, upgradeArg = null, description="No description found") // update this in future to include multiple upgrade types
{
    var newUpgrade = {
        id: id,
        name: name,
        price: price,
        upgradeType: upgradeType,
        upgradeValue: upgradeValue,
        upgradeArg: upgradeArg,
        description: description
    }
    registerredUpgrades.push(newUpgrade);
}
function RegisterBuilding(id, name, price, value, description="No description found")
{
    var newBuilding = {
        id: id,
        name: name,
        price: price,
        value: value,
        description: description
    }
    registerredBuildings.push(newBuilding);
}

function BuyUpgrade(id)
{
    subscribedUpgrades.forEach(elem =>
        {
            if (elem.id == id)
            {
                if (elem.owned == false)
                {
                    if (money >= elem.price)
                    {
                        money -= elem.price;
                        elem.owned = true;
                        if (Options.Sounds == true)
                        {
                            var cash = new Audio("./resources/sounds/cash.mp3");
                            cash.play();
                        }
                    }
                }
            }
        });
}
function BuyBuilding(id)
{
    subscribedBuildings.forEach(elem =>
        {
            if (elem.id == id)
            {
                if (money >= elem.price)
                {
                    money -= elem.price;
                    elem.ownedAmount += 1;
                    if (Options.Sounds == true)
                    {
                        var cash = new Audio("./resources/sounds/cash.mp3");
                        cash.play();
                    }
                }
            }
        });
}

function DisplayUpgradeInfo(name, desc)
{
    var box = document.getElementById("shopItemInfoBox");
    var namedis = document.getElementById("shopItemInfoBoxName");
    var descdis = document.getElementById("shopItemInfoBoxDescription");

    namedis.innerHTML = name;
    descdis.innerHTML = desc;
    box.removeAttribute("hidden");
}
function HideUpgradeInfo()
{
    var box = document.getElementById("shopItemInfoBox");
    var namedis = document.getElementById("shopItemInfoBoxName");
    var descdis = document.getElementById("shopItemInfoBoxDescription");

    namedis.innerHTML = "";
    descdis.innerHTML = "";
    box.setAttribute("hidden", true);
}
function DisplayBuildingInfo(name, desc)
{
    var box = document.getElementById("shopItemInfoBox");
    var namedis = document.getElementById("shopItemInfoBoxName");
    var descdis = document.getElementById("shopItemInfoBoxDescription");

    namedis.innerHTML = name;
    descdis.innerHTML = desc;
    box.removeAttribute("hidden");
}
function HideBuildingInfo()
{
    var box = document.getElementById("shopItemInfoBox");
    var namedis = document.getElementById("shopItemInfoBoxName");
    var descdis = document.getElementById("shopItemInfoBoxDescription");

    namedis.innerHTML = "";
    descdis.innerHTML = "";
    box.setAttribute("hidden", true);
}

function GenerateHTMLItems()
{
    subscribedUpgrades.forEach(elem =>
        {
            var a = document.createElement("a");
            a.href = "javascript:void(0);";
            a.className = "PCShopUpgrade";
            a.id = "PCShopUpgrade_" + elem.id;
            a.onclick = function()
            {
                BuyUpgrade(elem.id);
            }
            a.setAttribute("draggable", false);
            a.addEventListener("mouseover", function(){DisplayUpgradeInfo(elem.name, elem.description);});
            a.addEventListener("mouseout", function(){HideUpgradeInfo();});
            a.innerHTML = elem.name + " [$#]";
            document.getElementById("PCShopUpgrades").appendChild(a);
        });
    subscribedBuildings.forEach(elem =>
        {
            var a = document.createElement("a");
            a.href = "javascript:void(0);";
            a.className = "PCShopBuilding";
            a.id = "PCShopBuilding_" + elem.id;
            a.onclick = function()
            {
                BuyBuilding(elem.id);
            }
            a.setAttribute("draggable", false);
            a.addEventListener("mouseover", function(){DisplayBuildingInfo(elem.name, elem.description);});
            a.addEventListener("mouseout", function(){HideBuildingInfo();})
            a.innerHTML = elem.name + " [$#] (# Owned)";
            document.getElementById("PCShopBuildings").appendChild(a);
        });
}

// --- Core ---

// --- Core1 ---

window.addEventListener("load", function()
{
    Start();
    _loadSettings();
}, false);
setInterval(Update, 250);
setInterval(FixedUpdate, 1000);
setInterval(QuickUpdate, 100);
setInterval(SlowUpdate, 30000);

function _saveSysSave()
{
    __setCookie("money", money);
    subscribedUpgrades.forEach(elem =>
        {
            __setCookie("upgrade_" + elem.id + "_owned", elem.owned);
        });
    subscribedBuildings.forEach(elem =>
        {
            __setCookie("building_"+elem.id+"_ownedAmount", elem.ownedAmount);
        });
}
function _saveSysLoad()
{
    if (__cookieExists("money"))
    {
        money = __stringToInt(__getCookie("money"));
    }
    else
    {
        money = 0;
    }
    subscribedUpgrades.forEach(elem =>
        {
            var owned = __getCookie("upgrade_"+elem.id+"_owned");
            if (owned == "true")
            {
                elem.owned = true;
            }
            else
            {
                elem.owned = false;
            }
        });
    subscribedBuildings.forEach(elem =>
        {
            if (__cookieExists("building_"+elem.id+"_ownedAmount"))
            {
                elem.ownedAmount = __stringToInt(__getCookie("building_"+elem.id+"_ownedAmount"));
            }
            else
            {
                elem.ownedAmount = 0;
            }
        });
}
function _dataReset()
{
    var c = confirm("Are you sure?");
    if (c)
    {
        money = 0;
        subscribedUpgrades.forEach(elem =>
            {
                elem.owned = false;
            });
        subscribedBuildings.forEach(elem =>
            {
                elem.ownedAmount = 0;
            });
        __clearCookies();
    }
}

function _toggleOptionsWindow()
{
    document.getElementById("option_sounds").checked = Options.Sounds;

    var e = document.getElementById("options_window");
    if (e.hasAttribute("hidden"))
    {
        e.removeAttribute("hidden");
    }
    else
    {
        e.setAttribute("hidden", true);
    }
}
function _applyOptions()
{
    Options.Sounds = document.getElementById("option_sounds").checked;
    __setCookie("option_sounds", Options.Sounds);
    _toggleOptionsWindow();
}
function _loadSettings()
{
    var option_sounds = __getCookie("option_sounds");
    if (option_sounds == "true")
    {
        Options.Sounds = true;
        document.getElementById("option_sounds").checked = true;
    }
    else if (option_sounds == "false")
    {
        Options.Sounds = false;
        document.getElementById("option_sounds").checked = false;
    }
    else
    {
        Options.Sounds = true;
        document.getElementById("option_sounds").checked = true;
    }
}

// --- Core1 ---

// --- Core2 ---

function __setCookie(cname, cvalue)
{
    const d = new Date();
    d.setTime(d.getTime() + ((365 * 5)*24*60*60*1000)); // 5 Years To Expire By Default (might make changeable later, i dont want yet)
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function __getCookie(cname)
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for(let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function __cookieExists(cname)
{
    var dc = document.cookie;
    var prefix = cname + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return false;
    }
    else
    {
        return true;
    }
}
function __clearCookies()
{
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++)
    {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function __stringToInt(s)
{
    toReturn = parseInt(s);
    return toReturn;
}
function __abbrNum(number)
{
    var decPlaces = 3;
    decPlaces = Math.pow(10,decPlaces);

    var abbrev = [ "k", "m", "b", "t", "q" ];

    for (var i=abbrev.length-1; i>=0; i--)
    {
        var size = Math.pow(10,(i+1)*3);
        if (size <= number)
        {
            number = Math.round(number*decPlaces/size)/decPlaces;
            if ((number == 1000) && (i < abbrev.length -1))
            {
                number = 1;
                i++;
            }

            number += abbrev[i];

            break;
        }
    }
    return number;
}

// --- Core2 ---

// ===== CODE =====