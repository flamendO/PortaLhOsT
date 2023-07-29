/**
 * Fonction permettant l'ouverture d'une popup � partir d'une URL, d'un nom de popup dynamique
 * (nom interne), d'un champ pour r�initialisation du champ dans le formulaire
 * ayant donn� l'ordre d'ouverture du popup, ainsi que sa largeur et hauteur.
 *
 * @param url 		: l'URL de la page � afficher dans la popup.
 * @param popupName : nom dynamique interne de la popup.
 * @param champ 	: nom du champ dans le premier formulaire de la page � r�initialiser.
 * @param largeur	: largeur de la fen�tre.
 * @param hauteur 	: hauteur de la fen�tre.
 */
function openPopup(url, popupName, champ, largeur, hauteur) {
	// On empeche un 2eme affichage du popup
	initChampFormulaire (champ);
	
	// fao : Ouverture de la popup
	return openWindowPopup (url, popupName, largeur, hauteur);
}

/**
 * Fonction permettant l'ouverture d'une popup � partir d'une URL, d'un nom de popup dynamique
 * (nom interne), d'un champ pour r�initialisation du champ dans le formulaire
 * ayant donn� l'ordre d'ouverture du popup, ainsi que sa largeur et hauteur.
 *
 * @param url 		: l'URL de la page � afficher dans la popup.
 * @param popupName : nom dynamique interne de la popup.
 * @param champ 	: nom du champ dans le premier formulaire de la page � r�initialiser.
 * @param largeur	: largeur de la fen�tre.
 * @param hauteur 	: hauteur de la fen�tre.
 */
function openPopupPDF(url, popupName, champ, largeur, hauteur) {
	var dateCourante = new Date();
	// On empeche un 2eme affichage du popup
	initChampFormulaire (champ);
	
	// fao : noms differents pour chaque popup.
	popupName = popupName + dateCourante.getTime();
	
	// fao : Ouverture de la popup
	return openWindowPopup (url, popupName, largeur, hauteur);
}

/**
 * Fonction permettant l'initialisation du champ dans le formulaire
 * ayant donn� l'ordre d'ouverture du popup.
 * 
 * @param champ nom du champ dans le premier formulaire de la page � r�initialiser.
 */
function initChampFormulaire (champ) {
	// On empeche un 2eme affichage du popup
	if (champ != "") {
		document.forms[0].elements[champ].value = 0;
	}
}

/**
 * Fonction permettant l'ouverture d'une popup � partir d'une URL, d'un nom de popup dynamique
 * (nom interne), ainsi que sa largeur et hauteur.
 * 
 * @param url 		: L'URL de la page � afficher dans la popup.
 * @param popupName	: Nom dynamique interne de la popup.
 * @param largeur	: Largeur de la fen�tre.
 * @param hauteur	: Hauteur de la fen�tre.
 * @return
 */
function openWindowPopup (url, popupName, largeur, hauteur) {
	// On positionne la popup au centre de la page.
	var left=100;
	var top=100;

	// Definition des positions
	if (screen.availWidth && screen.availHeight) {
		left = (screen.availWidth-largeur)/2;
		top = (screen.availHeight-hauteur)/2;
	}
	// fao : Appel de la fonction window.open()
	fen = window.open(url, popupName, getPopupWindowProps(largeur, hauteur, left, top));
	
	// V�rification d'ouverture
	if (!fen) {
		alert(MSG_ANTI_POPUP);
		return false;
	}
	// fao : Focus sur la fen�tre ouverte
	// fao : Erreur �ventuelle sous IE.
	try {
		fen.focus();
	} catch (e) {}
	return true;
}

/**
 * Fonction renvoyant les propri�t�s d'une fen�tre de popup.
 *
 * @param largeur largeur de la fen�tre.
 * @param hauteur hauteur de la fen�tre.
 * @param leftPosition position (en pixels) � partir de la gauche de l'�cran.
 * @param topPosition position (en pixels) � partir du haut de l'�cran.
 * @return les propri�t�s de la fen�tre voulue.
 */
function getPopupWindowProps(largeur, hauteur, leftPosition, topPosition) {
	windowprops = "location=no,scrollbars=no,menubars=no,toolbars=no,resizable=yes" + ",left=" + leftPosition + ",top=" + topPosition + ",width=" + largeur + ",height=" + hauteur;
	return windowprops;
}

/**
  * Renvoie l'URL � renseigner pour ouvrir la popup d'impression des �ditions.
  * Elle ajoute un attribut unique (la date) � la fin de l'URL, afin de g�n�rer une
  * URL diff�rente � chaque demande, �vitant ainsi l'utilisation du cache c�t� client
  *
  * @param urlBase l'URL de base de l'application
  * @param sessionId l'ID de session de l'utilisateur
  */
function getUrlPourImpression(urlBase, sessionId) {
	var dateCourante = new Date();

	if (ie4) {
		return urlBase + 'edition.pdf?' + dateCourante.getTime() + sessionId;
	} else {
		return urlBase + 'pdf?' + dateCourante.getTime() + sessionId;
	}
}