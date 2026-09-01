// Neev Employer Portal — VAN reconciliation tracker.
function renderRecon(){
  const withLoans = scopedEmps().filter(e=>e.loan&&e.loan.status==='Active');
  let html = `<table class="tbl"><thead><tr><th>VAN</th><th>Employee</th><th>Deduction expected</th><th>Amount received</th><th>Time</th><th>Status</th></tr></thead><tbody>`;
  withLoans.forEach(e=>{
    const principal = e.loan.net;
    const interest = e.loan.charge + e.loan.gst;
    const breakdown = `<div style="font-weight:600;">${fmt(e.loan.amount)}</div><div style="font-size:11px;color:var(--mu);font-weight:400;">Principal ${fmt(principal)} + Interest ${fmt(interest)}</div>`;
    html += `<tr><td class="van-mono" style="font-size:12px;">${e.loan.van}</td><td>${e.name}</td><td>${breakdown}</td><td>${breakdown}</td><td>2:34 PM</td><td><span class="badge badge-ok">Confirmed</span></td></tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('reconTable').innerHTML = html;
}
