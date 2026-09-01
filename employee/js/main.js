// Neev Employee App — bootstrap. Loads last, after every other employee/js/*.js file, and
// kicks off the clock + first render pass + English-text indexing (needed for language switching).
// If a previous session left state in localStorage, resume there instead of starting over at splash.
tickClock();setInterval(tickClock,30000);
if(!restoreAppState()){
  renderLoansHub();renderLedger();renderNotifs();renderLangList();renderHistory();renderDocuments();renderGrievances();
  renderPolicies();renderInvestments();renderBbpsHistory();renderLoyalty();renderSakhi();
}
if(document.getElementById('s-splash').classList.contains('active')) openLangModal();
setTimeout(()=>indexTexts(),100);
