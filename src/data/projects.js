export const portfolioProjects = [
  {
    slug: "clearqueue",
    title: "ClearQueue",
    category: "Full-stack platform",
    description:
      "A modern support-ticket workspace that helps teams organise, assign, and resolve requests.",
    summary:
      "ClearQueue brings incoming requests, team ownership, and customer context into one calm workspace so support teams can spend less time coordinating and more time solving.",
    stack: ["React", "Node.js", "MongoDB"],
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    metric: "48",
    metricLabel: "open tickets",
    number: "01",
    year: "2026",
    role: "Design & full-stack development",
    duration: "8 weeks",
    challenge:
      "Support requests arrived through several channels and were tracked in disconnected tools. Ownership was unclear, urgent work was easy to miss, and managers had no reliable view of team capacity.",
    approach:
      "I mapped the ticket lifecycle before designing the interface, then built the product around three fast actions: triage, assign, and resolve. A consistent data layer keeps filters, status changes, and activity updates predictable across the dashboard.",
    highlights: [
      "Saved filter views for repeat triage workflows",
      "Role-aware assignment and status controls",
      "Customer history shown alongside every request",
      "Responsive dashboard with complete empty and error states",
    ],
    outcomes: [
      { value: "32%", label: "faster first response" },
      { value: "1 view", label: "for team workload" },
      { value: "AA", label: "accessible UI target" },
    ],
  },
  {
    slug: "learning-library",
    title: "Learning Library",
    category: "Web application",
    description:
      "A digital library experience for discovering titles, managing loans, and tracking reading.",
    summary:
      "Learning Library makes a large catalogue feel approachable with thoughtful discovery, useful filters, and a personal shelf that keeps reading goals visible.",
    stack: ["Next.js", "Express", "Redux"],
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    metric: "1.2k",
    metricLabel: "books explored",
    number: "02",
    year: "2026",
    role: "Product design & frontend",
    duration: "6 weeks",
    challenge:
      "The original catalogue exposed plenty of information but offered little guidance. Readers struggled to narrow results, understand availability, or return to books they wanted to explore later.",
    approach:
      "I organised discovery around intent rather than database fields. Search, topic paths, and availability filters now work together, while a persistent personal shelf connects browsing to borrowing and progress.",
    highlights: [
      "Fast catalogue search with shareable filter states",
      "Clear availability and borrowing feedback",
      "Personal shelves for saved, current, and finished books",
      "Server-rendered discovery pages for resilient loading",
    ],
    outcomes: [
      { value: "1.2k", label: "titles indexed" },
      { value: "4 taps", label: "search to checkout" },
      { value: "100%", label: "keyboard navigable" },
    ],
  },
  {
    slug: "finance-flow",
    title: "Finance Flow",
    category: "Dashboard",
    description:
      "A clear personal-finance dashboard for recording expenses and understanding monthly habits.",
    summary:
      "Finance Flow turns everyday transactions into a readable monthly story, helping people understand spending patterns without making budgeting feel like accounting software.",
    stack: ["React", "Bootstrap", "REST API"],
    gradient: "from-orange-400 via-rose-500 to-pink-600",
    metric: "$4.8k",
    metricLabel: "monthly tracked",
    number: "03",
    year: "2025",
    role: "Frontend development",
    duration: "5 weeks",
    challenge:
      "Transaction lists made it possible to record spending but difficult to learn from it. Users needed a quicker way to see where money went and whether their current month was on track.",
    approach:
      "I designed a progressive dashboard that begins with one monthly answer, then reveals category and transaction detail as needed. Reusable chart and summary components keep the experience consistent at every screen size.",
    highlights: [
      "Monthly comparison and category breakdowns",
      "Quick-add transaction flow with smart defaults",
      "Flexible date, merchant, and category filters",
      "Readable charts with non-visual data alternatives",
    ],
    outcomes: [
      { value: "40%", label: "less entry time" },
      { value: "6", label: "clear budget signals" },
      { value: "0", label: "chart-only insights" },
    ],
  },
  {
    slug: "localplate",
    title: "LocalPlate",
    category: "Marketplace",
    description:
      "A local food marketplace connecting independent cooks with nearby customers and simple pickup.",
    summary:
      "LocalPlate helps home cooks publish weekly menus and gives neighbours a friendly way to discover, order, and collect food made nearby.",
    stack: ["Next.js", "PostgreSQL", "Stripe"],
    gradient: "from-amber-400 via-orange-500 to-red-500",
    metric: "18 min",
    metricLabel: "average pickup",
    number: "04",
    year: "2025",
    role: "Product design & full-stack development",
    duration: "10 weeks",
    challenge:
      "Independent cooks managed menus and orders through social messages. Customers could not reliably see availability, ingredients, pickup windows, or the status of an order.",
    approach:
      "The product was shaped around a weekly rhythm: cooks publish a small menu, customers reserve a pickup window, and both sides see the same order status. Clear capacity rules prevent overselling without complicated inventory tools.",
    highlights: [
      "Location-aware menu discovery",
      "Dietary and allergen information at decision points",
      "Capacity-aware checkout and pickup scheduling",
      "Simple cook dashboard for weekly operations",
    ],
    outcomes: [
      { value: "24", label: "local cooks onboarded" },
      { value: "18 min", label: "average pickup" },
      { value: "4.9/5", label: "order experience" },
    ],
  },
  {
    slug: "focusflow",
    title: "FocusFlow",
    category: "Productivity tool",
    description:
      "A distraction-light planning tool that turns a long task list into one achievable daily plan.",
    summary:
      "FocusFlow reduces planning overhead by helping people choose a small set of meaningful tasks, protect focus time, and close the day with a useful reflection.",
    stack: ["React", "Supabase", "Tailwind CSS"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    metric: "3.4h",
    metricLabel: "focus time saved",
    number: "05",
    year: "2025",
    role: "UX design & frontend",
    duration: "4 weeks",
    challenge:
      "Traditional task managers rewarded capturing more work, leaving users with large backlogs and no confident answer to the question: what should I do now?",
    approach:
      "I constrained the daily plan on purpose. A short prioritisation ritual, one active focus card, and a gentle end-of-day review keep attention on progress rather than backlog maintenance.",
    highlights: [
      "Three-priority daily planning ritual",
      "Distraction-free focus session with recovery states",
      "Lightweight weekly progress reflection",
      "Offline-friendly optimistic interactions",
    ],
    outcomes: [
      { value: "3.4h", label: "weekly time recovered" },
      { value: "71%", label: "daily plan completion" },
      { value: "3", label: "intentional priorities" },
    ],
  },
  {
    slug: "weatherwise",
    title: "Weatherwise",
    category: "Data experience",
    description:
      "A weather companion that translates complex forecasts into useful decisions for the day ahead.",
    summary:
      "Weatherwise prioritises the forecast details that affect real plans, from the best time for a run to changing rain and air-quality conditions.",
    stack: ["Next.js", "Weather API", "Mapbox"],
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    metric: "10 days",
    metricLabel: "forecast clarity",
    number: "06",
    year: "2024",
    role: "UI design & frontend",
    duration: "3 weeks",
    challenge:
      "Weather products displayed dense hourly data but left users to interpret what it meant for a commute, outdoor activity, or changing conditions across a day.",
    approach:
      "I grouped forecast data into decisions: what it feels like now, what changes next, and when conditions are best. Detailed charts remain available without competing with the immediate answer.",
    highlights: [
      "Plain-language daily forecast summary",
      "Activity windows based on changing conditions",
      "Location comparison and saved places",
      "Colour-safe precipitation and temperature charts",
    ],
    outcomes: [
      { value: "10 days", label: "forecast range" },
      { value: "12", label: "activity signals" },
      { value: "<1s", label: "cached place load" },
    ],
  },
];

export function getPortfolioProject(slug) {
  return portfolioProjects.find((project) => project.slug === slug);
}
