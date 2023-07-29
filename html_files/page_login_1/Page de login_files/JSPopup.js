/**
 * Fonction permettant l'ouverture d'une popup à partir d'une URL, d'un nom de popup dynamique
 * (nom interne), d'un champ pour réinitialisation du champ dans le formulaire
 * ayant donné l'ordre d'ouverture du popup, ainsi que sa largeur et hauteur.
 *
 * @param url 		: l'URL de la page à afficher dans la popup.
 * @param popupName : nom dynamique interne de la popup.
 * @param champ 	: nom du champ dans le premier formulaire de la page à réinitialiser.
 * @param largeur	: largeur de la fenêtre.
 * @param hauteur 	: hauteur de la fenêtre.
 */
function openPopup(url, popupName, champ, largeur, hauteur) {
	// On empeche un 2eme affichage du popup
	initChampFormulaire (champ);
	
	// fao : Ouverture de la popup
	return openWindowPopup (url, popupName, largeur, hauteur);
}

/**
 * Fonction permettant l'ouverture d'une popup à partir d'une URL, d'un nom de popup dynamique
 * (nom interne), d'un champ pour réinitialisation du champ dans le formulaire
 * ayant donné l'ordre d'ouverture du popup, ainsi que sa largeur et hauteur.
 *
 * @param url 		: l'URL de la page à afficher dans la popup.
 * @param popupName : nom dynamique interne de la popup.
 * @param champ 	: nom du champ dans le premier formulaire de la page à réinitialiser.
 * @param largeur	: largeur de la fenêtre.
 * @param hauteur 	: hauteur de la fenêtre.
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
 * ayant donné l'ordre d'ouverture du popup.
 * 
 * @param champ nom du champ dans le premier formulaire de la page à réinitialiser.
 */
function initChampFormulaire (champ) {
	// On empeche un 2eme affichage du popup
	if (champ != "") {
		document.forms[0].elements[champ].value = 0;
	}
}

/**
 * Fonction permettant l'ouverture d'une popup à partir d'une URL, d'un nom de popup dynamique
 * (nom interne), ainsi que sa largeur et hauteur.
 * 
 * @param url 		: L'URL de la page à afficher dans la popup.
 * @param popupName	: Nom dynamique interne de la popup.
 * @param largeur	: Largeur de la fenêtre.
 * @param hauteur	: Hauteur de la fenêtre.
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
	
	// Vérification d'ouverture
	if (!fen) {
		alert(MSG_ANTI_POPUP);
		return false;
	}
	// fao : Focus sur la fenêtre ouverte
	// fao : Erreur éventuelle sous IE.
	try {
		fen.focus();
	} catch (e) {}
	return true;
}

/**
 * Fonction renvoyant les propriétés d'une fenêtre de popup.
 *
 * @param largeur largeur de la fenêtre.
 * @param hauteur hauteur de la fenêtre.
 * @param leftPosition position (en pixels) à partir de la gauche de l'écran.
 * @param topPosition position (en pixels) à partir du haut de l'écran.
 * @return les propriétés de la fenêtre voulue.
 */
function getPopupWindowProps(largeur, hauteur, leftPosition, topPosition) {
	windowprops = "location=no,scrollbars=no,menubars=no,toolbars=no,resizable=yes" + ",left=" + leftPosition + ",top=" + topPosition + ",width=" + largeur + ",height=" + hauteur;
	return windowprops;
}

/**
  * Renvoie l'URL à renseigner pour ouvrir la popup d'impression des éditions.
  * Elle ajoute un attribut unique (la date) à la fin de l'URL, afin de générer une
  * URL différente à chaque demande, évitant ainsi l'utilisation du cache côté client
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