// Neev Employee App — Investment: digital gold + small FDs ("Gullak"-style micro-savings).
const GOLD_RATE=6250; // ₹ per gram
function updateGoldPreview(){
  const amt=parseFloat(document.getElementById('goldAmount').value)||0;
  document.getElementById('goldGrams').textContent=(amt/GOLD_RATE).toFixed(3)+' g';
}
function buyGold(){
  const amt=parseFloat(document.getElementById('goldAmount').value)||0;
  if(amt<10){toast('Minimum ₹10 to buy gold');return;}
  const grams=amt/GOLD_RATE;
  S.investments.unshift({type:'Digital Gold',detail:grams.toFixed(3)+' g',amount:amt,date:'Today'});
  document.getElementById('inv-successTitle').textContent='Gold purchased!';
  document.getElementById('inv-successNote').textContent=grams.toFixed(3)+'g added to your gold locker.';
  addNotification('You bought '+grams.toFixed(3)+'g of digital gold for '+fmt(amt)+'.',true);
  addPoints(10,'Gold purchase');
  document.getElementById('goldAmount').value='';
  renderInvestments();
  go('s-invest-success');
}

let fdTenure=6;
function pickFdTenure(el,months){
  fdTenure=months;
  document.querySelectorAll('#s-invest-fd .tenure-pill').forEach(p=>p.classList.remove('selected'));
  el.classList.add('selected');updateFdPreview();
}
function updateFdPreview(){
  const amt=parseFloat(document.getElementById('fdAmount').value)||0;
  const maturity=amt*(1+0.07*fdTenure/12);
  document.getElementById('fdMaturity').textContent=fmt(maturity);
}
function createFd(){
  const amt=parseFloat(document.getElementById('fdAmount').value)||0;
  if(amt<100){toast('Minimum ₹100 to create an FD');return;}
  const maturity=amt*(1+0.07*fdTenure/12);
  S.investments.unshift({type:'Small FD',detail:fdTenure+' months @ 7% p.a.',amount:amt,date:'Today'});
  document.getElementById('inv-successTitle').textContent='FD created!';
  document.getElementById('inv-successNote').textContent=fmt(amt)+' locked for '+fdTenure+' months. Maturity value: '+fmt(maturity)+'.';
  addNotification('Your FD of '+fmt(amt)+' for '+fdTenure+' months has been created.',true);
  addPoints(10,'FD created');
  document.getElementById('fdAmount').value='';
  renderInvestments();
  go('s-invest-success');
}

function renderInvestments(){
  const list=document.getElementById('investList');
  const empty=document.getElementById('investEmpty');
  if(S.investments.length===0){list.innerHTML='';empty.style.display='flex';return;}
  empty.style.display='none';
  list.innerHTML='';
  S.investments.forEach(inv=>{
    list.innerHTML+=`<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;"><div><b style="font-size:14px;">${inv.type}</b><p class="muted" style="font-size:12px;margin-top:2px;">${inv.detail}</p></div><b style="font-size:14px;color:var(--teal-900);">${fmt(inv.amount)}</b></div></div>`;
  });
}
