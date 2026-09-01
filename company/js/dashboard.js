// Neev Employer Portal — main dashboard screen.
function renderDashboard(){
  const emps = scopedEmps();
  const loansActive = emps.filter(e=>e.loan&&e.loan.status==='Active');
  const totalOut = loansActive.reduce((a,e)=>a+e.loan.amount,0);
  document.getElementById('d-empCount').textContent = emps.length;
  document.getElementById('d-loanCount').textContent = loansActive.length;
  document.getElementById('d-outstanding').textContent = fmt(totalOut);

  renderDashboardLoans();
  renderBranchHealth();
}

// Plain, non-technical view: every employee in scope, how much they've borrowed (if anything), and when it's due.
// Sorted with the biggest loans first so HR can spot the largest exposures at a glance.
function renderDashboardLoans(){
  const container=document.getElementById('dashLoanTable');
  if(!container) return;
  const emps = scopedEmps().slice().sort((a,b)=>{
    const av = a.loan && a.loan.status==='Active' ? a.loan.amount : -1;
    const bv = b.loan && b.loan.status==='Active' ? b.loan.amount : -1;
    return bv-av;
  });
  let html = `<table class="tbl"><thead><tr><th>Employee</th><th>Branch</th><th>Loan amount</th><th>Due date</th><th>Status</th></tr></thead><tbody>`;
  emps.forEach(e=>{
    if(e.loan && e.loan.status==='Active'){
      html += `<tr><td><b>${e.name}</b></td><td>${e.branch}</td><td style="font-weight:700;color:var(--t9);">${fmt(e.loan.amount)}</td><td>${e.loan.due}</td><td><span class="badge badge-active">Active loan</span></td></tr>`;
    } else {
      html += `<tr><td>${e.name}</td><td>${e.branch}</td><td style="color:var(--mu);">—</td><td>—</td><td><span class="badge badge-ok">No loan</span></td></tr>`;
    }
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}
function toggleDashLoanTable(){
  const table=document.getElementById('dashLoanTable');
  const btn=document.getElementById('dashLoanToggleBtn');
  const showing=table.style.display==='block';
  table.style.display = showing ? 'none' : 'block';
  btn.textContent = showing ? 'Show ▾' : 'Hide ▴';
}

// Branch health is restricted the same way as everything else — an Area Manager only ever sees their own branch.
function renderBranchHealth(){
  const container=document.getElementById('branchHealthList');
  if(!container) return;
  const branches = currentScope.role==='company' ? BRANCHES : [currentScope.branch];
  container.innerHTML='';
  branches.forEach(b=>{
    const s=branchStats(b);
    const hl=branchHealthLabel(s.avgScore);
    container.innerHTML += `<div class="detail-row"><span>${b} <span class="badge" style="background:${hl.color};color:#fff;margin-left:6px;">${hl.label}</span></span><b>${s.empCount} employees · ${s.activeLoanCount} active loans · ${fmt(s.outstanding)} outstanding · Avg score ${s.avgScore}</b></div>`;
  });
}
