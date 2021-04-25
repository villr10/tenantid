
//Gets the Tenant ID that the user wrote into the text box. 

window.onload = function(){ 
document.getElementById("checkPage").addEventListener("click", myFunction);
document.getElementById("checkTenant").addEventListener("click", checkTenantAPI);

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



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

function checkTenantAPI() {
  var DomainBox = document.getElementById("DomainBox").value;
  var xmlHttp = new XMLHttpRequest();
  var apiLink = "https://login.microsoftonline.com/"+DomainBox+"/.well-known/openid-configuration";
 
 try {
  xmlHttp.open( "GET", apiLink, false ); // false for synchronous request
  xmlHttp.send( null );
  var responseJson = JSON.parse(xmlHttp.responseText);
  var responseUnsanatized = responseJson.issuer
  var sanatizedResponse = responseUnsanatized.replaceAll("https://sts.windows.net","");
  fulllink = "https://partner.microsoft.com/commerce/customers"+sanatizedResponse+"subscriptions"
  document.getElementById("outputdomain").innerHTML = "Tenant ID for " + DomainBox + " has been copied into the clipboard: " + fulllink;
  document.getElementById("outputdivdomain").classList.remove('alert', 'alert-danger');
  document.getElementById("outputdivdomain").classList.add('alert', 'alert-success');
  copy(fulllink)
 }
 catch(err) {
	 document.getElementById("outputdomain").innerHTML = "There was an error finding this tenant. Make sure the domain is correct.";
	 document.getElementById("outputdivdomain").classList.add('alert', 'alert-danger');
 }
}
}
