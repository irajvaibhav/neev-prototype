// Neev Employee App — employer selection, ECN verification, bank account setup.
function pickCompany(name,initial,color){
  S.company=name;
  document.getElementById('ev-name').textContent=name;
  document.getElementById('ev-logo').textContent=initial;
  document.getElementById('ev-logo').style.background=color;
  document.getElementById('ecnInput').value='';
  document.getElementById('ecnResult').style.display='none';
  document.getElementById('ecnBtn').disabled=false;document.getElementById('ecnBtn').textContent='Verify with employer';
  go('s-verify-ecn');
}
function verifyEcn(){
  const ecn=document.getElementById('ecnInput').value.trim();
  if(ecn.length<3){toast('Enter your ECN');return;}
  S.ecn=ecn;
  const btn=document.getElementById('ecnBtn');btn.disabled=true;btn.textContent="Checking with employer's HR system…";
  const box=document.getElementById('ecnResult');box.style.display='block';
  box.innerHTML='<div class="card center-col" style="padding:16px;"><div style="font-size:20px;">⏳</div><p class="muted" style="margin-top:6px;">Verifying '+ecn+' with '+S.company+'…</p></div>';
  setTimeout(()=>{
    box.innerHTML='<div class="card center-col" style="padding:16px;border-color:var(--success);"><div style="font-size:28px;">✅</div><b style="margin-top:8px;">Verified!</b><p class="muted" style="font-size:13px;margin-top:4px;">'+ecn+' is an active employee at '+S.company+'</p></div>';
    document.getElementById('companyNameHome').textContent=S.company;
    document.getElementById('profileCompany').textContent=S.company;
    document.getElementById('profileEcn').textContent=ecn;
    document.getElementById('agreeCompany').textContent=S.company;
    const van='NEEV00'+S.custId+'01';
    document.getElementById('profileVan').textContent=van;
    renderSakhi();
    setTimeout(()=>openLoansHub(),700);
  },1400);
}
function submitCompanyRequest(){
  const name=document.getElementById('reqCompName').value.trim();
  if(!name){toast('Enter your company name');return;}
  toast('Request sent! We will notify you when '+name+' is onboarded.');
  addNotification('Your request to add "'+name+'" has been received. Our team will contact them soon.',true);
  setTimeout(()=>go('s-company'),1000);
}

// ===== BANK =====
// Not part of signup — asked for the first time the user actually tries to move money
// (get a loan, buy insurance, invest, or pay a bill). requireBank() is the gate every
// one of those "final" actions calls through; after verification it resumes that action.
let pendingAfterBank=null;
function requireBank(next){
  if(S.bankLast4){next();return;}
  pendingAfterBank=next;
  toast('Add a bank account first — needed to send or receive money.');
  go('s-bank');
}
function verifyBank(){
  const acc=document.getElementById('accInput').value.trim();
  const ifsc=document.getElementById('ifscInput').value.trim();
  if(acc.length<8){toast('Enter a valid account number');return;}
  if(ifsc.length<11){toast('Enter a valid IFSC code');return;}
  const btn=document.getElementById('bankBtn');btn.disabled=true;btn.textContent='Sending Re.1 to verify…';
  const box=document.getElementById('bankResult');box.style.display='block';
  box.innerHTML='<div class="card center-col" style="padding:16px;"><div style="font-size:20px;">💸</div><p class="muted" style="margin-top:6px;">Penny drop: sending Re.1 to account ending '+acc.slice(-4)+'…</p></div>';
  setTimeout(()=>{
    S.bankLast4=acc.slice(-4);S.bankName=ifsc.substring(0,4).toUpperCase();
    box.innerHTML='<div class="card center-col" style="padding:16px;border-color:var(--success);"><div style="font-size:28px;">✅</div><b style="margin-top:8px;">Bank verified!</b><p class="muted" style="font-size:13px;margin-top:4px;">'+S.bankName+' account ending '+S.bankLast4+'</p></div>';
    document.getElementById('profileBank').textContent=S.bankName+' ****'+S.bankLast4;
    document.getElementById('successBank').textContent=S.bankName+' ****'+S.bankLast4;
    addNotification('Bank account verified. You can now receive money from Neev.',true);
    const next=pendingAfterBank;pendingAfterBank=null;
    setTimeout(()=>{next?next():go('s-home');},800);
  },1500);
}
