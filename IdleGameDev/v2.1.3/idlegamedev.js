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

// RegisterUpgrade(id, name, price, upgradeType, upgradeValue, upgradeArg = null, description="No description found");
/* Ideas:
Click Upgrades: Go to coding school, Read coding books, Watch tutorials, Practice writing code, Read documentation, Read code samples, Practice making games, Purchase paid programs,
Ask for help, Create your first games

Building Upgrades: Better mousepads, Even better mousepads, Best mousepads, Better mouses, Even better mouses, Best mouses, Better keyboards, Even better keyboards, Best keyboards,
Better monitors, Even better monitors, Best monitors, Better printers, Even better printers, Best printers, Better cameras, Even better cameras, Best cameras,
Better PC's, Even better PC's, Best PC's, Better motherboards, Even better motherboards, Best motherboards, Better RAM's, Even better RAM's, Best RAM's, Better CPU's, Even better CPU's, Best CPU's,
Better GPU's, Even better GPU's, Best GPU's, Better interns, Even better interns, Best interns, Better Jr. Dev's, Even better Jr. Dev's, Best Jr. Dev's,
Better Sr. Dev's, Even better Sr. Dev's, Best Sr. Dev's, Better artists, Even better artists, Best artists, Better 3D artists, Even better 3D artists, Best 3D artists,
Better voice actors, Even better voice actors, Best voice actors, Better music producers, Even better music producers, Best music producers
*/
// Click Upgrades
RegisterUpgrade("goToCodingSchool", "Go to coding school", 100, UpgradeType.ClickUpgrade, 1, null, "+1 MpC");
RegisterUpgrade("readCodingBooks", "Read coding books", 200, UpgradeType.ClickUpgrade, 1, null, "+1 MpC");
RegisterUpgrade("watchTutorials", "Watch tutorials", 300, UpgradeType.ClickUpgrade, 1, null, "+1 MpC");
RegisterUpgrade("practiceWritingCode", "Practice writing code", 400, UpgradeType.ClickUpgrade, 1, null, "+1 MpC");
RegisterUpgrade("readDocumentation", "Read documentation", 500, UpgradeType.ClickUpgrade, 1, null, "+1 MpC");
RegisterUpgrade("readCodeSamples", "Read code samples", 1000, UpgradeType.ClickUpgrade, 2, null, "+2 MpC");
RegisterUpgrade("practiceMakingGames", "Practice making games", 1500, UpgradeType.ClickUpgrade, 2, null, "+2 MpC");
RegisterUpgrade("purchasePaidPrograms", "Purchase paid programs", 2000, UpgradeType.ClickUpgrade, 2, null, "+2 MpC");
RegisterUpgrade("askForHelp", "Ask for help", 2500, UpgradeType.ClickUpgrade, 2, null, "+2 MpC");
RegisterUpgrade("createYourFirstGames", "Create your first games", 3000, UpgradeType.ClickUpgrade, 2, null, "+2 MpC");
// Building Upgrades
RegisterUpgrade("betterMousepads", "Better mousepads", 100, UpgradeType.BuildingUpgrade, 1, "mousepad");
RegisterUpgrade("evenBetterMousepads", "Even better mousepads", 1000, UpgradeType.BuildingUpgrade, 1, "mousepad");
RegisterUpgrade("bestMousepads", "Best mousepads", 5000, UpgradeType.BuildingUpgrade, 2, "mousepads");

RegisterUpgrade("betterMouses", "Better mouses", 1000, UpgradeType.BuildingUpgrade, 1, "mouse");
RegisterUpgrade("evenBetterMouses", "Even better mouses", 5000, UpgradeType.BuildingUpgrade, 1, "mouse");
RegisterUpgrade("bestMouses", "Best mouses", 10000, UpgradeType.BuildingUpgrade, 2, "mouse");

RegisterUpgrade("betterKeyboards", "Better keyboards", 5000, UpgradeType.BuildingUpgrade, 1, "keyboard");
RegisterUpgrade("evenBetterKeyboards", "Even better keyboards", 10000, UpgradeType.BuildingUpgrade, 1, "keyboard");
RegisterUpgrade("bestKeyboards", "Best keyboards", 15000, UpgradeType.BuildingUpgrade, 2, "keyboard");

RegisterUpgrade("betterMonitors", "Better monitors", 10000, UpgradeType.BuildingUpgrade, 1, "monitor");
RegisterUpgrade("evenBetterMonitors", "Even better monitors", 15000, UpgradeType.BuildingUpgrade, 1, "monitor");
RegisterUpgrade("bestMonitors", "Best monitors", 25000, UpgradeType.BuildingUpgrade, 2, "monitor");

