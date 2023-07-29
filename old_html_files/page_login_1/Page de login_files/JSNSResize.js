function WM_netscapeCssFix() {
  /*
	 Source: Webmonkey Code Library
	 (http://www.hotwired.com/webmonkey/javascript/code_library/)

	 Author: Taylor
	 Author Email: taylor@wired.com
	 Author URL: http://www.taylor.org/
	 */

  // This part was inspired by Matthew_Baird@wayfarer.com
  // It gets around another unfortunate bug whereby Netscape 
  // fires a resize event when the scrollbars pop up. This 
  // checks to make sure that the window's available size 
  // has actually changed.
  if (document.WM.WM_netscapeCssFix.initWindowWidth != window.innerWidth || document.WM.WM_netscapeCssFix.initWindowHeight != window.innerHeight) {
	 document.location = document.location;
  }
}

function WM_netscapeCssFixCheckIn() {
  // This function checks to make sure the version of Netscape 
  // in use contains the bug; if so, it records the window's 
  // width and height and sets all resize events to be handled 
  // by the WM_netscapeCssFix() function.
  if ((navigator.appName == 'Netscape') && (parseInt(navigator.appVersion) == 4)) {
	 if (typeof document.WM == 'undefined'){
		document.WM = new Object;
	 }
	 if (typeof document.WM.WM_scaleFont == 'undefined') {
		document.WM.WM_netscapeCssFix = new Object;
		document.WM.WM_netscapeCssFix.initWindowWidth = window.innerWidth;
		document.WM.WM_netscapeCssFix.initWindowHeight = window.innerHeight;
	 }
	 window.onresize = WM_netscapeCssFix;
  }
}

WM_netscapeCssFixCheckIn();