/* md.js — Lightweight markdown-to-HTML for document overlay
   Supports: headings, bold, italic, inline code, links, paragraphs,
   lists (ul/ol/checklist), code blocks, tables, blockquotes, horizontal rules */
(function () {
    function parse(md) {
        if (!md) return { title: '', html: '' };
        const lines = md.split('\n');
        const out = [];
        let inList = false, listType = '';
        let inCode = false, codeLang = '', codeLines = [];
        let inQuote = false, quoteLines = [];
        let inTable = false, tableRows = [];
        let title = '';

        function closeList() {
            if (!inList) return;
            out.push(listType === 'ul' || listType === 'check' ? '</ul>' : '</ol>');
            inList = false; listType = '';
        }

        function closeQuote() {
            if (!inQuote) return;
            out.push('<blockquote>' + quoteLines.map(l => '<p>' + inline(l) + '</p>').join('\n') + '</blockquote>');
            quoteLines = []; inQuote = false;
        }

        function closeTable() {
            if (!inTable) return;
            let html = '<div class="table-wrap"><table>';
            tableRows.forEach(function (row, idx) {
                const tag = idx === 0 ? 'th' : 'td';
                const wrap = idx === 0 ? '<thead>' : (idx === 1 ? '<tbody>' : '');
                const cells = row.split('|').filter(function (c, ci, arr) { return ci > 0 && ci < arr.length - 1; });
                html += wrap + '<tr>' + cells.map(function (c) { return '<' + tag + '>' + inline(c.trim()) + '</' + tag + '>'; }).join('') + '</tr>';
                if (idx === 0) html += '</thead>';
            });
            html += '</tbody></table></div>';
            out.push(html);
            tableRows = []; inTable = false;
        }

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];

            // Code block fence
            var fenceMatch = line.match(/^```(\w*)$/);
            if (fenceMatch) {
                if (!inCode) {
                    closeList(); closeQuote(); closeTable();
                    inCode = true; codeLang = fenceMatch[1]; codeLines = [];
                } else {
                    var escaped = codeLines.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    out.push('<pre class="code-block' + (codeLang ? ' lang-' + codeLang : '') + '">'
                        + (codeLang ? '<span class="code-lang">' + codeLang + '</span>' : '')
                        + '<code>' + escaped + '</code></pre>');
                    inCode = false; codeLang = ''; codeLines = [];
                }
                continue;
            }
            if (inCode) { codeLines.push(line); continue; }

            // Horizontal rule
            if (/^(-{3,}|_{3,}|\*{3,})\s*$/.test(line)) {
                closeList(); closeQuote(); closeTable();
                out.push('<hr>');
                continue;
            }

            // Table row
            if (line.trim().match(/^\|.*\|$/)) {
                closeList(); closeQuote();
                // Skip separator row (| --- | --- |)
                if (/^\|\s*[-:]+[-| :]*\|$/.test(line.trim())) { continue; }
                if (!inTable) inTable = true;
                tableRows.push(line);
                continue;
            }
            if (inTable) closeTable();

            // Blockquote
            var quoteMatch = line.match(/^>\s?(.*)$/);
            if (quoteMatch) {
                closeList(); closeTable();
                inQuote = true;
                if (quoteMatch[1].trim()) quoteLines.push(quoteMatch[1]);
                continue;
            }
            if (inQuote) closeQuote();

            // Heading # ~ ######
            var hMatch = line.match(/^(#{1,6})\s+(.+)$/);
            if (hMatch) {
                closeList();
                var lvl = hMatch[1].length;
                out.push('<h' + lvl + '>' + inline(hMatch[2]) + '</h' + lvl + '>');
                continue;
            }

            // Checklist
            var checkMatch = line.match(/^[-*]\s+\[([ xX])\]\s+(.+)$/);
            if (checkMatch) {
                if (!inList || listType !== 'check') {
                    closeList();
                    out.push('<ul class="checklist">'); inList = true; listType = 'check';
                }
                var checked = checkMatch[1] !== ' ';
                out.push('<li class="check-item' + (checked ? ' checked' : '') + '">'
                    + '<span class="check-box">' + (checked ? '✓' : '') + '</span>'
                    + inline(checkMatch[2]) + '</li>');
                continue;
            }

            // Unordered list
            var ulMatch = line.match(/^[-*]\s+(.+)$/);
            if (ulMatch) {
                if (!inList || listType !== 'ul') {
                    closeList();
                    out.push('<ul>'); inList = true; listType = 'ul';
                }
                out.push('<li>' + inline(ulMatch[1]) + '</li>');
                continue;
            }

            // Ordered list
            var olMatch = line.match(/^\d+[.)]\s+(.+)$/);
            if (olMatch) {
                if (!inList || listType !== 'ol') {
                    closeList();
                    out.push('<ol>'); inList = true; listType = 'ol';
                }
                out.push('<li>' + inline(olMatch[1]) + '</li>');
                continue;
            }

            // Close list on non-list line
            closeList();

            // Blank line
            if (!line.trim()) continue;

            // Paragraph
            out.push('<p>' + inline(line) + '</p>');
        }

        closeList(); closeQuote(); closeTable();
        if (inCode) {
            var escaped = codeLines.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            out.push('<pre class="code-block"><code>' + escaped + '</code></pre>');
        }
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
        // Italic
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        // Inline code
        text = text.replace(/`(.+?)`/g, '<code>$1</code>');
        // Links [text](url)
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        return text;
    }

    async function fetchContent(path) {
        if (!path) return null;
        try {
            const res = await fetch('./' + path);
            if (!res.ok) return null;
            return await res.text();
        } catch (e) {
            return null;
        }
    }

    window.MD = { toHtml: mdToHtml, parse: parse, fetch: fetchContent };
})();