RegisterUpgrade("betterPrinters", "Better printers", 15000, UpgradeType.BuildingUpgrade, 1, "printer");
RegisterUpgrade("evenBetterPrinters", "Even better printers", 25000, UpgradeType.BuildingUpgrade, 1, "printer");
RegisterUpgrade("bestPrinters", "Best printers", 50000, UpgradeType.BuildingUpgrade, 2, "printer");

RegisterUpgrade("betterCameras", "Better cameras", 25000, UpgradeType.BuildingUpgrade, 1, "camera");
RegisterUpgrade("evenBetterCameras", "Even better cameras", 50000, UpgradeType.BuildingUpgrade, 1, "camera");
RegisterUpgrade("bestCameras", "Best cameras", 75000, UpgradeType.BuildingUpgrade, 2, "camera");

RegisterUpgrade("betterPcs", "Better PC's", 50000, UpgradeType.BuildingUpgrade, 1, "pc");
RegisterUpgrade("evenBetterPcs", "Even better PC's", 75000, UpgradeType.BuildingUpgrade, 1, "pc");
RegisterUpgrade("bestPcs", "Best PC's", 100000, UpgradeType.BuildingUpgrade, 2, "pc");

RegisterUpgrade("betterMotherboards", "Better motherboards", 75000, UpgradeType.BuildingUpgrade, 1, "motherboard");
RegisterUpgrade("evenBetterMotherboards", "Even better motherboards", 100000, UpgradeType.BuildingUpgrade, 1, "motherboard");
RegisterUpgrade("bestMotherboards", "Best motherboards", 105000, UpgradeType.BuildingUpgrade, 2, "motherboard");

RegisterUpgrade("betterRams", "Better RAM's", 100000, UpgradeType.BuildingUpgrade, 1, "ram");
RegisterUpgrade("evenBetterRams", "Even better RAM's", 105000, UpgradeType.BuildingUpgrade, 1, "ram");
RegisterUpgrade("bestRams", "Best RAM's", 125000, UpgradeType.BuildingUpgrade, 2, "ram");

RegisterUpgrade("betterCpus", "Better CPU's", 105000, UpgradeType.BuildingUpgrade, 1, "cpu");
RegisterUpgrade("evenBetterCpus", "Even better CPU's", 125000, UpgradeType.BuildingUpgrade, 1, "cpu");
RegisterUpgrade("bestCpus", "Best CPU's", 150000, UpgradeType.BuildingUpgrade, 2, "cpu");

RegisterUpgrade("betterGpus","Better GPU's",125000,UpgradeType.BuildingUpgrade,1,"gpu");
RegisterUpgrade("evenBetterGpus","Even better GPU's",150000,UpgradeType.BuildingUpgrade,1,"gpu");
RegisterUpgrade("bestGpus","Best GPU's",200000,UpgradeType.BuildingUpgrade,2,"gpu");

RegisterUpgrade("betterInterns","Better interns",150000,UpgradeType.BuildingUpgrade,1,"intern");
RegisterUpgrade("evenBetterInterns","Even better interns",200000,UpgradeType.BuildingUpgrade,1,"intern");
RegisterUpgrade("bestInterns","Best interns",250000,UpgradeType.BuildingUpgrade,2,"intern");

RegisterUpgrade("betterJrDevs","Better Jr. Dev's",200000,UpgradeType.BuildingUpgrade,1,"jrDev");
RegisterUpgrade("evenBetterJrDevs","Even better Jr. Dev's",250000,UpgradeType.BuildingUpgrade,1,"jrDev");
RegisterUpgrade("bestJrDevs","Best Jr. Dev's",300000,UpgradeType.BuildingUpgrade,2,"jrDev");

RegisterUpgrade("betterSrDevs","Better Sr. Dev's",250000,UpgradeType.BuildingUpgrade,1,"srDev");
RegisterUpgrade("evenBetterSrDevs","Even better Sr. Dev's",300000,UpgradeType.BuildingUpgrade,1,"srDev");
RegisterUpgrade("bestSrDevs","Best Sr. Dev's",350000,UpgradeType.BuildingUpgrade,2,"srDev");

RegisterUpgrade("betterArtists","Better artists",300000,UpgradeType.BuildingUpgrade,1,"artist");
RegisterUpgrade("evenBetterArtists","Even better artists",350000,UpgradeType.BuildingUpgrade,1,"artist");
RegisterUpgrade("bestArtists","Best artists",400000,UpgradeType.BuildingUpgrade,2,"artist");

