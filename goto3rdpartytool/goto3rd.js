
var coreURL = getOrigin();

// Provide the currently used Streamboxy Stage URL origin, if a custom domain is used, use the custom domains URL origin
// Streamboxy Core attaches the calling CoreURL (e.g. https://stage.streamboxy.com) as search param to your provided URL
function getOrigin() {
  var params = new URL(document.location).searchParams;
  var encodedOrigin = params.get("origin");
  var origin = decodeURIComponent(encodedOrigin);

  return origin;
}

var noticeEvent = {
  type: 0,
};

window.parent.postMessage(noticeEvent, coreURL);

window.addEventListener("message", (event) => {
  if (event.origin !== coreURL) {
    throw new Error("Will not process message by unknown origin.");
  }

  switch (event.data.type) {
    case 0: {
      break;
    }
    case 1: {
      // Apply new Styling
      // Access SessionStyle Object using event.data.data
      //    this._styleService.update(event.data.data);
      document.documentElement.style.setProperty(
        "--accent-color",
        `${event.data.data.accentColor}`
      );
      document.documentElement.style.setProperty(
        "--background-color",
        `${event.data.data.backgroundColor}`
      );
      document.documentElement.style.setProperty(
        "--text-color",
        `${event.data.data.textColor}`
      );
      document.documentElement.style.setProperty(
        "--canvas-color",
        `${event.data.data.canvasColor}`
      );

      if(event.data.data.textFontUrl || event.data.data.titleFontUrl){
        setFontsOnRoot(event.data.data.titleFontUrl, event.data.data.textFontUrl);
      }
      break;
    }
    case 2: {
      // Apply new Language
      // Access Language string using event.data.data
    
      break;
    }
    case 3: {
      // Apply new UserContext
      // Access UserContext Object using event.data.data
      //this._acs.changeRole(event?.data.data?.role);

      break;
    }
    case 4: {
      // Apply new SessionData
      // Access SessionData Object using event.data.data
      break;
    }
    default: {
      break;
    }
  }
});

let urlParams = new URLSearchParams(window.location.search);
let paramButtonTextBase64 = urlParams.get('buttontext');
console.log('buttonText', paramButtonTextBase64);
let paramButtonText = b64DecodeUnicode(paramButtonTextBase64);
console.log('buttonTextdecode', paramButtonText);


let buttontext = document.getElementById('buttontext');

if(paramButtonTextBase64 != null){
    buttontext.innerHTML = paramButtonText;
}
else {
    buttontext.innerHTML = 'ENTER'
}


function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

 function openQueryLinkInNewTab() {
    var urlParams = new URLSearchParams(window.location.search);
    var linkAsBase64 = urlParams.get('link');
    var link = atob(linkAsBase64);
    window.open(link, "_blank");
}

function setFontsOnRoot(title, text){
    const font = `
    @font-face {
      font-family: 'Standard';
      src: url('${text}') format('woff2');
      font-weight: 300;
    }
    @font-face {
      font-family: 'Standard';
      src: url('${title}') format('woff2');
      font-weight: 600,700,800,900;
    }`;
  
    const node = document.createElement('style');
    node.innerHTML = font;
    document.body.appendChild(node);
  };