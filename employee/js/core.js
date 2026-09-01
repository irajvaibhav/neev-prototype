// Neev Employee App — global state + helpers used across every screen.
const S = {
  voiceLang:'en', custId:5832, name:'Ramesh Kumar', company:null, ecn:'',
  salary:20000, daysInMonth:30, currentDay:15, payDay:30,
  bankName:null, bankLast4:null,
  t2eSigned:false, selectedTenure:2,
  loans:[], notifications:[], policies:[], investments:[], bbpsHistory:[],
  loyaltyPoints:0, pointsHistory:[],
  permissions:{}, dataPermissions:{}
};

function fmt(n){return '₹'+Math.round(n).toLocaleString('en-IN');}
function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');document.getElementById('appBody').scrollTop=0;saveAppState();}
function navTo(id){go(id);document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active',b.getAttribute('data-target')===id));}

// ===== RESUME WHERE YOU LEFT OFF (survives a page refresh) =====
// Only screens that are fully re-rendered from S on load are safe to resume on directly;
// mid-flow screens (checkout, loan detail, success pages…) fall back to a stable parent screen.
const RESTORABLE_SCREENS=['s-home','s-loans-hub','s-insurance','s-invest','s-bbps','s-ledger','s-history','s-profile','s-notifs','s-schemes','s-referral','s-loyalty','s-documents','s-grievance','s-company','s-request-company','s-login','s-signup','s-permissions','s-identity-verify','s-data-permissions','s-bank'];
function saveAppState(){
  try{
    const activeEl=document.querySelector('.screen.active');
    const bottomNavVisible=document.getElementById('bottomNav').style.display==='flex';
    localStorage.setItem('neev_employee_state',JSON.stringify({S:S,activeScreen:activeEl?activeEl.id:'s-splash',bottomNavVisible:bottomNavVisible}));
  }catch(e){}
}
function applyProfileFields(){
  if(S.name){
    document.getElementById('homeName').textContent=S.name.split(' ')[0];
    document.getElementById('profileName').textContent=S.name;
    document.getElementById('profileInitials').textContent=S.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  }
  if(S.pan) document.getElementById('profilePan').textContent=S.pan.slice(0,1)+'XXXX'+S.pan.slice(5);
  if(S.aadhaar) document.getElementById('profileAadhaar').textContent='XXXX XXXX '+S.aadhaar.replace(/\s/g,'').slice(-4);
  if(S.company){
    document.getElementById('companyNameHome').textContent=S.company;
    document.getElementById('profileCompany').textContent=S.company;
    document.getElementById('agreeCompany').textContent=S.company;
    document.getElementById('profileEcn').textContent=S.ecn;
    document.getElementById('profileVan').textContent='NEEV00'+S.custId+'01';
  }
  if(S.bankLast4) document.getElementById('profileBank').textContent=S.bankName+' ****'+S.bankLast4;
}
function restoreAppState(){
  try{
    const raw=localStorage.getItem('neev_employee_state');
    if(!raw) return false;
    const saved=JSON.parse(raw);
    Object.assign(S,saved.S);
    if(saved.bottomNavVisible) document.getElementById('bottomNav').style.display='flex';
    applyProfileFields();
    renderLoansHub();renderLedger();renderNotifs();renderLangList();renderHistory();renderDocuments();renderGrievances();
    renderPolicies();renderInvestments();renderBbpsHistory();renderLoyalty();renderSakhi();renderDataPermissions();renderPermissions();
    let target=saved.activeScreen;
    if(!RESTORABLE_SCREENS.includes(target)) target=saved.bottomNavVisible?'s-home':'s-splash';
    if(saved.bottomNavVisible) navTo(target); else go(target);
    return true;
  }catch(e){ return false; }
}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400);}
function showModal(){document.getElementById('supportModal').classList.add('show');}
function hideModal(){document.getElementById('supportModal').classList.remove('show');}
function openScheme(url){toast('Opening official website…');window.open(url,'_blank');}
function otpMove(el){if(el.value&&el.nextElementSibling&&el.nextElementSibling.classList.contains('otpd'))el.nextElementSibling.focus();}

function tickClock(){const d=new Date();let h=d.getHours()%12;if(h===0)h=12;document.getElementById('clock').textContent=h+':'+d.getMinutes().toString().padStart(2,'0');}
