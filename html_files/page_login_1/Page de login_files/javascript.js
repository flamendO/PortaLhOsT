/**
 * struts-layout core javascript
 *
 * All rights reserved.
 */
// type checking functions

function checkValue(field, property, type, required) {

	if (field.value!="") {
	
		//document.images[property + "required"].src= imgsrc + "clearpixel.gif";
		if (type=="NUMBER" && !isNumber(field.value)) document.images[property + "required"].src= imgsrc + "ast.gif";
		if (type=="DATE" && !isDate(field.value)) document.images[property + "required"].src = imgsrc + "ast.gif";
		if (type=="EMAIL" && !isEmail(field.value)) document.images[property + "required"].src= imgsrc + "ast.gif";
	
	} else {	
		if (required) document.images[property + "required"].src= imgsrc + "ast.gif";
	}
}

// Return true if value is an e-mail address
function isEmail(value) {
	invalidChars = " /:,;";
	if (value=="") return false;
	
	for (i=0; i<invalidChars.length;i++) {
	   badChar = invalidChars.charAt(i);
	   if (value.indexOf(badChar,0) != -1) return false;
	}
	
	atPos = value.indexOf("@", 1);
	if (atPos == -1) return false;
	if (value.indexOf("@", atPos + 1) != -1) return false;
	
	periodPos = value.indexOf(".", atPos);
	if (periodPos == -1) return false;
	
	if (periodPos+3 > value.length) return false;

	return true;
}



// Return true if value is a number
function isNumber(value) {
	if (value=="") return false;

	var d = parseInt(value);
	if (!isNaN(d)) return true; else return false;		

}

// return true if value is a date
// ie in the format XX/YY/ZZ where XX YY and ZZ are numbers
function isDate(value) {
	if (value=="") return false;
	
	var pos = value.indexOf("/");
	if (pos == -1) return false;
	var d = parseInt(value.substring(0,pos));
	value = value.substring(pos+1, 999);
	pos = value.indexOf("/");
	if (pos==-1) return false;
	var m = parseInt(value.substring(0,pos));
	value = value.substring(pos+1, 999);
	var y = parseInt(value);	
	if (isNaN(d)) return false;	
	if (isNaN(m)) return false;	
	if (isNaN(y)) return false;	
	
	var type=navigator.appName;
	if (type=="Netscape") var lang = navigator.language;
	else var lang = navigator.userLanguage;
	lang = lang.substr(0,2);

	if (lang == "fr") var date = new Date(y, m-1, d);
	else var date = new Date(d, m-1, y);
	if (isNaN(date)) return false;	
	return true;
 }

// menu functions

function initMenu(menu) {
	if (getMenuCookie(menu)=="hide") {
		document.getElementById(menu).style.display="none";
	} else {
		document.getElementById(menu).style.display="";
	}
}

function changeMenu(menu) {
if (document.getElementById(menu).style.display=="none") {
	document.getElementById(menu).style.display="";
	element = document.getElementById(menu+"b");
	if (element != null) {
		document.getElementById(element).style.display="none";
	}
	setMenuCookie(menu,"show");
} else {
	document.getElementById(menu).style.display="none";
	element = document.getElementById(menu+"b");
	if (element != null) {	
		var width = document.getElementById(menu).offsetWidth;	
		if (navigator.vendor == ("Netscape6") || navigator.product == ("Gecko"))
			document.getElementById(menu+"b").style.width = width;	
		else 
			document.getElementById(menu+"b").width = width;
		document.getElementById(menu+"b").style.display="";
	}
	setMenuCookie(menu,"hide");
}
return false;
}

