const MONGIL_CONFIG = {
  gameName: "Mongil: Star Dive",
  subtitle: "Game database, guides & quick reference for Mongil: Star Dive.",
  hero: {
    badge: "Database Hub",
    title: "Mongil Database",
    description:
      "A clean starting hub for Mongil: Star Dive characters, monsterlings, artifacts, and starter guides."
  },
  labels: {
    backToMain: "← Main Site",
    backToMongil: "← Mongil Hub",
    backToTools: "← Tools Hub",
    sidebarTitle: "Mongil Hub",
    placeholderTag: "Planned"
  },
  sidebarLinks: [
    { label: "Overview", href: "./#overview" },
    { label: "Core Database", href: "./#database" },
    { label: "Guides & Notes", href: "./#guides" },
    { label: "Tools", href: "./tools/" },
    { label: "Calculator", href: "./tools/calc/" }
  ],
  sections: [
    {
      id: "database",
      title: "Core Database",
      description: "Foundational game reference entries—start simple and expand as you log data.",
      cards: [
        {
          title: "Characters & Roles",
          summary: "Playable cast overview, elements, roles, and party swap notes.",
          href: "#database",
          status: "Starter"
        },
        {
          title: "Monsterlings",
          summary: "Captured field companions, traits, and loadout pairings.",
          href: "#database",
          status: "Starter"
        },
        {
          title: "Artifacts & Gear",
          summary: "4-star and 5-star artifact sets, bonuses, and equipment notes.",
          href: "#database",
          status: "Starter"
        }
      ]
    },
    {
      id: "tools",
      title: "Tools & Calculators",
      description: "Basic utilities for planning and quick numbers.",
      cards: [
        {
          title: "All Tools",
          summary: "Overview page for Mongil: Star Dive tools and utilities.",
          href: "./tools/",
          status: "Subpage"
        },
        {
          title: "Calculator",
          summary: "Basic starter calculator page under Tools.",
          href: "./tools/calc/",
          status: "Basic"
        }
      ]
    },
    {
      id: "guides",
      title: "Guides & Quick Notes",
      description: "Early-game checklists and mechanics you want easy access to.",
      cards: [
        {
          title: "Beginner & Reroll Notes",
          summary: "Early progression priorities, stamina/keys, and starter tips.",
          href: "#guides",
          status: "Notes"
        },
        {
          title: "Team & Party Comps",
          summary: "3-hero switching synergies and basic rotation ideas.",
          href: "#guides",
          status: "Notes"
        },
        {
          title: "Patch & Event Log",
          summary: "Track banners, events, and database updates over time.",
          href: "#guides",
          status: "Log"
        }
      ]
    }
  ]
};