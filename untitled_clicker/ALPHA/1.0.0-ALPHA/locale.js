const locales = new Map();

locales.set("en_US",
{
    "dummy": "Dummy",
    "points": "points",

    "shop.upgrades.title": "Upgrades",
    "shop.buildings.title": "Buildings",

    "home": "Home",

    "stats": "Stats",

    "stats.points": "Points",
    "stats.ownedUpgrades": "Owned Upgrades",
    "stats.ownedBuildings": "Owned Buildings",

    "options": "Options",

    "test_upgrade": "Test Upgrade",
    "test_building": "Test Building"
});

locales.set("pl_PL",
{
    "dummy": "DummyPL",

    "points": "punkty",

    "shop.buildings.title": "Budynki",
    "shop.upgrades.title": "Ulepszenia",

    "home": "Strona Główna",

    "stats": "Statystyki",

    "stats.points": "Punkty",
    "stats.ownedUpgrades": "Posiadane Ulepszenia",
    "stats.ownedBuildings": "Posiadane Budynki",

    "options": "Opcje",

    "test_upgrade": "Testowe Ulepszenie",
    "test_building": "Testowy Budynek"
});

window.__GetLanguage__ = function(locale)
{
    return locales.get(locale);
}