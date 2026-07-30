# Experiment: Maintaining This Blog with Vibe Coding

This blog is a static personal-homepage experiment. I used Vibe Coding and Copilot CLI to generate and keep changing the site, while Markdown content files and JSON data files carry its multilingual projects and roadmap. The current conclusion is that an agent can participate in maintaining this kind of site when the renderer and data structures stay simple.

## Question

I wanted to test two questions: whether a coding agent could evolve a personal-homepage structure, and whether three-language articles, project cards, and roadmap entries could stay synchronized without introducing a full frontend framework.

## Method

The site uses static `index.html`, CSS, and JavaScript. The three language editions of projects and roadmap items live under `contents/`; `assets/data/projects.json` and `assets/data/roadmap.json` hold card and status data; and `assets/js/md.js` converts the Markdown constructs supported by the site into page content.

The renderer supports headings, paragraphs, bold, italic, inline code, links, lists, checklists, fenced code, tables, blockquotes, and horizontal rules. The existing i18n scripts switch languages instead of duplicating a page implementation for each locale.

## Result

The site can now render the homepage, project cards, roadmap, and three-language articles from one set of static resources. Article content can change independently, while project status and links are driven by JSON. This shows that the structure is sufficient for continued iteration on a personal homepage, but it does not show that an agent can maintain content reliably without review.

## Limitations

This is a personal site, not a general CMS. The Markdown parser implements only the syntax the site needs; complex HTML, footnotes, nested lists, and similar constructs are outside its support. Factual accuracy, semantic parity across languages, and metadata status still require human review.

## Subsequent impact

The experiment established a clear engineering boundary: page logic, article content, and project metadata are maintained separately. Future changes will preserve those boundaries and check all three language editions when an article or project status changes.
