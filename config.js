const SITE_CONFIG = {
  lang: "en",
  mainSiteName: "Ratticus",
  mongilSiteName: "Mongil Database",
  footerText: "Built with HTML & CSS on Cloudflare.",
  theme: {
    storageKey: "theme"
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
