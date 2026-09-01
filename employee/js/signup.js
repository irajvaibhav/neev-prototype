// Neev Employee App — sign up: mobile OTP, PAN capture/OCR, Aadhaar capture/OCR.
function sendSignupOtp(){
  const m=document.getElementById('signupMobileInput').value;
  if(m.length<10){toast('Enter a 10-digit mobile number');return;}
  document.getElementById('signupOtpBlock').style.display='block';document.getElementById('signupSendOtpBtn').style.display='none';
  toast('OTP sent to '+m);
  let t=30;const el=document.getElementById('signupResendTimer');
  const iv=setInterval(()=>{t--;el.textContent=t;if(t<=0){clearInterval(iv);document.getElementById('signupResendTxt').innerHTML='<span style="color:var(--teal-700);font-weight:700;cursor:pointer;">Resend OTP</span>';}},1000);
}

// ===== PAN =====
const PAN_SAMPLE={name:'Ramesh Kumar',pan:'ABCPK1234F',dob:'15/06/1994'};
function capturePan(){
  document.getElementById('panCaptureBlock').style.display='none';
  document.getElementById('panScanBlock').style.display='block';
  setTimeout(()=>{
    document.getElementById('panScanBlock').style.display='none';
    document.getElementById('panFormBlock').style.display='block';
    document.getElementById('panOcrNote').style.display='block';
    document.getElementById('panName').value=PAN_SAMPLE.name;
    document.getElementById('panNumber').value=PAN_SAMPLE.pan;
    document.getElementById('panDob').value=PAN_SAMPLE.dob;
  },1400);
}
function showPanManual(){
  document.getElementById('panCaptureBlock').style.display='none';
  document.getElementById('panFormBlock').style.display='block';
  document.getElementById('panOcrNote').style.display='none';
}
function confirmPan(){
  const name=document.getElementById('panName').value.trim();
  const pan=document.getElementById('panNumber').value.trim();
  if(!name){toast('Enter your full name');return;}
  if(pan.length<10){toast('Enter a valid PAN number');return;}
  S.name=name;S.pan=pan;
  toast('Verifying PAN with Income Tax database…');
  setTimeout(()=>go('s-signup-aadhaar'),900);
}

// ===== AADHAAR =====
const AADHAAR_SAMPLE={number:'1234 5678 9012',gender:'male',addr:'Najafgarh, Delhi'};
function captureAadhaar(){
  document.getElementById('aadhaarCaptureBlock').style.display='none';
  document.getElementById('aadhaarScanBlock').style.display='block';
  setTimeout(()=>{
    document.getElementById('aadhaarScanBlock').style.display='none';
    document.getElementById('aadhaarFormBlock').style.display='block';
    document.getElementById('aadhaarOcrNote').style.display='block';
    document.getElementById('aadhaarNumber').value=AADHAAR_SAMPLE.number;
    document.getElementById('aadhaarGender').value=AADHAAR_SAMPLE.gender;
    document.getElementById('aadhaarAddr').value=AADHAAR_SAMPLE.addr;
  },1400);
}
function showAadhaarManual(){
  document.getElementById('aadhaarCaptureBlock').style.display='none';
  document.getElementById('aadhaarFormBlock').style.display='block';
  document.getElementById('aadhaarOcrNote').style.display='none';
}
function confirmAadhaar(){
  const aadhaar=document.getElementById('aadhaarNumber').value.trim();
  const addr=document.getElementById('aadhaarAddr').value.trim();
  if(aadhaar.replace(/\s/g,'').length<12){toast('Enter a valid Aadhaar number');return;}
  if(!addr){toast('Enter your address');return;}
  S.aadhaar=aadhaar;S.address=addr;S.gender=document.getElementById('aadhaarGender').value;
  toast('Verifying Aadhaar with UIDAI via DigiLocker…');
  document.getElementById('homeName').textContent=S.name.split(' ')[0];
  document.getElementById('profileName').textContent=S.name;
  document.getElementById('profileInitials').textContent=S.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  const maskedPan=S.pan.slice(0,1)+'XXXX'+S.pan.slice(5);
  document.getElementById('profilePan').textContent=maskedPan;
  const maskedAadhaar='XXXX XXXX '+aadhaar.replace(/\s/g,'').slice(-4);
  document.getElementById('profileAadhaar').textContent=maskedAadhaar;
  setTimeout(()=>go('s-login'),900);
}
