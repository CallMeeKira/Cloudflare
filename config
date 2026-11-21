const SITE_CONFIG = {
  lang: "en",
  mainSiteName: "SITENAME",
  mongilSiteName: "MONGIL_SITENAME",
  footerText: "Built with HTML & CSS on Cloudflare.",
  theme: {
    storageKey: "theme"
  },
  labels: {
    backToMain: "← Main Site",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    themeButton: "Theme",
    themeAriaLabel: "Toggle dark mode"
  },
  getPrefix() {
    return window.location.pathname.includes("/mongilsd") ? "../" : "./";
  },
  getLinks() {
    const prefix = this.getPrefix();
    return {
      home: `${prefix}`,
      about: `${prefix}#about`,
      highlights: `${prefix}#highlights`,
      mongil: `${prefix}mongilsd/`
    };
  }
};
