export function tabForKey(tablist, key) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const current = tabs.indexOf(document.activeElement);
  if (current < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return null;
  const index = key === 'Home' ? 0 : key === 'End' ? tabs.length - 1
    : (current + (key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  return tabs[index];
}

export function selectTab(tablist, id) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  if (!tabs.some(tab => tab.id === id)) return;
  for (const tab of tabs) {
    const active = tab.id === id;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
}

export function initTabList(tablist) {
  if (!tablist) return;
  tablist.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (tab && tablist.contains(tab)) selectTab(tablist, tab.id);
  });
  tablist.addEventListener('keydown', event => {
    const tab = tabForKey(tablist, event.key);
    if (!tab) return;
    event.preventDefault();
    selectTab(tablist, tab.id);
    tab.focus();
  });
}
