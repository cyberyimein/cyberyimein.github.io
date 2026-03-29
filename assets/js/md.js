/* md.js — Lightweight markdown-to-HTML for document overlay
   Supports: # title, ## headings, bold (**), links, paragraphs, lists (- / 1.)
   Extracts first H1 as document title separately. */
(function () {
    function parse(md) {
        if (!md) return { title: '', html: '' };
        const lines = md.split('\n');
        const out = [];
        let inList = false, listType = '';
        let title = '';

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // H1 — extract as title, skip from body
            const h1Match = line.match(/^#\s+(.+)$/);
            if (h1Match && !title) {
                title = h1Match[1].trim();
                continue;
            }

            // Heading ## / ### / ####
            const hMatch = line.match(/^(#{2,4})\s+(.+)$/);
            if (hMatch) {
                if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
                const lvl = hMatch[1].length;
                out.push('<h' + lvl + '>' + inline(hMatch[2]) + '</h' + lvl + '>');
                continue;
            }

            // Unordered list
            const ulMatch = line.match(/^[-*]\s+(.+)$/);
            if (ulMatch) {
                if (!inList || listType !== 'ul') {
                    if (inList) out.push(listType === 'ul' ? '</ul>' : '</ol>');
                    out.push('<ul>'); inList = true; listType = 'ul';
                }
                out.push('<li>' + inline(ulMatch[1]) + '</li>');
                continue;
            }

            // Ordered list
            const olMatch = line.match(/^\d+[.)]\s+(.+)$/);
            if (olMatch) {
                if (!inList || listType !== 'ol') {
                    if (inList) out.push(listType === 'ul' ? '</ul>' : '</ol>');
                    out.push('<ol>'); inList = true; listType = 'ol';
                }
                out.push('<li>' + inline(olMatch[1]) + '</li>');
                continue;
            }

            // Close list on blank or non-list line
            if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }

            // Blank line
            if (!line.trim()) continue;

            // Paragraph
            out.push('<p>' + inline(line) + '</p>');
        }

        if (inList) out.push(listType === 'ul' ? '</ul>' : '</ol>');
        return { title: title, html: out.join('\n') };
    }

    // Legacy compat: returns HTML only (no title extraction)
    function mdToHtml(md) {
        return parse(md).html;
    }

    function inline(text) {
        // Escape HTML
        text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // Bold
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Inline code
        text = text.replace(/`(.+?)`/g, '<code>$1</code>');
        // Links [text](url)
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        return text;
    }

    async function fetchContent(path) {
        if (!path) return null;
        try {
            const res = await fetch('./' + path + '?cb=' + Date.now());
            if (!res.ok) return null;
            return await res.text();
        } catch (e) {
            return null;
        }
    }

    window.MD = { toHtml: mdToHtml, parse: parse, fetch: fetchContent };
})();