function setMenuCookie(name, state) {	
	if (name.indexOf("treeView")!=-1) {
		if (state=="show") {
			var cookie = getMenuCookie("treeView", "");
			if (cookie=="???") cookie = "_";
			cookie = cookie + name + "_";
			document.cookie = "treeView=" + escape(cookie);

		} else {
			var cookie = getMenuCookie("treeView", "");
			var begin = cookie.indexOf("_" + name + "_");
			if (cookie.length > begin + name.length + 2) {
				cookie = cookie.substring(0, begin+1) + cookie.substring(begin + 2 + name.length);
			} else {
				cookie = cookie.substring(0, begin+1);
			}		
			document.cookie = "treeView=" + escape(cookie);
		}
	} else {
		var cookie = name + "STRUTSMENU=" + escape(state);
		document.cookie = cookie;	
	}
}

function getMenuCookie(name, suffix) {
	if (suffix==null) {
		suffix = "STRUTSMENU";
	}
	var prefix = name + suffix + "=";
	var cookieStartIndex = document.cookie.indexOf(prefix);
	if (cookieStartIndex == -1) return "???";
	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
	return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

// sort functions
function arrayCompare(e1,e2) {
	return e1[0] < e2[0] ? -1 : (e1[0] == e2[0] ? 0 : 1);

}

var tables = new Array();
function arraySort(tableName, column, lineNumber, columnNumber) {
	var aTable = tables[tableName];
	var arrayToSort;
	var array;
	var reverse = 0;
	if (aTable) {
		array = aTable[0];
		arrayToSort = new Array(lineNumber);
		for (i=0;i<lineNumber;i++) {
			arrayToSort[i] = new Array(2);
			arrayToSort[i][0] = array[i][column];
			arrayToSort[i][1] = i;				
		}
		reverse = 1 - aTable[1];
		aTable[1] = reverse;
	} else {
		array = new Array(lineNumber);
		arrayToSort = new Array(lineNumber);
		for (i=0;i<lineNumber;i++) {	
			array[i] = new Array(columnNumber);
			for (j=0;j<columnNumber;j++) {
				obj = document.getElementById("t" + tableName + "l" + (i+1) +"c" + j);		
				array[i][j] = obj.innerHTML;
			}
			arrayToSort[i] = new Array(2);
			arrayToSort[i][0] = array[i][column];
			arrayToSort[i][1] = i;		
	
			aTable = new Array(2);
			aTable[0] = array;
			aTable[1] = 0;
			tables[tableName] = aTable;
		}
	}

	arrayToSort.sort(arrayCompare);
	if (reverse) {
		arrayToSort.reverse();
	}

	for (i=0;i<lineNumber;i++) {
		goodLine = arrayToSort[i][1];
		for (j=0;j<columnNumber;j++) {
			document.getElementById("t" + tableName + "l" + (i+1) +"c" + j).innerHTML = array[goodLine][j];
		}
	}
}

// calendar functions

var calformname;
var calformelement;

/**
 * Static code included one time in the page.
 *
 * a {text-decoration: none; color: #000000;}");
 * TD.CALENDRIER {background-color: #C2C2C2; font-weight: bold; text-align: center; font-size: 10px; }");
 *
 * bgColor => #000000, #C9252C, 
 */
function printCalendar(day1, day2, day3, day4, day5, day6, day7, month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12, day, month, year) {
	document.write('<div id="caltitre" style="z-index:10;">');	
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="253">');
//	document.write('<form>');
	document.write('<tr><td colspan="15" class="CALENDARBORDER"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td></tr>');
	document.write('<tr>');
	document.write('	<td class="CALENDARBORDER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=20></td>');
	document.write('	<td class="CALENDARTITLE" colspan="3" align="right"><img src="' + imgsrc + 'previous.gif" onclick="cal_before(' + day + ',' + month + ',' + year + ');"></td>');
	document.write('	<td colspan=7 align="center" class="CALENDARTITLE">');
	document.write('<select id="calmois" name="calmois" onchange="cal_chg(' + day +',' + month + ',' + year + ', this.options[this.selectedIndex].value);"><option value=0>...</option>');
	
	var str='';
	for(i=1;i<37;i++) {
		str+='<option value='+i+'>';
		monthIndex = (i-1)%12;
		switch (monthIndex) {
			case 0: str += month1; break;
			case 1: str += month2; break;
			case 2: str += month3; break;
			case 3: str += month4; break;
			case 4: str += month5; break;
			case 5: str += month6; break;
			case 6: str += month7; break;
			case 7: str += month8; break;
			case 8: str += month9; break;
			case 9: str += month10; break;
			case 10: str += month11; break;
			case 11: str += month12; break;
		}
		str+=' ' + (year + Math.floor((i-1)/12));
	}
	document.write(str);

	document.write('</select>');
	document.write('	</td>');
	document.write('	<td class="CALENDARTITLE" align="left" colspan="3"><img src="' + imgsrc + 'next.gif" onclick="cal_after(' + day + ',' + month + ',' + year + ');">&nbsp;&nbsp;<img src="' + imgsrc + 'close.gif" onclick="hideCalendar()"></td>');
	document.write('	<td class="CALENDARBORDER" width=1><img src="' + imgsrc + 'shim.gif" width="1" height="1"></td>');
	document.write('</tr>');
	document.write('<tr><td colspan=15 class="CALENDARBORDER"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td></tr>');
	document.write('<tr>');
	document.write('	<td class="CALENDARBORDER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>');
	document.write('	<td class="CALENDRIER" width="35">' + day1 + '</td>');
	document.write('	<td class="CALENDRIER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>');
	document.write('	<td class="CALENDRIER" width="35">' + day2 + '</td>');
	document.write('	<td class="CALENDRIER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>');
	document.write('	<td class="CALENDRIER" width="35">' + day3 + '</td>');
	document.write('	<td class="CALENDRIER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>');
	document.write('	<td class="CALENDRIER" width="35">' + day4 + '</td>');
	document.write('	<td class="CALENDRIER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>');
	document.write('	<td class="CALENDRIER" width="35">' + day5 + '</td>');
	document.write('	<td class="CALENDRIER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>');
	document.write('	<td class="CALENDRIER" width="35">' + day6 + '</td>');
	document.write('	<td class="CALENDRIER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>');
	document.write('	<td class="CALENDRIER" width="35">' + day7 + '</td>');
	document.write('	<td class="CALENDARBORDER" width="1"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>');
	document.write('</tr>');
	document.write('<tr><td colspan=15 class="CALENDARBORDER"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td></tr>');
//	document.write('</form>');
	document.write('</table>');
	document.write('</div>');
//	document.write('<div id="caljour" style="position:absolute; left:0px; top:45px; width:253; height:130; z-index:10;"></div>');
	document.write('<div id="caljour" style="z-index:10;"></div>');	
}

/**
 * Show the calendar
 */
function showCalendar(year, month, day, formName, formProperty, event) {
	if(document.all) {
		// IE.
		var ofy=document.body.scrollTop;
		var ofx=document.body.scrollLeft;
		document.all.slcalcod.style.left = event.clientX+ofx+10;
		document.all.slcalcod.style.top = event.clientY+ofy+10;
		document.all.slcalcod.style.visibility="visible";
		document.all.calmois.selectedIndex= month;
	} else if(document.layers) {
		// Netspace 4
		document.slcalcod.left = e.pageX+10;
		document.slcalcod.top = e.pageY+10;
		document.slcalcod.visibility="visible";
		document.slcalcod.document.caltitre.document.forms[0].calmois.selectedIndex=month;
	} else {
		// Mozilla
		var calendrier = document.getElementById("slcalcod");
		var ofy=document.body.scrollTop;
		var ofx=document.body.scrollLeft;
		calendrier.style.left = event.clientX+ofx+10;
		calendrier.style.top = event.clientY+ofy+10;
		calendrier.style.visibility="visible";
		document.getElementById("calmois").selectedIndex=month;
	}
	if (document.forms[formName].elements[formProperty].stlayout) {
		var lc_day = document.forms[formName].elements[formProperty].stlayout.day;
		var lc_month = document.forms[formName].elements[formProperty].stlayout.month;
		var lc_year = parseInt(document.forms[formName].elements[formProperty].stlayout.year);
		cal_chg(lc_day, lc_month, lc_year, lc_month);	
	} else {
		cal_chg(day, month, year, month);	
	}
	calformname = formName;
	calformelement = formProperty;
}

/**
 * Redraw the calendar for the current date and a selected month
 */
function cal_chg(day, month, year, newMonth){
	var str='',j;
	var lc_annee = year;
	lc_annee = year + Math.floor((newMonth-1)/12);	
	if (newMonth>12) newMonth = newMonth - 12;
	if (newMonth>12) newMonth = newMonth - 12;
	
	if(newMonth>0) {
	
		j=1;
		
		str+='<table cellpadding=0 cellspacing=0 border=0 width=253>\n';
		for(u=0;u<6;u++){
			str+='	<tr>\n';
			for(i=0;i<7;i++){
				ldt=new Date(lc_annee,newMonth-1,j);
				str+='		<td class="CALENDARBORDER" width=1><img src="' + imgsrc + 'shim.gif" width=1 height=20></td>\n';
				str+='		<td class="CALENDAR'; if(ldt.getDay()==i && ldt.getDate()==j && j==day && newMonth==month && lc_annee==year) str+='SELECTED'; else if(i==0 || i==6) str+='WEEKEND'; else str+='WEEK'; str+='" width="35" align="center">';
				if (ldt.getDay()==i && ldt.getDate()==j) {str+='<a class="CALENDRIER" href="javascript://" class="CALENDRIER" onmousedown="dtemaj(\'' + j + '\',\'' + newMonth + '\',\'' + lc_annee +'\');">'+j+'</a>'; j++;} else str+='&nbsp;';
				str+='</td>\n';
			}
			str+='		<td class="CALENDARBORDER" width=1><img src="' + imgsrc + 'shim.gif" width=1 height=1></td>\n';
			str+='	</tr>\n';
			str+='	<tr><td colspan=15 class="CALENDARBORDER"><img src="' + imgsrc + 'shim.gif" width=1 height=1></td></tr>\n';
		}
		str+='</table>\n';
	
	}
	
	if(document.all) document.all.caljour.innerHTML=str;
	if(document.layers) {obj=document.calendrier.document.caljour; obj.top=48; obj.document.write(str); obj.document.close();}
	if (!document.all && document.getElementById) document.getElementById("caljour").innerHTML = str;
}

/**
 * Display the previous month
 */
function cal_before(day, month, year) {
	var champ;
	if (document.all) champ = document.all.calmois;//document.all.calendrier.document.caltitre.form.calmois;
	if (document.layers) champ = document.calendrier.document.caltitre.document.form.calmois;
	if (!document.all && document.getElementById) champ = document.getElementById("calmois");
	if (champ.selectedIndex>1) champ.selectedIndex--;
	cal_chg(day, month, year, champ.options[champ.selectedIndex].value);
}

/**
 * Display the next month
 */
function cal_after(day, month, year) {
	// r?cup?ration de l'objet
	var champ;
	if (document.all) champ = document.all.calmois;//document.all.calendrier.form.calmois;
	if (document.layers) champ = document.calendrier.document.form.calmois;
	if (!document.all && document.getElementById) champ = document.getElementById("calmois");
	if (champ.selectedIndex<champ.options.length) champ.selectedIndex++;
	cal_chg(day, month, year, champ.options[champ.selectedIndex].value);
}

/**
 * Update the date in the input field and hide the calendar.
 * PENDING: find a way to make the format customable.
 */
function dtemaj(jour, mois, annee){

	// modifi? pour afficher 09/02/aaaa au lieu de 9/2/aaaa
	if (jour.length<2)
		jour = '0'+jour;
	if (mois.length<2)
		mois = '0'+mois;

	if (langue=='fr') {
		document.forms[calformname].elements[calformelement].value = jour + "/" + mois + "/" + annee;
	} else {
		document.forms[calformname].elements[calformelement].value = mois + "/" + jour + "/" + annee;
	}
	document.forms[calformname].elements[calformelement].stlayout = new Object();
	document.forms[calformname].elements[calformelement].stlayout.day = jour;
	document.forms[calformname].elements[calformelement].stlayout.month = mois;
	document.forms[calformname].elements[calformelement].stlayout.year = annee;
	hideCalendar();
}

function hideCalendar() {
	if(document.all) {
		// IE.
		document.all.slcalcod.style.visibility="hidden";
	} else if(document.layers) {
		// Netspace 4
		document.slcalcod.visibility="hidden";
	} else {
		// Mozilla
		var calendrier = document.getElementById("slcalcod");
		calendrier.style.visibility="hidden";
	}
}

/**
 * Tabs code.
 */

function onTabHeaderOver(tabGroupId, selectedTabId, enabledStyle) {
	element = document.getElementById("tabs" + tabGroupId + "head" + selectedTabId);

	if (element.className == enabledStyle) {
		element.style.cursor = "default";
	} else {
		element.style.cursor = "hand";
	}
}

/**
 * Treeview code
 */
function loadTree(url, tree) {
	element = document.getElementById("treeView" + url);
	element.innerHTML = tree;	
	element.style.display = "";
	element = document.getElementById("treeViewNode" + url);
	element.href = "javascript://";
	setMenuCookie("treeView" + url, "show")	
}

function changeTree(tree, image1, image2) {
	var image = document.getElementById("treeViewImage" + tree);
	if (image.src.indexOf(image1)!=-1) {
		image.src = image2;
	} else {
		image.src = image1;
	}

	if (document.getElementById("treeView" + tree).innerHTML == "") {
		return true;
	} else {
		changeMenu("treeView" + tree);
		return false;
	}
}

/**
 * Popup code
 */
function openpopup(form, popup, width, height, e) {
	var xx, yy;
	xx = e.screenX;
	yy = e.screenY;
	window.open('about:blank', 'popup', 'directories=0, location=0, menubar=0, status=0, toolbar=0, width=' + width + ', height=' + height + ', top=' + yy + ', left=' + xx); 	
	var action = form.action;
	var target = form.target;
	if (popup == null || popup == "") {
		popup = action;
	}
	form.target='popup';
	form.action = popup
	form.submit();
	form.target = target;
	form.action = action;
		
	return false;
}

function closepopup(form, openerField, popupField) {
	var inputField = form[popupField];
	var value;
	if (inputField.options) {
		value = inputField.options[form[popupField].selectedIndex].value;
	} else {
		for (i=0; i < form.elements.length; i++) {
			var element = form.elements[i];
			if (element.name == popupField && element.checked) {
				value = element.value;
				break;
			}
		}
	}
	window.opener.document.forms[0][openerField].value = value;
	window.close();
}

/**
 * form changes detect code
 */
function checkFormChange(link, text) {
  var ok = true;
  for (var form=0; form < document.forms.length; form++) {
    what = document.forms[form];
    for (var i=0, j=what.elements.length; i<j; i++) {

        if (what.elements[i].type == "checkbox" || what.elements[i].type == "radio") {
            if (what.elements[i].checked != what.elements[i].defaultChecked) {
		ok = false; break;
	    }
	} else if (what.elements[i].type == "text" || what.elements[i].type == "hidden" || what.elements[i].type == "password" || what.elements[i].type == "textarea") {
            if (what.elements[i].value != what.elements[i].defaultValue) {
		ok = false; break;
	    }
	} else if (what.elements[i].type == "select-one" || what.elements[i].type == "select-multiple") {
		for (var k=0, l=what.elements[i].options.length; k<l; k++) {
			if (what.elements[i].options[k].selected != what.elements[i].options[k].defaultSelected) {
				ok = false; break;
			}
		}
	} else if (what.elements[i].type == "submit") {
		break;	    
	} else {
		alert(what.elements[i].type);
	}
    }
  }
    if (ok) {	
	window.location.href = link;
	return;
    }
    if (confirm(text == null ? "Data will be lost. Continue ?" : text)) {
	window.location.href = link;
	return;
    }
}

// D?tecte le type de navigateur utilis?
function checkBrowser() {
	var ns4=document.layers
	var ie4=document.all
	var ns6=document.getElementById&&!document.all
	if (ns6) { 
	  // Navigateur Netscape 5 et plus et DOM-1.
	  return "ns6";
	} 
	else if (ns4) { 
	  // Navigateur Netscape 4.7 et moins. 
	  return "ns4";
	} 
	else if (ie4) { 
	  // Internet Explorer et Opera
  	  return "ie4";
	}
	return null;
}


/*
renvoie un URL sans les param?tres et le ?
url="http://localhost:8080/ElisV1/hs/porteursHs.do?dispatch=onInitialiser"
url_sans_param="http://localhost:8080/ElisV1/hs/porteursHs.do"
*/
function getURL_base(in_url) { 
	stopIndex = in_url.lastIndexOf("?"); 
	url_sans_param = in_url.substr(0, stopIndex); 
	return url_sans_param;
} 

// Popup pour connaitre les informations d'un centre
function openInfoCentreHs(in_id) {
	in_url = "infoCentreHs.do?dispatch=onInitialiser&codeExp=" + in_id;
	// window.document.URL="http://localhost:8080/ElisV1/hs/porteursHs.do?dispatch=onInitialiser"
	if (window.document.URL.indexOf("/hs/") != -1) {
		if (checkBrowser() == "ie4")
			out_url = in_url;
		else
			out_url = "hs/" + in_url;
	}
	else if (window.document.URL.indexOf("/administration/") != -1) {
		adminUrl = document.URL.substring(0,window.document.URL.indexOf("/administration/"));
		adminUrl = adminUrl+'/hs/'+in_url;
		out_url = adminUrl;
	// window.document.URL=http://localhost:8080/ElisV1/sort.do?layoutCollection=0&layoutCollectionProperty=codeExpCltPtl&layoutCollectionState=3
	}else {
		out_url = "hs/" + in_url;
	}

	w = 400;
	h = 210;
	fen = window.open(out_url, 'infoCentreHs', 'width=' + w + ',height=' + h +',location=no,status=no,toolbar=no,scrollbars=no');
	fen.focus();
}

// Popup pour connaitre les informations d'un client
function openInfoClientHs(in_rep, in_codeExp, in_codeClt) {
	in_url = "infoClientHs.do?dispatch=onInitialiser&replique=" + in_rep+ "&codeExp=" + in_codeExp + "&codeClt=" + in_codeClt;

	// window.document.URL="http://localhost:8080/ElisV1/hs/porteursHs.do?dispatch=onInitialiser"
	if (window.document.URL.indexOf("/hs/") != -1) {
		if (checkBrowser() == "ie4")
			out_url = in_url;
		else
			out_url = "hs/" + in_url;
	}else if (window.document.URL.indexOf("/administration/") != -1) {
		adminUrl = document.URL.substring(0,window.document.URL.indexOf("/administration/"));
		adminUrl = adminUrl+'/hs/'+in_url;
		out_url = adminUrl;
	// window.document.URL=http://localhost:8080/ElisV1/sort.do?layoutCollection=0&layoutCollectionProperty=codeExpCltPtl&layoutCollectionState=3
	}else {
		out_url = "hs/" + in_url;
	}

	w = 330;
	h = 170;
	fen = window.open(out_url, 'infoClientHs', 'width=' + w + ',height=' + h +',location=no,status=no,toolbar=no,scrollbars=no');
	fen.focus();
}

// Popup pour connaitre les informations d'un point de livraison
function openInfoPtlHs(in_rep, in_codeExp, in_codePtl) {
	in_url = "infoPtlHs.do?dispatch=onInitialiser&replique=" + in_rep+ "&codeExp=" + in_codeExp + "&codePtl=" + in_codePtl;

	// window.document.URL="http://localhost:8080/ElisV1/hs/porteursHs.do?dispatch=onInitialiser"
	if (window.document.URL.indexOf("/hs/") != -1) {
		if (checkBrowser() == "ie4")
			out_url = in_url;
		else
			out_url = "hs/" + in_url;
	}else if (window.document.URL.indexOf("/administration/") != -1) {
		adminUrl = document.URL.substring(0,window.document.URL.indexOf("/administration/"));
		adminUrl = adminUrl+'/hs/'+in_url;
		out_url = adminUrl;
	// window.document.URL=http://localhost:8080/ElisV1/sort.do?layoutCollection=0&layoutCollectionProperty=codeExpCltPtl&layoutCollectionState=3
	}else {
		out_url = "hs/" + in_url;
	}

	w = 350;
	h = 170;
	fen = window.open(out_url, 'infoPtlHs', 'width=' + w + ',height=' + h +',location=no,status=no,toolbar=no,scrollbars=no');
	fen.focus();
}


// Popup pour connaitre les mentions l?gales
function openInfoMentionsLegales(urlPage) {
	w = 750;
	h = 600;
	fen = window.open(urlPage, 'mentionsLegales' , 'width=' + w + ',height=' + h +',location=no,status=no,toolbar=no,scrollbars=yes,resizable=yes');
	fen.focus();
}

// ************
// Fontions HBE
// ************
function changeBgColorTable(table) {
	if(table.className == 'hbe') {
		table.className = 'hbeBgColor';
	} else if(table.className == 'hbeBgColor') {
		table.className = 'hbe';
	} else if(table.className == 'hbe_infopdl') {
		table.className = 'hbeBgColor_infopdl';
	}else if(table.className == 'hbeBgColor_infopdl') {
		table.className = 'hbe_infopdl';
	}
	
	
}


function openInfoBulle(infoBulleId, event, surcharge) {
	if (document.getElementById(infoBulleId)) {
		var infoBulle = document.getElementById(infoBulleId);
		infoBulle.className = 'infoBulleVisible';
		if(surcharge) {
			infoBulle.className = infoBulle.className + surcharge;
		}
		infoBulle.style.position = 'absolute';

		if (checkBrowser() == "ie4") {
			infoBulle.style.top = window.event.clientY + document.body.scrollTop + 2;
			infoBulle.style.left = window.event.clientX + 2;
		} else {
			infoBulle.style.top = event.pageY + 2;
			infoBulle.style.left = event.pageX + 2;
		}
	}
}

function openInfoBulleVT(infoBulleId, event) {
	openInfoBulle(infoBulleId, event, 'VT');
}

function closeInfoBulle(infoBulleId) {
	if (document.getElementById(infoBulleId)) {
		var infoBulle = document.getElementById(infoBulleId);
		//if(infoBulle.className == 'infoBulleVisible') {
		if(infoBulle.className.indexOf('infoBulleVisible') != -1) {
			infoBulle.className = 'infoBulleInvisible';
		}
	}
}

function changeColorLine(line) {
	if(line.className == 'ligneHbe1') {
		line.className = 'ligneHbe2';
	} else if(line.className == 'ligneHbe2') {
		line.className = 'ligneHbe1';
	} 
}

function mouseOutLignePtlHbe(line, centreInfoBulleId, ptlInfoBulleId) {
	changeColorLine(line);
	closeInfoBulle(centreInfoBulleId);
	closeInfoBulle(ptlInfoBulleId);
}

function afficheLienHbe(td) {
	td.className = 'lienHbe';
}
function afficheAideHbe(td) {
	td.className = 'aideHbe';
}
function cacheLienHbe(td) {
	td.className = '';
}

function afficheMasqueDetails(object) {
	if (document.getElementById(object)) {
		if(document.getElementById(object).style.display == 'block') {
			document.getElementById(object).style.display = 'none';
		} else {
			document.getElementById(object).style.display = 'block';
		}
	}
}