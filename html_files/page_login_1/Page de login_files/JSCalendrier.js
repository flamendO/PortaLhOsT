/*
 *Calendrier pour le site Elis Extranet
 */

var weekend = [0,6];
var gNow = new Date();
var ggWinCal;

// Année non-bisextile
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Année bisextile
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


/*********************************************************************************************
 * Fontion Calendar																			 *
 *********************************************************************************************/
function Calendar(p_bean, p_property, p_WinCal, p_month, p_year, p_format) {

	if ((p_month == null) && (p_year == null))	return;

	if (p_WinCal == null)	this.gWinCal = ggWinCal;
	else					this.gWinCal = p_WinCal;
	
	if (p_month == null) {	this.gMonthName = null;
							this.gMonth = null;
							this.gYearly = true;
	} else {				this.gMonthName = Calendar.get_month(p_month);
							this.gMonth = new Number(p_month);
							this.gYearly = false;
	}

	this.gYear = p_year;
	this.gFormat = p_format;
	this.gReturnBean = p_bean;
	this.gReturnProperty = p_property;
}


/*********************************************************************************************
 * Fontion Calendar_get_month																 *
 *********************************************************************************************/
function Calendar_get_month(monthNo) {
	return Calendar.Months[monthNo];
}


/*********************************************************************************************
 * Fontion Calendar_get_day																	 *
 *********************************************************************************************/
function Calendar_get_day(dayNo) {
	return Calendar.Days[dayNo];
}


/*********************************************************************************************
 * Fontion Calendar_get_daysofmonth															 *
 *********************************************************************************************/
function Calendar_get_daysofmonth(monthNo, p_year) {
	/* 
	Check for leap year ..
	1.Years evenly divisible by four are normally leap years, except for... 
	2.Years also evenly divisible by 100 are not leap years, except for... 
	3.Years also evenly divisible by 400 are leap years. 
	*/
	if ((p_year % 4) == 0) {
		if ((p_year % 100) == 0 && (p_year % 400) != 0) {
			return Calendar.DOMonth[monthNo];
		}
		
		return Calendar.lDOMonth[monthNo];

	} else {
		return Calendar.DOMonth[monthNo];
	}
}


/*********************************************************************************************
 * Fontion Calendar_calc_month_year															 *
 *********************************************************************************************/
function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();
	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {		ret_arr[0] = 11;
								ret_arr[1] = parseInt(p_Year) - 1;
		} else {				ret_arr[0] = parseInt(p_Month) - 1;
								ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {	ret_arr[0] = 0;
								ret_arr[1] = parseInt(p_Year) + 1;
		} else {				ret_arr[0] = parseInt(p_Month) + 1;
								ret_arr[1] = parseInt(p_Year);
		}
	}
	
	return ret_arr;
}


Calendar.get_month = Calendar_get_month;
Calendar.get_day = Calendar_get_day;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;


