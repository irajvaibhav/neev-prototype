// Neev Employer Portal — scheduled report delivery + other settings-screen actions.
function saveReportSchedule(){
  const reportType=document.getElementById('setReportType').value;
  const frequency=document.getElementById('setReportFreq').value;
  const recipients=document.getElementById('setReportRecipients').value.trim();
  if(!recipients){ toast('Enter at least one recipient email'); return; }
  REPORT_SCHEDULE = { reportType, frequency, recipients };
  document.getElementById('reportScheduleStatus').textContent = reportType+' will be emailed '+frequency.toLowerCase()+' to '+recipients+'.';
  toast('Report schedule saved.');
  logAction('Scheduled '+reportType+' delivery ('+frequency+') to '+recipients);
}
