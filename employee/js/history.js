// Neev Employee App — repayment history / credit track (borrower badge, limit-increase progress).
function renderHistory(){
  const total = S.loans.length;
  const repaid = S.loans.filter(l=>l.status==='Repaid').length;
  const active = S.loans.filter(l=>l.status==='Active').length;
  document.getElementById('hist-total').textContent = total;
  document.getElementById('hist-ontime').textContent = repaid;
  document.getElementById('hist-active').textContent = active;
  document.getElementById('hist-subtext').textContent = repaid+' of '+total+' advances repaid on time';
  const badges = ['New borrower','Good borrower','Trusted borrower','Star borrower'];
  document.getElementById('hist-badge').textContent = badges[Math.min(repaid, 3)];
  const needed = Math.max(0, 3 - repaid);
  document.getElementById('hist-limitNote').textContent = needed > 0
    ? 'Repay '+needed+' more advance'+(needed>1?'s':'')+' on time to unlock 80% of accrued salary (currently 70%).'
    : '🎉 You have unlocked 80% salary advance limit! Great repayment record.';
  // update home note
  const homeHist = document.getElementById('homeHistNote');
  if(homeHist) homeHist.textContent = repaid > 0 ? repaid+' on-time repayments · '+needed+' more to unlock 80% limit' : 'Build your track record, unlock higher limits';
  // list
  const list = document.getElementById('historyList');
  const empty = document.getElementById('historyEmpty');
  list.innerHTML = '';
  if(S.loans.length === 0){ empty.style.display='flex'; return; }
  empty.style.display = 'none';
  S.loans.forEach(l=>{
    const div = document.createElement('div');
    div.className = 'loan-item';
    div.innerHTML = `<div class="row"><b style="font-size:13px;">${l.lan}</b><span class="badge ${l.status==='Repaid'?'repaid':'due'}">${l.status}</span></div>
    <div class="row" style="margin-top:6px;"><span class="muted" style="font-size:13px;">Amount</span><span>${fmt(l.amount)}</span></div>
    <div class="row" style="margin-top:4px;"><span class="muted" style="font-size:13px;">Due</span><span>${l.dueDate}</span></div>`;
    list.appendChild(div);
  });
}

function downloadStatement(){
  toast('Generating statement PDF… check your downloads.');
}
