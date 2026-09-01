// Neev Employee App — returning-user login (mobile OTP; face/fingerprint handlers are inline in the markup).
// Bank setup now happens during signup, so a successful login goes straight to the Home screen.
function completeLogin(){
  document.getElementById('bottomNav').style.display='flex';
  navTo('s-home');
}
// Ends the session and returns to the Log in screen. Doesn't wipe loan/points history —
// logging out shouldn't erase your account, same as any real app — completeLogin() picks
// right back up from wherever S already is.
function logoutEmployee(){
  document.getElementById('bottomNav').style.display='none';
  toast('You have been logged out');
  go('s-login');
}
function sendOtp(){
  const m=document.getElementById('mobileInput').value;
  if(m.length<10){toast('Enter a 10-digit mobile number');return;}
  document.getElementById('otpBlock').style.display='block';document.getElementById('sendOtpBtn').style.display='none';
  toast('OTP sent to '+m);
  let t=30;const el=document.getElementById('resendTimer');
  const iv=setInterval(()=>{t--;el.textContent=t;if(t<=0){clearInterval(iv);document.getElementById('resendTxt').innerHTML='<span style="color:var(--teal-700);font-weight:700;cursor:pointer;">Resend OTP</span>';}},1000);
}
