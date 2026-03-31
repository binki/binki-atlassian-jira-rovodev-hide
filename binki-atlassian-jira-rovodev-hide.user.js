// ==UserScript==
// @name binki-atlassian-jira-rovodev-hide
// @version 1.0.2
// @homepageURL https://github.com/binki/binki-atlassian-jira-rovodev-hide
// @match https://*.atlassian.net/*
// @require https://github.com/binki/binki-userscript-when-element-query-selector-async/raw/0a9c204bdc304a9e82f1c31d090fdfdf7b554930/binki-userscript-when-element-query-selector-async.js
// ==/UserScript==

(async () => {
  while (true) {
    const regionElementContainingRovoDev = await whenElementQuerySelectorAsync(document.body, 'div[role=region]:has(a[href^="/rovodev"]), div[role=region]:has(> div[data-testid="rovodev-agents-panel.rovodev-agent-panel"])');
    regionElementContainingRovoDev.parentElement.parentElement.remove();
  }
})();
