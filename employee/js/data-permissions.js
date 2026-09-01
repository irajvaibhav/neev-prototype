// Neev Employee App — Data Permissions (Step 2 of 8): one page, toggle-based consent for the
// data sources used to assess creditworthiness (credit bureau, bank statements, employer
// payroll, SMS income signals) — distinct from the earlier device permissions (camera/location/
// SMS access/contacts), which are about what the app can use on the phone, not what data
// Neev can pull for underwriting.
const DATA_PERM_KEYS=['creditBureau','bankStatement','payroll','smsIncome'];

function renderDataPermissions(){
  const granted=DATA_PERM_KEYS.filter(k=>S.dataPermissions[k]).length;
  document.getElementById('dpGrantedCount').textContent=granted;
  document.getElementById('dpCounterBar').style.width=(granted/DATA_PERM_KEYS.length*100)+'%';
  DATA_PERM_KEYS.forEach(k=>{
    document.getElementById('dpToggle-'+k).classList.toggle('on',!!S.dataPermissions[k]);
  });
  const allGranted=granted===DATA_PERM_KEYS.length;
  document.getElementById('dpContinueBtn').disabled=!allGranted;
  document.getElementById('dpGrantAllBtn').textContent=allGranted?'All permissions granted ✓':'Grant All Permissions';
}
function toggleDataPerm(key){
  S.dataPermissions[key]=!S.dataPermissions[key];
  renderDataPermissions();
}
function toggleAllDataPerms(){
  const allOn=DATA_PERM_KEYS.every(k=>S.dataPermissions[k]);
  DATA_PERM_KEYS.forEach(k=>S.dataPermissions[k]=!allOn);
  renderDataPermissions();
}
function continueFromDataPermissions(){
  toast('Data permissions saved. Verifying with credit bureau & Account Aggregator…');
  setTimeout(()=>go('s-login'),900);
}
