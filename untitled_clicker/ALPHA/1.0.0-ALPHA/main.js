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

const ErrorHandler = {};
ErrorHandler.element = document.querySelector(".error_message_display");
ErrorHandler.Show = function(err)
{
    this.element.innerHTML = err;
    this.element.style.display = "";
}
ErrorHandler.Hide = function()
{
    this.element.style.display = "none";
}

const ItemInfoHandler = {};
ItemInfoHandler.element = document.querySelector(".item_info");
ItemInfoHandler.name = document.getElementById("item_info_name");
ItemInfoHandler.cost = document.getElementById("item_info_cost");
ItemInfoHandler.owned = document.getElementById("item_info_owned");
ItemInfoHandler.description = document.getElementById("item_info_description");
ItemInfoHandler.Show = function(item)
{
    if (item instanceof Upgrade || item instanceof Building)
    {
        this.name.innerHTML = Game.locale[item.id];
        this.cost.innerHTML = `($${item.cost})`;
        if (item instanceof Building)
        {
            this.owned.innerHTML = `[${item.owned}]`;
        }
        else
        {
            this.owned.innerHTML = "";
        }
        this.description.innerHTML = Game.locale[`${item.id}.description`];
    }
    this.element.style.display = "";
}
ItemInfoHandler.Update = function(item)
{
    if (item instanceof Upgrade || item instanceof Building)
    {
        this.name.innerHTML = Game.locale[item.id];
        this.cost.innerHTML = `($${item.cost})`;
        if (item instanceof Building)
        {
            this.owned.innerHTML = `[${item.owned}]`;
        }
        else
        {
            this.owned.innerHTML = "";
        }
        this.description.innerHTML = Game.locale[`${item.id}.description`];
    }
}
ItemInfoHandler.Hide = function()
{
    this.element.style.display = "none";
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
    constructor(id, cost, upgradeType, power=0, arg="")
    {
        this.id = id;
        this.cost = cost;
        this.upgradeType = upgradeType;
        this.power = power;
        this.arg = arg;

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

const Game = {};

Game.locale = {};

Game.points = 0;

Game.upgrades = [ // <--- Upgrades
    new Upgrade("test_upgrade", 20, UpgradeType.BoostClicks, 1),
    new Upgrade("test_upgrade_ii", 100, UpgradeType.BoostBuilding, 1, "test_building")
];

Game.buildings = [ // <--- Buildings
    new Building("test_building", 10, 1),
    new Building("test_building_ii", 50, 2)
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

    ErrorHandler.Hide();
    ItemInfoHandler.Hide();

    Game.upgrades.forEach((e) =>
    {
        let elem = document.createElement("a");
        elem.className = "upgrade";
        elem.id = `upgrd-${e.id}`;

        let imgPath = `assets/images/upgrade/${e.id}.png`;

        elem.innerHTML = `<img src="${imgPath}">`;

        elem.onclick = () =>
        {
            if (Game.points >= e.cost && e.owned == false)
            {
                Game.points -= e.cost;
                e.Buy();
                Game.Update(); Game.ShopUpdate(); ItemInfoHandler.Hide();
            }
            else
            {
                ErrorHandler.Show(Game.locale["error.not_enough_points"]);
            }
        }

        elem.onmouseenter = () =>
        {
            ItemInfoHandler.Show(e);
        }

        elem.onmouseleave = () =>
        {
            ItemInfoHandler.Hide();
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
                Game.Update(); Game.ShopUpdate(); ItemInfoHandler.Update(e);
            }
            else
            {
                ErrorHandler.Show(Game.locale["error.not_enough_points"]);
            }
        }

        elem.onmouseenter = () =>
        {
            ItemInfoHandler.Show(e);
        }
        elem.onmouseleave = () =>
        {
            ItemInfoHandler.Hide();
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
    const stats_clicks = document.getElementById("stats_clicks");
    const stats_ownedUpgrades = document.getElementById("stats_ownedUpgrades");
    const stats_ownedBuildings = document.getElementById("stats_ownedBuildings");

    stats_title.innerHTML = Game.locale["stats"];
    stats_points.innerHTML = `${Game.locale["stats.points"]}: ${Game.points}`;
    stats_clicks.innerHTML = `${Game.locale["stats.clicks"]}: ${Clicker.clickedTimes}`;

    let ownedUpgrades = 0;
    Game.upgrades.forEach(e => 
    {
        if (e.owned)
        {
            ownedUpgrades++;
        }
    });

    stats_ownedUpgrades.innerHTML = `${Game.locale["stats.ownedUpgrades"]}: ${ownedUpgrades}`;

    let ownedBuildings = 0;
    Game.buildings.forEach(e =>
    {
        ownedBuildings += e.owned;
    });

    stats_ownedBuildings.innerHTML = `${Game.locale["stats.ownedBuildings"]}: ${ownedBuildings}`;

    // Options
    const options_title = document.getElementById("options_title");
    const options_sounds = document.getElementById("options_sounds");

    options_title.innerHTML = Game.locale["options"];
    options_sounds.innerHTML = Game.locale["options.sounds"];
}

Game.ShopUpdate = function()
{
    Game.upgrades.forEach((e) =>
    {
        let elem = document.getElementById(`upgrd-${e.id}`);
        if (elem == null)
        {
            return;
        }

        let imgPath = `assets/images/upgrade/${e.id}.png`;

        elem.innerHTML = `<img src="${imgPath}">`;

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
        let amount = e.power * e.owned;
        let multiplier = 1;
        Game.upgrades.forEach(e2 =>
        {
            if (e2.owned)
            {
                if (e2.upgradeType = UpgradeType.BoostBuilding)
                {
                    if (e2.arg == e.id)
                    {
                        multiplier += e2.power;
                    }
                }
            }
        });
        sum += amount * multiplier;
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

    let amountToAdd = 1;

    let boostClicksMultiplier = 1;

    Game.upgrades.forEach(e =>
    {
        if (e.owned)
        {
            if (e.upgradeType = UpgradeType.BoostClicks)
            {
                boostClicksMultiplier += e.power;
            }
        }
    });

    amountToAdd *= boostClicksMultiplier;

    Game.AddPoints(amountToAdd);
    
    Game.Update(); Game.ShopUpdate();
}

/*
Save progress into a single string, eg.
3809|0|0|1|0|1|1|true|false|false|false|true|false

When loading, split them up into multiple arrays:
- Core items
- Upgrades
- Buildings

Do it all based on how many of these items are, eg.

Loading process:
- split string into a single array
- split array into multiple smaller arrays based on how many
of each items should be in there
    eg. 3 core items, 3 first item should be moved to new array
and deleted from original
    2 upgrades to load, 2 first items (after removing previous)
should be moved to new array

and so on
*/

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