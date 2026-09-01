// Neev Employee App — permission requests asked one at a time, like a UPI app (camera, location, SMS, contacts).
const PERMISSIONS=[
  { icon:'📷', title:'Allow camera access', desc:'Needed to scan your PAN, Aadhaar, and QR codes for bill payments.', key:'camera' },
  { icon:'📍', title:'Allow location access', desc:'Helps us verify your region and keep your account secure.', key:'location' },
  { icon:'💬', title:'Allow SMS access', desc:"Lets us auto-fill the OTP so you don't have to type it yourself.", key:'sms' },
  { icon:'👥', title:'Allow contacts access', desc:'Makes it easy to invite colleagues and earn referral rewards.', key:'contacts' }
];
let permIndex=0;
function startPermissions(){
  permIndex=0;
  showPermission();
  go('s-permissions');
}
function showPermission(){
  const p=PERMISSIONS[permIndex];
  document.getElementById('permIcon').textContent=p.icon;
  document.getElementById('permTitle').textContent=p.title;
  document.getElementById('permDesc').textContent=p.desc;
  document.getElementById('permProgress').textContent=(permIndex+1)+' of '+PERMISSIONS.length;
}
function respondPermission(allowed){
  const p=PERMISSIONS[permIndex];
  S.permissions[p.key]=allowed;
  toast(allowed ? p.title.replace('Allow ','')+' allowed' : 'Skipped: '+p.title.replace('Allow ','').toLowerCase());
  permIndex++;
  if(permIndex<PERMISSIONS.length){ showPermission(); }
  else { go('s-signup'); }
}
