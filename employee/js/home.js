// Neev Employee App — Loans hub: employer verification gate, then earned-salary meter + eligibility.
// The generic Home screen (4-box grid) needs none of this — only the Loans vertical needs an employer.
function accrued(){return S.salary*S.currentDay/S.daysInMonth;}
function outstanding(){return S.loans.filter(l=>l.status==='Active').reduce((a,l)=>a+l.amount,0);}
function eligible(){return Math.max(0,Math.floor((accrued()*0.7 - outstanding())/1000)*1000);}

function openLoansHub(){renderLoansHub();go('s-loans-hub');}

function renderLoansHub(){
  const prompt=document.getElementById('loansVerifyPrompt');
  const dashboard=document.getElementById('loansDashboard');
  if(!S.company){
    prompt.style.display='block';
    dashboard.style.display='none';
    return;
  }
  prompt.style.display='none';
  dashboard.style.display='block';

  document.getElementById('meterAccrued').textContent=fmt(accrued());
  document.getElementById('meterDay').textContent=S.currentDay+'/'+S.daysInMonth;
  document.getElementById('meterFill').style.width=Math.round((S.currentDay/S.daysInMonth)*100)+'%';
  const elig=eligible();
  document.getElementById('eligibleAmt').textContent=fmt(elig);
  const activeLoan=S.loans.find(l=>l.status==='Active');
  if(activeLoan){
    document.getElementById('homeActiveLoan').style.display='block';
    document.getElementById('homeRepayAmt').textContent=fmt(activeLoan.amount);
    document.getElementById('homeRepayDate').textContent=activeLoan.dueDate;
  } else {document.getElementById('homeActiveLoan').style.display='none';}
  if(elig<=0){document.getElementById('homeEligibleCard').style.display='none';document.getElementById('homeNotEligible').style.display='block';}
  else{document.getElementById('homeEligibleCard').style.display='block';document.getElementById('homeNotEligible').style.display='none';}

  const totalDeduction=outstanding();
  const takehome=S.salary-totalDeduction;
  document.getElementById('loansPaydayLine').textContent = 'Next pay day: '+S.payDay+'th Aug'
    + (totalDeduction>0 ? ' · Take-home after deduction: '+fmt(takehome) : '');

  renderHistory();
}
