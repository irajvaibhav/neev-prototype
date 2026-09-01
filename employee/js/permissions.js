// Neev Employee App — App Permissions (Step 2 of 8): one consolidated page with toggles for
// Camera/Location/SMS/Contacts, asked after PAN+Aadhaar+Photo, right before login. None of
// these are "Required" — declining one just degrades a feature (e.g. no camera means manual
// PAN/Aadhaar entry), so Continue is never blocked here.
const PERMISSIONS=[
  { key:'camera', icon:'📷', title:'Camera', desc:'Needed to scan your PAN, Aadhaar, and QR codes for bill payments.' },
  { key:'location', icon:'📍', title:'Location', desc:'Helps us verify your region and keep your account secure.' },
  { key:'sms', icon:'💬', title:'SMS', desc:"Lets us auto-fill the OTP so you don't have to type it yourself." },
  { key:'contacts', icon:'👥', title:'Contacts', desc:'Makes it easy to invite colleagues and earn referral rewards.' }
];
function startPermissions(){
  renderPermissions();
  go('s-permissions');
}
function renderPermissions(){
  const granted=PERMISSIONS.filter(p=>S.permissions[p.key]).length;
  document.getElementById('permGrantedCount').textContent=granted;
  document.getElementById('permCounterBar').style.width=(granted/PERMISSIONS.length*100)+'%';
  PERMISSIONS.forEach(p=>{
    document.getElementById('permToggle-'+p.key).classList.toggle('on',!!S.permissions[p.key]);
  });
  document.getElementById('permGrantAllBtn').textContent = granted===PERMISSIONS.length ? 'All permissions allowed ✓' : 'Allow All Permissions';
}
function togglePermission(key){
  S.permissions[key]=!S.permissions[key];
  renderPermissions();
}
function toggleAllPermissions(){
  const allOn=PERMISSIONS.every(p=>S.permissions[p.key]);
  PERMISSIONS.forEach(p=>S.permissions[p.key]=!allOn);
  renderPermissions();
}
function continueFromPermissions(){
  go('s-login');
}
