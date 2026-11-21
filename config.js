const SITE_CONFIG = {
  lang: "en",
  mainSiteName: "Ratticus",
  mongilSiteName: "Mongil Database",
  footerText: "Built with HTML & CSS on Cloudflare.",
  theme: {
    storageKey: "theme"
  },
  viewport: {
    breakpoints: {
      mobileMax: 640,
      tabletMax: 1024
    },
    _overrideMode: "auto", // "auto" | "mobile" | "tablet" | "desktop"

    detectSize() {
      if (this._overrideMode && this._overrideMode !== "auto") {
        return this._overrideMode;
      }
      const width = window.innerWidth;
      if (width <= this.breakpoints.mobileMax) return "mobile";
      if (width <= this.breakpoints.tabletMax) return "tablet";
      return "desktop";
    },

    detectDevice() {
      const width = window.innerWidth;
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const maxTouch = navigator.maxTouchPoints || 0;
      const hasTouch = isCoarsePointer || maxTouch > 0;

      if (width <= this.breakpoints.mobileMax || (hasTouch && width < 768)) {
        return "phone";
      }
      if (hasTouch && width <= this.breakpoints.tabletMax) {
        return "tablet";
      }
      return "desktop";
    },

    apply() {
      const root = document.documentElement;
      const size = this.detectSize();
      const device = this.detectDevice();

      root.dataset.size = size;
      root.dataset.device = device;
      root.dataset.viewportMode = this._overrideMode;
    },

    setOverride(mode = "auto") {
      this._overrideMode = mode;
      this.apply();
    },

    init() {
      this.apply();
      let timer = null;
      window.addEventListener("resize", () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => this.apply(), 80);
      });
      window.addEventListener("orientationchange", () => {
        this.apply();
      });
    }
  },
  labels: {
    backToMain: "← Main Site",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    themeButton: "Theme",
    themeAriaLabel: "Toggle dark mode",
    sidebarToggle: "Menu",
    sidebarAriaLabel: "Toggle sidebar",
    sidebarCloseAriaLabel: "Close sidebar"
  },
  sidebar: {
    isOpen: false,
    _panel: null,
    _backdrop: null,
    _toggles: [],

    _syncState() {
      if (this._panel) {
        this._panel.dataset.open = String(this.isOpen);
        this._panel.setAttribute("aria-hidden", String(!this.isOpen));
      }
      if (this._backdrop) {
        this._backdrop.dataset.open = String(this.isOpen);
      }
      this._toggles.forEach((btn) => {
        btn.setAttribute("aria-expanded", String(this.isOpen));
      });
      document.body.style.overflow = this.isOpen ? "hidden" : "";
    },

    open() {
      this.isOpen = true;
      this._syncState();
    },

    close() {
      this.isOpen = false;
      this._syncState();
    },

    toggle(force) {
      this.isOpen = typeof force === "boolean" ? force : !this.isOpen;
      this._syncState();
    },

    init({
      panelSelector = "[data-sidebar]",
      backdropSelector = "[data-sidebar-backdrop]",
      toggleSelector = "[data-sidebar-toggle]",
      closeSelector = "[data-sidebar-close]"
    } = {}) {
      this._panel = document.querySelector(panelSelector);
      this._backdrop = document.querySelector(backdropSelector);
      this._toggles = Array.from(document.querySelectorAll(toggleSelector));

      this._toggles.forEach((btn) => {
        if (!btn.textContent.trim()) {
          btn.textContent = SITE_CONFIG.labels.sidebarToggle;
        }
        if (!btn.getAttribute("aria-label")) {
          btn.setAttribute("aria-label", SITE_CONFIG.labels.sidebarAriaLabel);
        }
        btn.addEventListener("click", () => this.toggle());
      });

      document.querySelectorAll(closeSelector).forEach((btn) => {
        if (!btn.getAttribute("aria-label")) {
          btn.setAttribute("aria-label", SITE_CONFIG.labels.sidebarCloseAriaLabel);
        }
        btn.addEventListener("click", () => this.close());
      });

      if (this._backdrop) {
        this._backdrop.addEventListener("click", () => this.close());
      }

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && this.isOpen) {
          this.close();
        }
      });

      this._syncState();
    }
  },
  getPrefix() {
    const path = window.location.pathname;
    if (path.includes("/mongilsd/tools/calc")) return "../../../";
    if (path.includes("/mongilsd/tools")) return "../../";
    if (path.includes("/mongilsd")) return "../";
    return "./";
  },
  getLinks() {
    const prefix = this.getPrefix();
    return {
      home: `${prefix}`,
      about: `${prefix}#about`,
      highlights: `${prefix}#highlights`,
      mongil: `${prefix}mongilsd/`,
      tools: `${prefix}mongilsd/tools/`,
      calc: `${prefix}mongilsd/tools/calc/`
    };
  },
  initThemeToggle(buttonId = "themeToggle") {
    const toggleBtn = document.getElementById(buttonId);
    if (!toggleBtn) return;

    const root = document.documentElement;
    const storageKey = this.theme?.storageKey || "theme";
    toggleBtn.setAttribute("aria-label", this.labels.themeAriaLabel);

    function isDarkActive() {
      if (root.dataset.theme === "dark") return true;
      if (root.dataset.theme === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    const updateButtonLabel = () => {
      toggleBtn.textContent = isDarkActive()
        ? this.labels.lightMode
        : this.labels.darkMode;
    };

    toggleBtn.textContent = this.labels.themeButton;
    updateButtonLabel();

    toggleBtn.addEventListener("click", () => {
      const nextTheme = isDarkActive() ? "light" : "dark";
      root.dataset.theme = nextTheme;
      localStorage.setItem(storageKey, nextTheme);
      updateButtonLabel();
    });
  },
  initPage() {
    if (this.lang) {
      document.documentElement.lang = this.lang;
    }

    document.querySelectorAll("[data-main-site-name]").forEach((el) => {
      el.textContent = this.mainSiteName;
    });

    document.querySelectorAll("[data-mongil-site-name]").forEach((el) => {
      el.textContent = this.mongilSiteName;
    });

    document.querySelectorAll("[data-footer-text]").forEach((el) => {
      el.textContent = this.footerText;
    });

    if (typeof MONGIL_CONFIG !== "undefined") {
      document.querySelectorAll("[data-game-name]").forEach((el) => {
        if (MONGIL_CONFIG.gameName) el.textContent = MONGIL_CONFIG.gameName;
      });

      document.querySelectorAll("[data-mongil-subtitle]").forEach((el) => {
        if (MONGIL_CONFIG.subtitle) el.textContent = MONGIL_CONFIG.subtitle;
      });

      document.querySelectorAll("[data-back-to-main]").forEach((el) => {
        if (MONGIL_CONFIG.labels?.backToMain) el.textContent = MONGIL_CONFIG.labels.backToMain;
      });

      document.querySelectorAll("[data-back-to-mongil]").forEach((el) => {
        if (MONGIL_CONFIG.labels?.backToMongil) el.textContent = MONGIL_CONFIG.labels.backToMongil;
      });

      document.querySelectorAll("[data-back-to-tools]").forEach((el) => {
        if (MONGIL_CONFIG.labels?.backToTools) el.textContent = MONGIL_CONFIG.labels.backToTools;
      });

      document.querySelectorAll("[data-sidebar-title]").forEach((el) => {
        if (MONGIL_CONFIG.labels?.sidebarTitle) el.textContent = MONGIL_CONFIG.labels.sidebarTitle;
      });
    }

    const links = this.getLinks();
    document.querySelectorAll("[data-link]").forEach((el) => {
      const key = el.dataset.link;
      if (links[key]) {
        el.setAttribute("href", links[key]);
      }
    });

    this.viewport.init();
    this.sidebar.init();
    this.initThemeToggle();
  }
};