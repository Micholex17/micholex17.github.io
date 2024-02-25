let Dummy = {};

Dummy.Dummy = function()
{
    console.log("Dummy");
    return "Dummy";
}

class DummyClass
{
    constructor(a, b)
    {
        this.a = a;
        this.b = b;
    }
    Dummy()
    {
        console.log(this.a);
        console.log(this.b);
    }
}

function Testsound()
{
}

// ---

let Utilities = {};
Utilities.ReadJSONFile = function()
{
}

// ---

let Settings = new Map();
Settings.set("lang", "en_US");

const UpgradeType = {
    "BoostClicks": "upgrdtype.id.boost_clicks",
    "BoostBuilding": "upgrdtype.id.boost_building"
}

class Upgrade
{
    constructor(id, cost, upgradeType, power=0)
    {
        this.id = id;
        this.cost = cost;
        this.upgradeType = upgradeType;
        this.power = power;

        this.owned = false;

        // technical
        this._visible = false;
    }

    Buy()
    {
        this.owned = true;
    }
}

class Building
{
    constructor(id, cost, power)
    {
        this.id = id;
        this.cost = cost;
        this.power = power;

        this.owned = 0;

        // technical
        this._visible = false;
    }

    Buy()
    {
        this.owned += 1;
        this.cost += Math.floor(this.cost * 0.33);
    }

    CalculatePrice()
    {
        for (let i = 0; i < this.owned; i++)
        {
            this.cost += Math.floor(this.cost * 0.33);
        }
    }
}

let Game = {};

Game.locale = {};

Game.points = 0;

Game.upgrades = [ // <--- Upgrades
    new Upgrade("test_upgrade", 20)
];

Game.buildings = [ // <--- Buildings
    new Building("test_building", 10, 1)
];

Game.upgradesShop = document.getElementById("upgrades_shop");
Game.buildingsShop = document.getElementById("buildings_shop");

Game.AddPoints = function(amount)
{
    this.points += amount;
    this.Update();
}

Game.Awake = function()
{
    Game.locale = __GetLanguage__(Settings.get("lang"));
    this.LoadLanguage();

    Game.buildings.forEach((e) =>
    {
        let elem = document.createElement("a");
        elem.className = "building";
        elem.id = `bldng-${e.id}`;

        let imgPath = `assets/images/building/${e.id}.png`;

        elem.innerHTML = `<img src="${imgPath}">${Game.locale[e.id]} ($${e.cost}) [0]`;

        elem.onclick = () =>
        {
            if (Game.points >= e.cost)
            {
                Game.points -= e.cost;
                e.Buy();
                Game.Update(); Game.ShopUpdate();
            }
        }

        Game.buildingsShop.appendChild(elem);

        if (e._visible == false)
        {
            if (e.owned > 0 || Game.points >= e.cost)
            {
                elem.style.display = "";
                e._visible = true;
            }
            else
            {
                elem.style.display = "none";
            }
        }
    });

    Game.upgrades.forEach((e) =>
    {
        let elem = document.createElement("a");
        elem.className = "upgrade";
        elem.id = `upgrd-${e.id}`;

        let imgPath = `assets/images/upgrade/${e.id}.png`;

        elem.innerHTML = `<img src="${imgPath}">${Game.locale[e.id]} ($${e.cost})`;

        elem.onclick = () =>
        {
            if (Game.points >= (e.cost * 0.9) && e.owned == false)
            {
                Game.points -= e.cost;
                e.Buy();
                Game.Update(); Game.ShopUpdate();
            }
        }

        Game.upgradesShop.appendChild(elem);

        if (e._visible == false)
        {
            if (e.owned == false && Game.points >= (e.cost * 0.9))
            {
                elem.style.display = "";
                e._visible = true;
            }
            else
            {
                elem.style.display = "none";
            }
        }
        else
        {
            if (e.owned == true)
            {
                elem.style.display = "none";
            }
        }
    })

    Center.buttons.forEach((value, key) =>
    {
        value.onclick = () =>
        {
            Center.ChangeSection(key);
        }
    });

    this.CenterUpdate();
}

