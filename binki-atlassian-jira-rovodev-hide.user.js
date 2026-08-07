// ==UserScript==
// @name binki-atlassian-jira-rovodev-hide
// @version 1.0.4
// @homepageURL https://github.com/binki/binki-atlassian-jira-rovodev-hide
// @match https://*.atlassian.net/*
// @require https://github.com/binki/binki-userscript-when-element-changed-async/raw/refs/heads/master/binki-userscript-when-element-changed-async.js
// @require https://github.com/binki/binki-userscript-when-element-query-selector-async/raw/0a9c204bdc304a9e82f1c31d090fdfdf7b554930/binki-userscript-when-element-query-selector-async.js
// ==/UserScript==

// Remove the section which appears in the issue body area.
(async () => {
  while (true) {
    const regionElementContainingRovoDev = await whenElementQuerySelectorAsync(document.body, 'div[role=region]:has(a[href^="/rovodev"]), div[role=region]:has(> div[data-testid="rovodev-agents-panel.rovodev-agent-panel"]), div[data-testid="ai-agent-sessions.ui.disclaimer.container"], div[data-testid="issue-ai-agent-sessions.ui.rovo-dev-create-session-panel.container"]');
    regionElementContainingRovoDev.parentElement.parentElement.parentElement.remove();
  }
})();

// Remove the action buttons near the workflows and automation button. See #6.
(async () => {
  while (true) {
    const agentsButton = await whenElementQuerySelectorAsync(document.body, 'button[data-testid="ai-agents-button.button"]');
    const agentsContainer = agentsButton.parentElement;
    // There is no good selector for this, so I guess we have to be careful not to grab the automation one?
    const codingToolContainer = agentsContainer.nextElementSibling;
    if (!codingToolContainer.matches('[data-testid="issue.views.issue-base.foundation.status.actions-wrapper"]')) {
      agentsContainer.remove();
      codingToolContainer.remove();
    }
    // Wait for content to change before checking again. Otherwise, if our check for the coding tool button failed, we will busy loop.
    await whenElementChangedAsync(document.body);
  }
})();