function Calendar_calc_month_year(p_Month, p_Year, incr)
{
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();
	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {		ret_arr[0] = 11;
								ret_arr[1] = parseInt(p_Year) - 1;
		} else {				ret_arr[0] = parseInt(p_Month) - 1;
								ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {	ret_arr[0] = 0;
								ret_arr[1] = parseInt(p_Year) + 1;
		} else {				ret_arr[0] = parseInt(p_Month) + 1;
								ret_arr[1] = parseInt(p_Year);
		}
	}
	
	return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function()
{
	var vCode = "";
	var vHeader_Code = "";
	var vData_Code = "";

//---[
var	g_av_header = "            <table width=\"280\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n";
	g_av_header+= "              <tr>\n";
	g_av_header+= "                <td width=\"11\" height=\"26\"><img src=\"images/calendrier/rno.gif\" width=\"11\" height=\"26\"></td>\n";
	g_av_header+= "                <td background=\"images/calendrier/tn.gif\">\n";
	g_av_header+= "                  <table width=\"260\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n";
var	g_ap_header = "                  </table>\n";
	g_ap_header+= "                </td>\n";
	g_ap_header+= "                <td width=\"11\"><img src=\"images/calendrier/rne.gif\" width=\"11\" height=\"26\"></td>\n";
	g_ap_header+= "              </tr>\n";
	g_ap_header+= "              <tr>\n";
	g_ap_header+= "                <td background=\"images/calendrier/to.gif\">&nbsp;</td>\n";
	g_ap_header+= "                <td>\n";
var	g_av_data =   "                  <table width=\"260\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n";
var	g_ap_data =   "                  </table>\n";
//---]

	vHeader_Code = this.cal_header();
	vData_Code = this.cal_data();
	vCode = g_av_header + vHeader_Code + g_ap_header + g_av_data + vData_Code + g_ap_data;
	
	return vCode;
}

Calendar.prototype.show = function() {
	var vCode = "";
	
	this.gWinCal.document.open();

//---[
	this.wwrite("<html>");
	this.wwrite("<head>");
	this.wwrite("	<title>" + CalendarTitle + "</title>");
	this.wwrite("	<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">");
	this.wwrite("	<base href=\"" + BaseHref + "\">");
	this.wwrite("</head>");
	this.wwrite("<style>");
	this.wwrite("	A         { color: #13007C; font-family: Arial, sans-serif; font-size: 11px; text-decoration: none; }");
	this.wwrite("	A:Visited { color: #13007C; font-family: Arial, sans-serif; font-size: 11px; text-decoration: none; }");
	this.wwrite("	A:Active  { color: #13007C; font-family: Arial, sans-serif; font-size: 11px; text-decoration: none; }");
	this.wwrite("	A:Hover   { color: #AAAAFF; font-family: Arial, sans-serif; font-size: 15px; text-decoration: underline; }");
	this.wwrite("	body      { color: #13007C; font-family: Arial, sans-serif; font-size: 13px; }");
	this.wwrite("	.bleu     { color: #13007C; font-family: Arial, sans-serif; font-size: 11px; }");
	this.wwrite("	.gris     { color: #CCCCCC; font-family: Arial, sans-serif; font-size: 11px; }");
	this.wwrite("	.rouge    { color: #FF0000; font-family: Arial, sans-serif; font-size: 15px; }");
	this.wwrite("</style>");
	this.wwrite("<script type=\"text/javascript\">");
	this.wwrite("	function unload() {");
	this.wwrite("		" + DoAfterClick);
	this.wwrite("	}");
	this.wwrite("</script>");

	this.wwrite("<body bgcolor=\"#FFFFFF\" leftmargin=\"0\" topmargin=\"0\" marginwidth=\"0\" marginheight=\"0\">");
	this.wwrite("<table width=\"300\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
	this.wwrite("  <tr>");
	this.wwrite("    <td width=\"10\" height=\"10\"><img src=\"images/calendrier/no.gif\" width=\"10\" height=\"10\"></td>");
	this.wwrite("    <td width=\"280\" height=\"10\"><img src=\"images/calendrier/no.gif\" width=\"280\" height=\"10\"></td>");
	this.wwrite("    <td width=\"10\" height=\"10\"><img src=\"images/calendrier/no.gif\" width=\"10\" height=\"10\"></td>");
	this.wwrite("  </tr>");
	this.wwrite("  <tr>");
	this.wwrite("    <td>&nbsp;</td>");
	this.wwrite("    <td><table width=\"280\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
	this.wwrite("        <tr> ");
	this.wwrite("          <td width=\"120\">" + this.gMonthName + " " + this.gYear + "</td>");
//---]

	// Les boutons de navigation
	var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
	var prevMM = prevMMYYYY[0];
	var prevYYYY = prevMMYYYY[1];

	var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
	var nextMM = nextMMYYYY[0];
	var nextYYYY = nextMMYYYY[1];

//---[
	this.wwrite("          <td align=\"right\">");
	this.wwrite("            <table width=\"150\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
	this.wwrite("              <tr>");
	this.wwrite("                <td>");
	this.wwrite("<A HREF=\"" + "javascript:window.opener.Build(" + "'" + this.gReturnBean + "', '" + this.gReturnProperty + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "'" + ");" + "\">");
	this.wwrite("                <img src=\"images/calendrier/bpp.gif\" width=\"30\" height=\"30\" border=\"0\"><\/A></td>");
	this.wwrite("                <td>");
	this.wwrite("<A HREF=\"" + "javascript:window.opener.Build(" + "'" + this.gReturnBean + "', '" + this.gReturnProperty + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +	");" + "\">");
	this.wwrite("                <img src=\"images/calendrier/bp.gif\" width=\"30\" height=\"30\" border=\"0\"><\/A></td>");
	this.wwrite("                <td>");
	this.wwrite("<A HREF=\"" + "javascript:window.opener.Build(" + "'" + this.gReturnBean + "', '" + this.gReturnProperty + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +	");" + "\">");
	this.wwrite("                <img src=\"images/calendrier/bn.gif\" width=\"30\" height=\"30\" border=\"0\"><\/A></td>");
	this.wwrite("                <td>");
	this.wwrite("<A HREF=\"" + "javascript:window.opener.Build(" + "'" + this.gReturnBean + "', '" + this.gReturnProperty + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "'" + ");" +	"\">");
	this.wwrite("                <img src=\"images/calendrier/bnn.gif\" width=\"30\" height=\"30\" border=\"0\"><\/A></td>");
	this.wwrite("              </tr>");
	this.wwrite("            </table>");
	this.wwrite("          </td>");
	this.wwrite("        </tr>");
	this.wwrite("        <tr> ");
	this.wwrite("          <td height=\"10\" colspan=\"2\"><img src=\"images/calendrier/no.gif\" width=\"280\" height=\"10\"></td>");
	this.wwrite("        </tr>");
	this.wwrite("        <tr>\n");
	this.wwrite("          <td colspan=\"2\">\n");
//---]

	// Insertion des jours du mois
	vCode = this.getMonthlyCalendarCode();
	this.wwrite(vCode);

//---[
	this.wwrite("</td>");
	this.wwrite("                <td background=\"images/calendrier/te.gif\">&nbsp;</td>");
	this.wwrite("              </tr>");
	this.wwrite("              <tr>");
	this.wwrite("                <td height=\"9\"><img src=\"images/calendrier/rso.gif\" width=\"11\" height=\"9\"></td>");
	this.wwrite("                <td height=\"9\"><img src=\"images/calendrier/ts.gif\" width=\"260\" height=\"9\"></td>");
	this.wwrite("                <td height=\"9\"><img src=\"images/calendrier/rse.gif\" width=\"11\" height=\"9\"></td>");
	this.wwrite("              </tr>");
	this.wwrite("            </table></td>");
	this.wwrite("        </tr>");
	this.wwrite("      </table></td>");
	this.wwrite("    <td>&nbsp;</td>");
	this.wwrite("  </tr>");
	this.wwrite("  <tr>");
	this.wwrite("    <td width=\"10\" height=\"10\"><img src=\"images/calendrier/no.gif\" width=\"10\" height=\"10\"></td>");
	this.wwrite("    <td width=\"280\" height=\"10\"><img src=\"images/calendrier/no.gif\" width=\"280\" height=\"10\"></td>");
	this.wwrite("    <td width=\"10\" height=\"10\"><img src=\"images/calendrier/no.gif\" width=\"10\" height=\"10\"></td>");
	this.wwrite("  </tr>");
	this.wwrite("</table>");
	this.wwrite("</body>");
	this.wwrite("</html>");
//---]

	this.gWinCal.document.close();
}

Calendar.prototype.wwrite = function(wtext)		{this.gWinCal.document.writeln(wtext);}

Calendar.prototype.cal_header = function()
{
	var vCode = "";

//---[
	vCode += "                    <TR>\n";
	vCode += "                      <TD WIDTH='15%' align=\"center\"><FONT class=\"bleu\">" + days[0] + "</FONT></TD>\n";
	vCode += "                      <TD WIDTH='15%' align=\"center\"><FONT class=\"bleu\">" + days[1] + "</FONT></TD>\n";
	vCode += "                      <TD WIDTH='15%' align=\"center\"><FONT class=\"bleu\">" + days[2] + "</FONT></TD>\n";
	vCode += "                      <TD WIDTH='15%' align=\"center\"><FONT class=\"bleu\">" + days[3] + "</FONT></TD>\n";
	vCode += "                      <TD WIDTH='15%' align=\"center\"><FONT class=\"bleu\">" + days[4] + "</FONT></TD>\n";
	vCode += "                      <TD WIDTH='15%' align=\"center\"><FONT class=\"bleu\">" + days[5] + "</FONT></TD>\n";
	vCode += "                      <TD WIDTH='15%' align=\"center\"><FONT class=\"bleu\">" + days[6] + "</FONT></TD>\n";
	vCode += "                    </TR>\n";
//---]

	return vCode;
}

Calendar.prototype.cal_data = function()
{
	var vDate = new Date();
	vDate.setDate(1);
	vDate.setMonth(this.gMonth);
	vDate.setFullYear(this.gYear);

	var vFirstDay=vDate.getDay();
	var vDay=1;
	var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
	var vOnLastDay=0;
	var vCode = "";

	// Les jours de la première semaine ne faisant pas parti du mois n'apparaissent pas
	vCode += "<TR>\n";
	for (i=0; i<vFirstDay; i++) vCode += "<TD WIDTH='15%' height='20'" + this.write_weekend_string(i) + "> </TD>\n";

	// La première semaine
	for (j=vFirstDay; j<7; j++)
	{
		vCode +=	"<TD WIDTH='15%' height='20'" + this.write_weekend_string(j) + " align=\"center\">\n" + 
					"<A HREF='#' " + "onClick=\"self.opener.document.forms['" + this.gReturnBean + "'].elements['" + this.gReturnProperty + "'].value='" + this.format_data(vDay) + "'; unload(); window.close();\">" + this.format_day(vDay) + "</A></TD>\n";
		vDay += 1;
	}
	vCode += "</TR>\n";

	// Les autres semaines
	for (k=2; k<7; k++)
	{
		vCode += "<TR>\n";

		for (j=0; j<7; j++)
		{
			vCode +=	"<TD WIDTH='15%' height='20'" + this.write_weekend_string(j) + " align=\"center\">\n" + 
						"<A HREF='javascript://' " + "onClick=\"self.opener.document.forms['" + this.gReturnBean + "'].elements['" + this.gReturnProperty + "'].value='" + this.format_data(vDay) + "'; unload(); window.close();\">" + this.format_day(vDay) + "</A></TD>\n";
			vDay += 1;

			if (vDay > vLastDay)
			{
				vOnLastDay = 1;
				break;
			}
		}

		if (j == 6)				vCode += "</TR>\n";
		if (vOnLastDay == 1)	break;
	}

	// Les jours de la dernière semaine ne faisant pas parti du mois apparaissent en gris
	for (m=1; m<(7-j); m++)
	vCode += "<TD WIDTH='15%' height='20'" + this.write_weekend_string(j+m) + " align=\"center\"><FONT class=\"gris\">" + m + "</FONT></TD>";

	return vCode;
}

Calendar.prototype.format_day = function(vday)
{
	var vNowDay = gNow.getDate();
	var vNowMonth = gNow.getMonth();
	var vNowYear = gNow.getFullYear();

	if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear)
			return ("<FONT class=\"rouge\"><B>" + vday + "</B></FONT>");
	else	return (vday);
}

Calendar.prototype.write_weekend_string = function(vday)
{
/*
	//Au cas où l'on veut mettre les colonnes du weekend en couleur
	for (var i=0; i<weekend.length; i++)
		if (vday == weekend[i])
		return (" BGCOLOR=\"#EEEEEE\"");
*/
	return "";
}

Calendar.prototype.format_data = function(p_day)
{
	var vData;
	var vMonth = 1 + this.gMonth;
	vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
	var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
	var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
	var vY4 = new String(this.gYear);
	var vY2 = new String(this.gYear.substr(2,2));
	var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;

	switch (this.gFormat)
	{
		case "MM\/DD\/YYYY" :		vData = vMonth + "\/" + vDD + "\/" + vY4;	break;
		case "MM\/DD\/YY" :			vData = vMonth + "\/" + vDD + "\/" + vY2;	break;
		case "MM-DD-YYYY" :			vData = vMonth + "-" + vDD + "-" + vY4;		break;
		case "MM-DD-YY" :			vData = vMonth + "-" + vDD + "-" + vY2;		break;
		case "DD\/MON\/YYYY" :		vData = vDD + "\/" + vMon + "\/" + vY4;		break;
		case "DD\/MON\/YY" :		vData = vDD + "\/" + vMon + "\/" + vY2;		break;
		case "DD-MON-YYYY" :		vData = vDD + "-" + vMon + "-" + vY4;		break;
		case "DD-MON-YY" :			vData = vDD + "-" + vMon + "-" + vY2;		break;
		case "DD\/MONTH\/YYYY" :	vData = vDD + "\/" + vFMon + "\/" + vY4;	break;
		case "DD\/MONTH\/YY" :		vData = vDD + "\/" + vFMon + "\/" + vY2;	break;
		case "DD-MONTH-YYYY" :		vData = vDD + "-" + vFMon + "-" + vY4;		break;
		case "DD-MONTH-YY" :		vData = vDD + "-" + vFMon + "-" + vY2;		break;
		case "DD\/MM\/YYYY" :		vData = vDD + "\/" + vMonth + "\/" + vY4;	break;
		case "DD\/MM\/YY" :			vData = vDD + "\/" + vMonth + "\/" + vY2;	break;
		case "DD-MM-YYYY" :			vData = vDD + "-" + vMonth + "-" + vY4;		break;
		case "DD-MM-YY" :			vData = vDD + "-" + vMonth + "-" + vY2;		break;
		default :					vData = vMonth + "\/" + vDD + "\/" + vY4;
	}

	return vData;
}

function Build(p_bean, p_property, p_month, p_year, p_format)
{
	var p_WinCal = ggWinCal;
	gCal = new Calendar(p_bean, p_property, p_WinCal, p_month, p_year, p_format);

	// Choose appropriate show function
	if (gCal.gYearly)	gCal.showY();
	else				gCal.show();
}



/*********************************************************************************************
 * Fontion show_calendar																	 *
 *																							 *
 *																							 *
 *********************************************************************************************/
function show_calendar(bean,
						property,
						event,
						sun, mon, tue, wed, thu, fri, sat,
						jan, feb, mar, apr, may, jun,
						jul, aug, sep, oct, nov, dec,
						now,
						day, month, year,
						format,
						title,
						basehref,
						doAfterClick)
{

	p_bean = bean;
	p_property = property;
	p_event = event;

	if (format == null)	p_format = "DD/MM/YYYY";
	else				p_format = format;

	if (title == null)	CalendarTitle = "Calendrier";
	else				CalendarTitle = title;

	BaseHref = basehref;
	
	if (doAfterClick == 'null') {
		DoAfterClick = '';
	} else {
		DoAfterClick = doAfterClick;
	}

	Calendar.Months = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
	days = [sun, mon, tue, wed, thu, fri, sat];

	if (now == '') {
		// date du jour si rien n'est spécifié
		initDate = new Date(year,month-1,day);
	} else {
		var parts;
		var re = new RegExp("^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$");
		if (parts = re.exec(now)) {
			initDate = new Date(parts[3], parts[2] - 1, parts[1]);
		} else {
			initDate = new Date(year,month-1,day);
		}
	}

	gNow = initDate;
	
	p_month = new String(gNow.getMonth());	
	p_year = new String(gNow.getFullYear().toString());

	var eventX = p_event.screenX;
	var eventY = p_event.screenY;
	
	// taille de la fenêtre
	var wlarg = 300;
	var whaut = 215;

	var left_popup = ((eventX > (screen.width - wlarg))	?	screen.width - (wlarg+100) :	eventX);
	var top_popup = ((eventY > (screen.height - whaut))	?	screen.height - (whaut+100) :	eventY);					
	
	vWinCal = window.open("", "Calendar", 
		"width="+wlarg+",height="+whaut+",status=no,dependant=yes,resizable=no,top=" + top_popup + ",left=" + left_popup);
	
	//YFL : ajout focus si fenetre deja ouverte
	vWinCal.focus();
	
	vWinCal.opener = self;
	ggWinCal = vWinCal;
	window.onbeforeunload = null;
	Build(p_bean, p_property, p_month, p_year, p_format);
}
