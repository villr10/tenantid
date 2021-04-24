
//Gets the Tenant ID that the user wrote into the text box. 

window.onload = function(){ 
document.getElementById("checkPage").addEventListener("click", myFunction);

function myFunction() {
  var textbox = document.getElementById("tid").value;
  var textboxsanatized = textbox.trim();
  var fulllink = "https://partner.microsoft.com/commerce/customers/"+textboxsanatized+"/subscriptions";
  var tenantId = textbox;
  document.getElementById("output").innerHTML = "Link has been copied into the clipboard: " + fulllink;
  copy(fulllink);
  document.getElementById("outputdiv").classList.add('alert', 'alert-success');
}

// Copies the tenant ID with the full link into the Clipboard
function copy(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
}