Game.Update = function()
{
    // Base
    const points_display = document.getElementById("points_display");
    const upgrades_shop_title = document.getElementById("upgrades_shop_title");
    const buildings_shop_title = document.getElementById("buildings_shop_title");

    points_display.innerHTML = `${Game.points} ${Game.locale["points"]}`;
    upgrades_shop_title.innerHTML = Game.locale["shop.upgrades.title"];
    buildings_shop_title.innerHTML = Game.locale["shop.buildings.title"];

    // Home

    const home_title = document.getElementById("home_title");

    home_title.innerHTML = Game.locale["home"];

    // Stats
    const stats_title = document.getElementById("stats_title");
    const stats_points = document.getElementById("stats_points");
    const stats_ownedUpgrades = document.getElementById("stats_ownedUpgrades");
    const stats_ownedBuildings = document.getElementById("stats_ownedBuildings");

    stats_title.innerHTML = Game.locale["stats"];
    stats_points.innerHTML = `${Game.locale["stats.points"]}: ${Game.points}`;
    stats_ownedUpgrades.innerHTML = `${Game.locale["stats.ownedUpgrades"]}: b`;
    stats_ownedBuildings.innerHTML = `${Game.locale["stats.ownedBuildings"]}: c`;

    // Options
    const options_title = document.getElementById("options_title");

    options_title.innerHTML = Game.locale["options"];
}

Game.ShopUpdate = function()
{
    Game.buildings.forEach((e) =>
    {
        let elem = document.getElementById(`bldng-${e.id}`);
        if (elem == null)
        {
            return;
        }

        let imgPath = `assets/images/building/${e.id}.png`;

        elem.innerHTML = `<img src="${imgPath}">${Game.locale[e.id]} ($${e.cost}) [${e.owned}]`;

        if (e._visible == false)
        {
            if (e.owned > 0 || Game.points >= (e.cost * 0.9))
            {
                elem.style.display = "";
                e._visible = true;
            }
            else
            {
                elem.style.display = "none";
            }
        }
    });

    Game.upgrades.forEach((e) =>
    {
        let elem = document.getElementById(`upgrd-${e.id}`);
        if (elem == null)
        {
            return;
        }

        let imgPath = `assets/images/upgrade/${e.id}.png`;

        elem.innerHTML = `<img src="${imgPath}">${Game.locale[e.id]} ($${e.cost})`;

        if (e._visible == false)
        {
            if (e.owned == false && Game.points >= (e.cost * 0.9))
            {
                elem.style.display = "";
                e._visible = true;
            }
            else
            {
                elem.style.display = "none";
            }
        }
        else
        {
            if (e.owned == true)
            {
                elem.style.display = "none";
            }
        }
    });
}

Game.CenterUpdate = function()
{
    Center.sections.forEach((value, key) => 
    {
        if (key == Center.currentSection)
        {
            value.style.display = "";
        }
        else
        {
            value.style.display = "none";
        }
    });

    Center.buttons.forEach((value, key) =>
    {
        value.innerHTML = Game.locale[key];
        if (key == Center.currentSection)
        {
            value.style.textDecoration = "underline";
        }
        else
        {
            value.style.textDecoration = "";
        }
    });
}

Game.LoadLanguage = function()
{
    Game.locale = __GetLanguage__(Settings.get("lang"));

    this.Update();
    this.ShopUpdate();
    this.CenterUpdate();
}

Game.BuildingsEarn = function()
{
    let sum = 0;
    Game.buildings.forEach((e) => {
        sum += e.power * e.owned;
    });
    Game.AddPoints(sum);
}
setInterval(Game.BuildingsEarn, 1000);

let Center = {};

Center.currentSection = "home";

Center.sections = new Map();
Center.sections.set("home", document.getElementById("home"));
Center.sections.set("stats", document.getElementById("stats"));
Center.sections.set("options", document.getElementById("options"));

Center.buttons = new Map();
Center.buttons.set("home", document.getElementById("center_home_button"));
Center.buttons.set("stats", document.getElementById("center_stats_button"));
Center.buttons.set("options", document.getElementById("center_options_button"));

Center.ChangeSection = function(e)
{
    this.currentSection = e;
    Game.CenterUpdate();
}

document.getElementById("lang_select").onchange = (e) =>
{
    Settings.set("lang", e.target.value);
    Game.LoadLanguage();
}

let Clicker = {};

Clicker.clickedTimes = 0;

Clicker.Clicked = function()
{
    Clicker.clickedTimes += 1;

    Game.AddPoints(1);
    
    Game.Update(); Game.ShopUpdate();
}

let SaveSystem = {};

SaveSystem.Save = function()
{
    console.log("Progress saved");
}
setInterval(SaveSystem.Save, 60000);

SaveSystem.Load = function()
{
    console.log("Progress loaded");
}

SaveSystem.Export = function()
{
}

SaveSystem.Import = function()
{
}

window.onload = () => {
    Game.Awake();
}