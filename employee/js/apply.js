// Neev Employee App — get advance: amount + reason, cost breakdown, T2E agreement/quick confirm, success.
function openApply(){
  const elig=eligible();
  const slider=document.getElementById('applySlider');
  slider.max=Math.max(1000,elig);slider.min=1000;
  slider.value=Math.min(parseInt(slider.value),elig);
  document.getElementById('applyMaxLabel').textContent=fmt(elig);
  S.selectedTenure=Math.max(1,Math.round((S.payDay-S.currentDay)/7));
  document.getElementById('loanReason').value='';
  document.getElementById('loanReasonOtherRow').style.display='none';
  document.getElementById('loanReasonOther').value='';
  updateApply();go('s-apply');
}
function onReasonChange(){
  document.getElementById('loanReasonOtherRow').style.display=document.getElementById('loanReason').value==='other'?'block':'none';
}
// Service charge is a flat ₹15 per ₹1,000 per week (1.5%/week) regardless of amount or tenure,
// so the annualised rate is constant — shown so the cost is transparent before sanction (RBI KFS-style disclosure).
function effectiveAPR(){return Math.round(15/1000*100*52);}

function updateApply(){
  const amt=parseInt(document.getElementById('applySlider').value);
  const units=amt/1000;
  const weeks=S.selectedTenure;
  const charge=units*15*weeks;
  const gst=Math.round(charge*0.18);
  const net=amt-charge-gst;
  document.getElementById('applyAmtDisplay').textContent=fmt(amt);
  document.getElementById('bkAmount').textContent=fmt(amt);
  document.getElementById('bkRateLabel').textContent='₹15/1000 x '+weeks+' wk'+(weeks>1?'s':'');
  document.getElementById('bkCharge').textContent='-'+fmt(charge);
  document.getElementById('bkGst').textContent='-'+fmt(gst);
  document.getElementById('bkApr').textContent=effectiveAPR()+'% p.a.';
  document.getElementById('bkNet').textContent=fmt(net);
  checkLowBalance();
}
function goToConfirm(){
  const reasonSel=document.getElementById('loanReason').value;
  if(!reasonSel){toast('Please select a reason for the advance');return;}
  if(reasonSel==='other'&&!document.getElementById('loanReasonOther').value.trim()){toast('Please specify your reason');return;}
  const amt=parseInt(document.getElementById('applySlider').value);
  const units=amt/1000;const weeks=S.selectedTenure;
  const charge=units*15*weeks;const gst=Math.round(charge*0.18);const net=amt-charge-gst;
  document.getElementById('kfsAmount').textContent=fmt(amt);
  document.getElementById('kfsAmount2').textContent=fmt(amt);
  document.getElementById('kfsAmount3').textContent=amt.toLocaleString('en-IN');
  document.getElementById('kfsTenure').textContent=weeks+' week'+(weeks>1?'s':'');
  document.getElementById('kfsDueDate').textContent=S.payDay+'th Aug';
  document.getElementById('kfsCharge').textContent='-'+fmt(charge);
  document.getElementById('kfsGst').textContent='-'+fmt(gst);
  document.getElementById('kfsApr').textContent=effectiveAPR()+'% p.a.';
  document.getElementById('kfsNet').textContent=fmt(net);
  document.getElementById('kfsCompany').textContent=S.company||'your employer';
  go('s-kfs');
}
// Shown after the borrower accepts the Key Fact Statement — RBI requires the KFS before every
// sanction, so this runs regardless of whether it's a first-time (T2E) or repeat (OTP) borrower.
function acceptKfs(){
  const reasonSel=document.getElementById('loanReason').value;
  const reasonText=reasonSel==='other'?document.getElementById('loanReasonOther').value.trim():(REASON_LABELS[reasonSel]||'');
  const amt=parseInt(document.getElementById('applySlider').value);
  const units=amt/1000;const weeks=S.selectedTenure;
  const charge=units*15*weeks;const gst=Math.round(charge*0.18);const net=amt-charge-gst;
  if(S.t2eSigned){
    document.getElementById('qcNet').textContent=fmt(net);
    document.getElementById('qcDate').textContent=S.payDay+'th Aug';
    document.getElementById('qcReason').textContent=reasonText;
    document.getElementById('qcApr').textContent=effectiveAPR()+'% p.a.';
    toast('OTP sent to your mobile');
    go('s-quick-confirm');
  } else {
    document.getElementById('agreeNet').textContent=fmt(net);
    document.getElementById('agreeGross').textContent=fmt(amt);
    document.getElementById('agreeReason').textContent=reasonText;
    document.getElementById('agreeApr').textContent=effectiveAPR()+'% p.a.';
    go('s-agree');
  }
}
function checkAgree(){
  document.getElementById('confirmBtn').disabled=!(document.getElementById('signInput').value.trim().length>2&&document.getElementById('agreeCheck').checked);
}

const REASON_LABELS={medical:'Medical emergency',rent:'Rent / house expenses',family:'Family expenses',education:'Education / school fees',festival:'Festival / celebration'};
function confirmLoan(){
  const amt=parseInt(document.getElementById('applySlider').value);
  const units=amt/1000;const weeks=S.selectedTenure;
  const charge=units*15*weeks;const gst=Math.round(charge*0.18);const net=amt-charge-gst;
  const reasonSel=document.getElementById('loanReason').value;
  const reason=reasonSel==='other'?document.getElementById('loanReasonOther').value.trim():(REASON_LABELS[reasonSel]||'');
  S.t2eSigned=true;
  const loanNum=S.loans.length+1;
  const lan=S.custId+'0'+loanNum+'2026';
  const van='NEEV00'+S.custId+'0'+loanNum;
  const loan={lan:lan,van:van,amount:amt,charge:charge,gst:gst,net:net,tenure:weeks,reason:reason,date:'Today',dueDate:S.payDay+'th Aug',status:'Active'};
  S.loans.unshift(loan);
  document.getElementById('successAmt').textContent=fmt(net);
  document.getElementById('successLan').textContent=lan;
  document.getElementById('successCustId').textContent=String(S.custId);
  document.getElementById('successVan').textContent=van;
  addNotification('Advance of '+fmt(net)+' sent to '+S.bankName+' ****'+S.bankLast4+'. LAN: '+lan,true);
  addNotification('Reminder: '+fmt(amt)+' will be deducted from your salary on '+S.payDay+'th. Employer pays to VAN '+van+'.',false);
  addNotification('Your employer '+S.company+' has been notified about your advance and VAN.',false);
  addPoints(10,'Loan taken');
  renderLoansHub();renderLedger();renderHistory();renderDocuments();go('s-success');
}

// ===== LOW BALANCE WARNING =====
function checkLowBalance(){
  const amt = parseInt(document.getElementById('applySlider').value);
  const takehome = S.salary - outstanding() - amt;
  const warn = document.getElementById('lowBalanceWarn');
  const msg = document.getElementById('lowBalanceMsg');
  if(takehome < S.salary * 0.3){
    warn.style.display = 'block';
    msg.textContent = 'After this deduction, your take-home will be '+fmt(takehome)+'. That is less than 30% of your salary. Are you sure?';
  } else {
    warn.style.display = 'none';
  }
}
