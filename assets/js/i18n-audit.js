/*
 * i18n-audit.js (开发辅助)
 * 纯前端运行：扫描
 *  1. DOM 中所有 [data-i18n] key
 *  2. 语言 JSON（通过 fetch assets/i18n/*.json）
 *  3. JS 代码里出现的 I18N.t('key') / "data-i18n=\"key\"" (可选简单 regex)
 * 输出：缺失 / 未使用 / 统计
 * 不影响生产功能：未自动执行，需要手动 I18NAudit.run()
 */
(function () {
    const I18NAudit = {
        config: {
            i18nDir: './assets/i18n/',
            pattern: /([a-z]{2}-[A-Z]{2})\.json$/,
            // 忽略无需翻译或动态生成的 key
            ignoreKeys: new Set([
                // 示例：'dynamic.someKey'
            ]),
            // 是否尝试扫描脚本里的硬编码 key (粗略)
            scanScripts: false
        },
        state: {
            langs: [],
            dicts: {},
            domKeys: new Set(),
            scriptKeys: new Set()
        },
        async run() {
            console.groupCollapsed('%ci18n audit start', 'color:#0b3d91;font-weight:600');
            await this.loadLangFiles();
            this.collectDomKeys();
            if (this.config.scanScripts) this.collectScriptKeys();
            this.report();
            console.groupEnd();
        },
        async loadLangFiles() {
            // 暂无文件系统索引，这里通过已知语言或 I18N.state / 推断
            const candidates = (window.I18N && I18N.state && I18N.state.lang) ? [
                'zh-CN', 'en-US', 'ja-JP'
            ] : ['zh-CN', 'en-US', 'ja-JP'];
            for (const lang of candidates) {
                try {
                    const res = await fetch(`${this.config.i18nDir}${lang}.json?audit=${Date.now()}`);
                    if (res.ok) {
                        this.state.dicts[lang] = await res.json();
                        this.state.langs.push(lang);
                    }
                } catch (e) {
                    console.warn('[i18n-audit] fetch fail', lang, e);
                }
            }
        },
        collectDomKeys() {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const k = el.getAttribute('data-i18n');
                if (k) this.state.domKeys.add(k);
            });
        },
        collectScriptKeys() {
            const re = /I18N\.t\(['\"]([^.][^'\"]+)['\"]\)/g; // 简易匹配
            Array.from(document.scripts).forEach(s => {
                try {
                    const text = s.textContent;
                    let m; while ((m = re.exec(text))) { this.state.scriptKeys.add(m[1]); }
                } catch (_) {/* ignore */ }
            });
        },
        report() {
            const { langs, dicts, domKeys, scriptKeys } = this.state;
            const allDictKeys = new Set();
            langs.forEach(l => Object.keys(dicts[l] || {}).forEach(k => allDictKeys.add(k)));
            const usedKeys = new Set([...domKeys, ...scriptKeys]);

            const missingPerLang = {}; // { lang: [key...] }
            const orphanPerLang = {};  // { lang: [key...] }
            langs.forEach(lang => { missingPerLang[lang] = []; orphanPerLang[lang] = []; });

            // 缺失：DOM/脚本出现，但某语言里没有
            usedKeys.forEach(key => {
                if (this.config.ignoreKeys.has(key)) return;
                langs.forEach(lang => {
                    if (!(dicts[lang] && Object.prototype.hasOwnProperty.call(dicts[lang], key))) {
                        missingPerLang[lang].push(key);
                    }
                });
            });

            // 未使用：语言文件有，但 DOM/脚本都没引用
            allDictKeys.forEach(key => {
                if (this.config.ignoreKeys.has(key)) return;
                if (!usedKeys.has(key)) {
                    langs.forEach(lang => {
                        if (dicts[lang] && Object.prototype.hasOwnProperty.call(dicts[lang], key)) {
                            orphanPerLang[lang].push(key);
                        }
                    });
                }
            });

            // 统计
            console.group('%ci18n stats', 'color:#ff6f1d');
            langs.forEach(l => {
                console.log(l, 'keys:', Object.keys(dicts[l] || {}).length);
            });
            console.groupEnd();

            console.group('%cMissing (per language)', 'color:#e1392d');
            langs.forEach(l => {
                if (missingPerLang[l].length) console.warn(l, missingPerLang[l]);
                else console.log(l, '✓ none');
            });
            console.groupEnd();

            console.group('%cUnused (orphan) keys', 'color:#0fa7c9');
            langs.forEach(l => {
                if (orphanPerLang[l].length) console.info(l, orphanPerLang[l]);
                else console.log(l, '✓ none');
            });
            console.groupEnd();

            // 额外提示：.html 结尾但无 < 或 > 可能不是富文本
            const suspicious = [...usedKeys].filter(k => k.endsWith('.html')).filter(k => {
                return langs.some(lang => {
                    const val = dicts[lang] && dicts[lang][k];
                    return typeof val === 'string' && !/[<>]/.test(val);
                });
            });
            if (suspicious.length) {
                console.group('%cPotential plain .html keys', 'color:#ffc843');
                console.log(suspicious);
                console.groupEnd();
            }

            console.log('%cAudit done', 'color:#0b3d91');
        }
    };

    window.I18NAudit = I18NAudit;
})();
