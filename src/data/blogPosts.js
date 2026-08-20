export const blogPosts = [
  {
    slug: "building-my-first-full-stack-dashboard",
    title: "What I learned building my first full-stack dashboard",
    excerpt:
      "A practical reflection on component structure, API boundaries, and the small decisions that improved the final product.",
    category: "Development",
    date: "Aug 12, 2026",
    isoDate: "2026-08-12",
    readTime: "6 min read",
    number: "01",
    accent: "blue",
    introduction:
      "My first dashboard looked simple in the design file: a sidebar, a handful of cards, and a table. Building it taught me that the interesting work lives in the connections between those pieces.",
    sections: [
      {
        heading: "Start with the information, not the components",
        paragraphs: [
          "I initially broke the interface into components based on what I could see: card, button, table, modal. That made the first screen quick to assemble, but it did not explain where data should live or how each part would change.",
          "The better approach was to list the questions the dashboard needed to answer. Once the information hierarchy was clear, the component boundaries followed naturally. Components that changed together stayed together; repeated visual patterns became shared building blocks.",
        ],
      },
      {
        heading: "Make the API boundary boring",
        paragraphs: [
          "UI components became much easier to reason about when they received predictable data. I added a small data layer that handled request states and transformed API responses before they reached the page.",
          "That layer kept loading, empty, and error states consistent. It also meant a backend field rename only needed one change instead of a search through every component that displayed the value.",
        ],
      },
      {
        heading: "Polish is mostly feedback",
        paragraphs: [
          "The final improvement was not a new feature. It was making every action feel acknowledged: buttons showed progress, filters preserved their state, empty tables explained what to do next, and errors appeared close to the action that caused them.",
          "A dashboard feels trustworthy when it clearly communicates what is happening. That lesson now shapes how I build every interface, long before I think about shadows or animation.",
        ],
      },
    ],
    takeaway:
      "Design the data flow first, keep API details at the edge, and treat feedback states as part of the feature—not cleanup work.",
  },
  {
    slug: "making-simple-interfaces-feel-intentional",
    title: "Making a simple interface feel more intentional",
    excerpt:
      "Spacing, hierarchy, colour, and feedback are often all a design needs to move from functional to polished.",
    category: "Design",
    date: "Aug 04, 2026",
    isoDate: "2026-08-04",
    readTime: "4 min read",
    number: "02",
    accent: "violet",
    introduction:
      "A polished interface does not need more decoration. It needs a clear point of view about what matters, what belongs together, and what should happen next.",
    sections: [
      {
        heading: "Use spacing to explain relationships",
        paragraphs: [
          "Consistent spacing creates an invisible structure. Elements that belong together should sit closer; separate ideas deserve more room. A small spacing scale makes those relationships repeatable across the whole product.",
          "When a layout feels vaguely wrong, I temporarily remove colour and borders. The remaining whitespace usually reveals whether the grouping makes sense on its own.",
        ],
      },
      {
        heading: "Give every screen a clear first read",
        paragraphs: [
          "Users should be able to glance at a screen and identify its purpose, its current state, and the primary action. Type size, weight, and contrast can establish that order without adding extra UI.",
          "I try to make one element dominant, a small group supportive, and everything else quiet. When every element asks for attention, none of them receive it.",
        ],
      },
      {
        heading: "Reserve colour for meaning",
        paragraphs: [
          "A restrained neutral palette gives purposeful colour more impact. Brand colour can guide action, while semantic colours can communicate success, warning, and error.",
          "The test is simple: if every blue element became grey, would the user lose useful information? If not, the colour may be decorative noise rather than a meaningful cue.",
        ],
      },
    ],
    takeaway:
      "A simple interface feels considered when spacing shows relationships, hierarchy guides attention, and colour carries meaning.",
  },
  {
    slug: "trace-an-api-request",
    title: "A beginner-friendly way to trace an API request",
    excerpt:
      "Follow one request from the button click to the database and back without getting lost between application layers.",
    category: "Learning",
    date: "Jul 28, 2026",
    isoDate: "2026-07-28",
    readTime: "8 min read",
    number: "03",
    accent: "emerald",
    introduction:
      "When a request fails, the full stack can feel like a maze. The most reliable way through it is to follow one value, one boundary at a time.",
    sections: [
      {
        heading: "Begin at the user action",
        paragraphs: [
          "Start with the event that creates the request: a form submission, a page load, or a button click. Confirm the handler runs and inspect the exact URL, method, headers, and body it sends.",
          "The browser network panel is the best first checkpoint. If the request never appears, the problem is still in the interface. If it appears, its status and response narrow the search immediately.",
        ],
      },
      {
        heading: "Walk through the server in order",
        paragraphs: [
          "On the server, trace the request through routing, middleware, validation, controller logic, and database access. Log a small request identifier and the essential values at each boundary instead of printing entire objects.",
          "Check your assumptions explicitly: did authentication attach a user, did validation transform a string, and did the query use the field you expected? Most bugs hide in one of those handoffs.",
        ],
      },
      {
        heading: "Trace the response home",
        paragraphs: [
          "A successful query is only the midpoint. Check how the result becomes a response, how the client parses it, and which state update triggers the final render.",
          "Write down the shape of the data at each boundary. Comparing those shapes often exposes the issue faster than reading a large file from top to bottom.",
        ],
      },
    ],
    takeaway:
      "Follow one value from the interaction to the database and back. At every boundary, verify what arrived and what left.",
  },
  {
    slug: "accessible-forms-that-feel-good",
    title: "Accessible forms that still feel delightful",
    excerpt:
      "Practical patterns for labels, validation, focus, and success states that make forms easier for everyone.",
    category: "Accessibility",
    date: "Jul 19, 2026",
    isoDate: "2026-07-19",
    readTime: "7 min read",
    number: "04",
    accent: "orange",
    introduction:
      "Accessibility and polish are not competing goals. The clearest, most responsive forms are usually the ones that work best for the widest range of people.",
    sections: [
      {
        heading: "Make every field understandable",
        paragraphs: [
          "Visible labels should describe the information a field expects. Placeholder text can provide an example, but it disappears as soon as typing begins and cannot replace a label.",
          "Help text belongs close to its field and should explain constraints before an error occurs. A short example is often more useful than a paragraph of instructions.",
        ],
      },
      {
        heading: "Treat errors as guidance",
        paragraphs: [
          "An error should say what happened and how to fix it. Connect the message to its input, move focus thoughtfully after submission, and do not rely on colour alone to signal a problem.",
          "Validation timing matters too. Immediate feedback suits obvious constraints, while more subjective checks are less disruptive after the user leaves the field or submits the form.",
        ],
      },
      {
        heading: "Finish the interaction clearly",
        paragraphs: [
          "Disable duplicate submissions, show progress without changing the button width, and announce the result. On success, explain what happened and what the user can do next.",
          "Keyboard navigation and a visible focus style complete the experience. They are small details that benefit power users as much as people using assistive technology.",
        ],
      },
    ],
    takeaway:
      "Clear labels, useful errors, predictable focus, and visible progress make forms both more accessible and more pleasant to use.",
  },
  {
    slug: "when-to-extract-react-component",
    title: "When should you extract a React component?",
    excerpt:
      "A practical test for deciding when repeated markup deserves an abstraction—and when it is clearer left alone.",
    category: "React",
    date: "Jul 08, 2026",
    isoDate: "2026-07-08",
    readTime: "5 min read",
    number: "05",
    accent: "cyan",
    introduction:
      "Component extraction is less about line count and more about creating a useful boundary. The right boundary gives an idea a name and makes change easier.",
    sections: [
      {
        heading: "Extract a complete idea",
        paragraphs: [
          "A section is a strong component candidate when it has a clear purpose you can describe without mentioning its HTML. Names like AccountSummary or SearchFilters communicate more than Wrapper or LeftColumn.",
          "If a proposed component needs a long list of tiny visual props, its boundary may be cutting through an idea rather than wrapping around one.",
        ],
      },
      {
        heading: "Repetition is a clue, not a rule",
        paragraphs: [
          "Two similar blocks do not automatically need one abstraction. First ask whether they are likely to change together. Coincidental similarity can produce a shared component full of exceptions.",
          "I prefer a little duplication until the shared pattern becomes clear. An abstraction based on evidence is easier to use than one based on a guess.",
        ],
      },
      {
        heading: "Keep local details local",
        paragraphs: [
          "Not every chunk of markup needs a file. A small component used by one page can live beside that page, keeping its context visible and reducing navigation through the codebase.",
          "Move it into a shared location only when another feature genuinely needs it. Folder structure should reflect how the product is used, not how reusable the code might become someday.",
        ],
      },
    ],
    takeaway:
      "Extract components around meaningful ideas and shared change, not arbitrary size or speculative reuse.",
  },
  {
    slug: "small-habits-better-pull-requests",
    title: "Small habits that make pull requests easier to review",
    excerpt:
      "How focused commits, useful context, and a quick self-review help teammates understand changes faster.",
    category: "Workflow",
    date: "Jun 26, 2026",
    isoDate: "2026-06-26",
    readTime: "5 min read",
    number: "06",
    accent: "rose",
    introduction:
      "A good pull request does more than contain correct code. It helps another person build an accurate mental model of the change with as little friction as possible.",
    sections: [
      {
        heading: "Keep the change coherent",
        paragraphs: [
          "A reviewable pull request has one clear goal. Unrelated cleanup and formatting inflate the diff and hide the decisions that deserve attention.",
          "When a large feature cannot be split vertically, a short sequence of focused commits can still show the path from preparation to behaviour and polish.",
        ],
      },
      {
        heading: "Explain decisions, not file changes",
        paragraphs: [
          "The diff already shows which files changed. The description is more valuable when it explains the problem, the chosen approach, the important trade-offs, and how the result was verified.",
          "Screenshots or a brief recording are especially helpful for visual changes. They let the reviewer understand the intended outcome before reading implementation details.",
        ],
      },
      {
        heading: "Review your own work first",
        paragraphs: [
          "Reading the final diff as a reviewer catches debug code, confusing names, accidental files, and missing states. It also reveals places where a small comment in the pull request can save someone else time.",
          "This final pass is not about perfection. It is a courtesy that makes collaboration faster and keeps review focused on the decisions that truly need another perspective.",
        ],
      },
    ],
    takeaway:
      "Keep the scope focused, explain the reasoning, show the result, and read the final diff before asking someone else to do it.",
  },
];

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