RegisterUpgrade("better3dArtists","Better 3D artists",350000,UpgradeType.BuildingUpgrade,1,"3dArtist");
RegisterUpgrade("evenBetter3dArtists","Even better 3D artists",400000,UpgradeType.BuildingUpgrade,1,"3dArtist");
RegisterUpgrade("best3dArtists","Best 3D artists",450000,UpgradeType.BuildingUpgrade,2,"3dArtist");

RegisterUpgrade("betterVoiceActors","Better voice actors",400000,UpgradeType.BuildingUpgrade,1,"voiceActor");
RegisterUpgrade("evenBetterVoiceActors","Even better voice actors",450000,UpgradeType.BuildingUpgrade,1,"voiceActor");
RegisterUpgrade("bestVoiceActors","Best voice actors",500000,UpgradeType.BuildingUpgrade,2,"voiceActor");

RegisterUpgrade("betterMusicProducers","Better music producers",450000,UpgradeType.BuildingUpgrade,1,"musicProducer");
RegisterUpgrade("evenBetterMusicProducers","Even better music producers",500000,UpgradeType.BuildingUpgrade,1,"musicProducer");
RegisterUpgrade("bestMusicProducers","Best music producers",550000,UpgradeType.BuildingUpgrade,2,"musicProducer");

RegisterUpgrade("betterProjectManagers","Better project managers",500000,UpgradeType.BuildingUpgrade,1,"projectManager");
RegisterUpgrade("evenBetterProjectManagers","Even better project managers",550000,UpgradeType.BuildingUpgrade,1,"projectManager");
RegisterUpgrade("bestProjectManagers","Best project managers",600000,UpgradeType.BuildingUpgrade,2,"projectManager");
SubscribeUpgrades(); // MANDATORY!

// RegisterBuilding(id, name, price, value, description="No description found")
/* Ideas: Mousepad, Mouse, Keyboard, Monitor, Printer, Camera, PC, Motherboard, RAM, CPU, GPU, Intern, Jr. Dev, Sr. Dev, Artist, 3D Artist, Voice Actor, Music Producer, Project Manager
*/
RegisterBuilding("mousepad", "Mousepad", 10, 1, "+1 MpS");
RegisterBuilding("mouse", "Mouse", 25, 1.5, "+1.5 MpS");
RegisterBuilding("keyboard", "Keyboard", 50, 2, "+2 MpS");
RegisterBuilding("monitor", "Monitor", 75, 2.5, "+2.5 MpS");
RegisterBuilding("printer", "Printer", 100, 3, "+3 MpS");
RegisterBuilding("camera", "Camera", 150, 3.5, "+3.5 MpS");
RegisterBuilding("pc", "PC", 200, 4, "+4 MpS");
RegisterBuilding("motherboard", "Motherboard", 250, 4.5, "+4.5 MpS");
RegisterBuilding("ram", "RAM", 300, 5, "+5 MpS");
RegisterBuilding("cpu", "CPU", 350, 5.5, "+5.5 MpS");
RegisterBuilding("gpu", "GPU", 400, 6, "+6 MpS");
RegisterBuilding("intern", "Intern", 450, 6.5, "+6.5 MpS");
RegisterBuilding("jrDev", "Jr. Dev", 500, 7, "+7 MpS");
RegisterBuilding("srDev", "Sr. Dev", 1000, 7.5, "+7.5 MpS");
RegisterBuilding("artist", "Artist", 1500, 8, "+8 MpS");
RegisterBuilding("3dArtist", "3D Artist", 2000, 8.5, "+8.5 MpS");
RegisterBuilding("voiceActor", "Voice Actor", 2500, 9, "+9 MpS");
RegisterBuilding("musicProducer", "Music Producer", 3000, 9.5, "+9.5 MpS");
RegisterBuilding("projectManager", "Project Manager", 3500, 10, "+10 MpS");
SubscribeBuildings(); // MANDATORY!

function Start() // Runs when site is loaded
{
    _saveSysLoad();

    subscribedBuildings.forEach(elem =>
        {
            elem.price = elem.ogprice;
            elem.price += (elem.ogprice * 0.35) * elem.ownedAmount;
        });

    GenerateHTMLItems();

    var x = __getCookie("cookiesacknowledged");
    if (x != "true")
    {
        document.getElementById("cookiesnotice").style.display = "block";
    }
}

