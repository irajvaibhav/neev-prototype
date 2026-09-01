// Neev Employer Portal — login + render-all bootstrap.
function toggleLoginBranch(){
  const role=document.querySelector('input[name="loginRole"]:checked').value;
  document.getElementById('loginBranchRow').style.display = role==='branch' ? 'block' : 'none';
}
function doLogin(){
  const cin = document.getElementById('loginCin').value.trim().toUpperCase();
  const pass = document.getElementById('loginPass').value;
  if(!cin){ toast('Enter your CIN number'); return; }
  if(!pass){ toast('Enter your password'); return; }
  let comp = Object.values(COMPANIES).find(c=>c.cin===cin) || REGISTERED_COMPANIES.find(c=>c.cin===cin);
  if(!comp){ toast('CIN not recognised. Check the number or register your company.'); return; }
  if(comp.password!==pass){ toast('Incorrect password'); return; }
  currentCompany = comp;

  const role = document.querySelector('input[name="loginRole"]:checked').value;
  const branch = role==='branch' ? document.getElementById('loginBranch').value : null;
  currentScope = { role:role, branch:branch };

  document.getElementById('loginWrap').style.display = 'none';
  document.getElementById('appWrap').style.display = 'block';
  document.getElementById('sbCompany').textContent = currentCompany.name;
  document.getElementById('sbScope').textContent = role==='branch' ? 'Area Manager · '+branch : 'Company Admin · all branches';
  document.getElementById('setCompanyName').textContent = currentCompany.name;

  const branchFilter=document.getElementById('empBranchFilter');
  if(branchFilter){
    if(role==='branch'){ branchFilter.value=branch; branchFilter.disabled=true; }
    else { branchFilter.disabled=false; }
  }
  document.getElementById('addEmpBtn').style.display = role==='company' ? 'inline-block' : 'none';
  document.getElementById('bulkUploadBtn').style.display = role==='company' ? 'inline-block' : 'none';
  renderAll();
  saveCompanyState();
}

function logout(){
  localStorage.removeItem('neev_company_state');
  location.reload();
}

function renderAll(){
  renderDashboard();renderVerify();renderEmployees();renderPayroll();renderSettlement();renderRecon();renderApprovals();renderAnalyticsChart();
}
