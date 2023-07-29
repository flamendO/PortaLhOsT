function isLeap(y) {
	return ( ((y%4==0)&(y%100!=0))|(y%400==0) );
}

function pad(chaine){
	return (chaine < 10 ? "0" + chaine : chaine);
}

function _formatDate(oDate){
	var retString = "";
	retString += pad(oDate.getDate());
	retString += "/";
	retString += pad(oDate.getMonth() + 1);
	retString += "/";
	retString += oDate.getFullYear();
	return retString;
}

/**
<doc:function date="2001-06-12">
	<doc:name>parseDate</doc:name>
	<doc:version>1.0</doc:version>
	<doc:return type="string" />
	<doc:args>
		<doc:arg name="date" type="string" default="''" optional="yes"></doc:arg>
		<doc:arg name="input-format" type="string" default="''" optional="no"></doc:arg>
		<doc:arg name="date-format" type="string" default="''" optional="yes"></doc:arg>
		<doc:arg name="context" type="document" default="null" optional="yes"></doc:arg>
	</doc:args>
</doc:function>
**/
function parseDate(date, inFormat, msgErreur){//0001
	var oDate;

	if (date != "") {
		if (inFormat == ""){
	
			if (oDate = _validDate(date, "elis:dateFormatNoSlashCourt")) {
				return _formatDate(oDate);
			}
	
			if (oDate = _validDate(date, "elis:dateFormatNoSlashLong")) {
				return _formatDate(oDate);
			}
	
			if (oDate = _validDate(date, "elis:dateFormatSlashCourt")) {
				return _formatDate(oDate);
			}
	
			if (oDate = _validDate(date, "elis:dateFormatSlashLong")) {
				return _formatDate(oDate);
			}
			
			return msgErreur;
		} else {
			if (oDate = _validDate(date, inFormat)) {
	       			return _formatDate(oDate);
	        	} else {
				return msgErreur;
			}
		}
	} else {
		return '';
	}
}


/**
Private functions.
**/
function _validDate(date, format){
	var parts;
	var oDate = new Date(-62135596800000); // Mon Jan 1 00:00:00 UTC 1

	switch(format){

		case "elis:dateFormatNoSlashCourt":	// Format : DDMMYY
			var re = new RegExp("^([0-9]{2})([0-9]{2})([0-9]{2})$");
			if (parts = re.exec(date)) {
				if (_validJour(parts[1], parts[2], 20 + parts[3])) {
					oDate.setFullYear(20 + parts[3], parts[2]-1, parts[1]);
					return oDate;
				}
			}
			break;
			
		case "elis:dateFormatNoSlashLong":	// Format : DDMMCCYY
			var re = new RegExp("^([0-9]{2})([0-9]{2})([0-9]{4})$");
			if (parts = re.exec(date)) {
				if (_validJour(parts[1], parts[2], parts[3])) {
					oDate.setFullYear(parts[3], parts[2]-1, parts[1]);
					return oDate;
				}
			}
			break;

		case "elis:dateFormatSlashCourt":	// Format : DD/MM/YY
			var re = new RegExp("^([0-9]{2})\/([0-9]{2})\/([0-9]{2})$");
			if (parts = re.exec(date)) {
				if (_validJour(parts[1], parts[2], 20 + parts[3])) {
					oDate.setFullYear(20 + parts[3], parts[2]-1, parts[1]);
					return oDate;
				}
			}
			break;

		case "elis:dateFormatSlashLong":	// Format : DD/MM/CCYY
			var re = new RegExp("^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$");
			if (parts = re.exec(date)) {
				if (_validJour(parts[1], parts[2], parts[3])) {
					oDate.setFullYear(parts[3], parts[2]-1, parts[1]);
					return oDate;
				}
			}
			break;
			
		default:
			break;
	}

	return false;
}


function _validJour(jour, mois, annee) {

	// Les jours et mois sont-ils à peu près valides ?
	if (jour <= 0 || jour > 31 || mois <= 0 || mois > 12) {
		return false;
	}

	if (mois <= 7 && mois % 2 == 0) {
		// Le jour le plus grand est 30 les mois pairs, sauf en février = 28 sauf années bisextilles = 29
		if (mois == 2) {
			if (isLeap(annee)) {
				return (jour > 29 ? false : true);
			} else {
				return (jour > 28 ? false : true);
			}
		} else {
			return (jour > 30 ? false : true);
		}
	} else if (mois > 7 && mois % 2 != 0) {
		// Le jour le plus grand est 30 en fin d'année (à partir d'août) pour les mois impairs
		return (jour > 30 ? false : true);
	} else {
		return true;
	}
}