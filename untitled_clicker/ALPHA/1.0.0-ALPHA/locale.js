const locales = new Map();

locales.set("en_US",
{
    "dummy": "Dummy",

    // Error messages

    "error.not_enough_points": "Not enough points",

    // Core

    "points": "points",

    // Right

    "shop.upgrades.title": "Upgrades",
    "shop.buildings.title": "Buildings",

    // Center

    "home": "Home",

    "stats": "Stats",

    "stats.points": "Points",
    "stats.clicks": "Clicks",
    "stats.ownedUpgrades": "Owned Upgrades",
    "stats.ownedBuildings": "Owned Buildings",

    "options": "Options",

    "options.sounds": "Sounds",

    // Upgrades

    "test_upgrade": "Test Upgrade",
    "test_upgrade.description": "Upgrade made for testing",

    "test_upgrade_ii": "Test Upgrade II",
    "test_upgrade_ii.description": "Second upgrade made for testing",

    // Buildings

    "test_building": "Test Building",
    "test_building.description": "Building made for testing",

    "test_building_ii": "Test Building II",
    "test_building_ii.description": "Second building made for testing"
});

locales.set("pl_PL",
{
});

window.__GetLanguage__ = function(locale)
{
    return locales.get(locale);
}