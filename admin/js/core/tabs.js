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
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(document.activeElement);
    if (current < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
      : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectTab(tablist, tabs[index].id);
    tabs[index].focus();
  });
}