function Update() // Runs every 1/4 second (250 milliseconds)
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

    subscribedUpgrades.forEach(e =>
        {
            var item = document.getElementById("PCShopUpgrade_"+e.id);
            if (e.visible == true)
            {
                item.style.display = "block";
            }
            else
            {
                item.style.display = "none";
            }

            if (money >= e.price)
            {
                e.visible = true;
            }
        });
    subscribedBuildings.forEach(e =>
        {
            var item = document.getElementById("PCShopBuilding_"+e.id);
            if (e.visible == true)
            {
                item.style.display = "block";
            }
            else
            {
                item.style.display = "none";
            }

            if (money >= e.price)
            {
                e.visible = true;
            }
        });
}
function FixedUpdate() // Runs every second (1000 milliseconds)
{
    MpS = 0;
    subscribedBuildings.forEach(elem =>
        {
            var earned = elem.value * elem.ownedAmount;
            subscribedUpgrades.forEach(elem2 =>
                {
                    if (elem2.upgradeType == UpgradeType.BuildingUpgrade)
                    {
                        if (elem2.upgradeArg == elem.id)
                        {
                            if (elem2.owned)
                            {
                                earned *= elem2.upgradeValue + 1;
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
function QuickUpdate() // Runs every 100 milliseconds
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
function SlowUpdate() // Runs every half a minute (30 seconds)
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
                        visible: false,
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
                        visible: false,
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
    box.style.display = "block";
}
function HideUpgradeInfo()
{
    var box = document.getElementById("shopItemInfoBox");
    var namedis = document.getElementById("shopItemInfoBoxName");
    var descdis = document.getElementById("shopItemInfoBoxDescription");

    namedis.innerHTML = "";
    descdis.innerHTML = "";
    box.style.display = "none";
}
function DisplayBuildingInfo(name, desc)
{
    var box = document.getElementById("shopItemInfoBox");
    var namedis = document.getElementById("shopItemInfoBoxName");
    var descdis = document.getElementById("shopItemInfoBoxDescription");

    namedis.innerHTML = name;
    descdis.innerHTML = desc;
    box.style.display = "block";
}
function HideBuildingInfo()
{
    var box = document.getElementById("shopItemInfoBox");
    var namedis = document.getElementById("shopItemInfoBoxName");
    var descdis = document.getElementById("shopItemInfoBoxDescription");

    namedis.innerHTML = "";
    descdis.innerHTML = "";
    box.style.display = "none";
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
            a.style.display = "none";
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
            a.style.display = "none";
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

/*
I AM AWARE THE SAVE SYSTEM IS PROBABLY INEFFICIENT AS HELL,
BUT IT'S THE BEST I COULD HAVE WRITTEN FOR NOW
*/
function _saveSysSave()
{
    __setCookie("money", money);
    subscribedUpgrades.forEach(elem =>
        {
            __setCookie("upgrade_" + elem.id + "_owned", elem.owned);
            __setCookie("upgrade_" + elem.id + "_visible", elem.visible);
        });
    subscribedBuildings.forEach(elem =>
        {
            __setCookie("building_"+elem.id+"_ownedAmount", elem.ownedAmount);
            __setCookie("building_"+elem.id+"_visible", elem.visible);
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
            var visible = __getCookie("upgrade_"+elem.id+"_visible");
            if (visible == "true")
            {
                elem.visible = true;
            }
            else
            {
                elem.visible = false;
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
            var visible = __getCookie("building_"+elem.id+"_visible");
            if (visible == "true")
            {
                elem.visible = true;
            }
            else
            {
                elem.visible = false;
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
                elem.visible = false;
            });
        subscribedBuildings.forEach(elem =>
            {
                elem.ownedAmount = 0;
                elem.visible = false;
            });
        //__clearCookies(); // is no work for some reason
        _saveSysSave();
    }
}

function _toggleOptionsWindow()
{
    document.getElementById("option_sounds").checked = Options.Sounds;

    var e = document.getElementById("options_window");
    if (e.style.display == "none")
    {
        e.style.display = "block";
    }
    else
    {
        e.style.display = "none";
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
function __clearCookies() // is no work :<
{
    var cookiesack = __getCookie("cookiesacknowledged");

    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++)
    {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (cookiesack == "true")
    {
        __closecookiesnotice();
    }
}
function __closecookiesnotice()
{
    __setCookie("cookiesacknowledged", true);
    document.getElementById("cookiesnotice").style.display = "none";
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