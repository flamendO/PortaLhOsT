/**
 * Fonction permettant de transferer les items selectionnes de la liste 1 dans la liste 2.
 * On peut choisir de supprimer ou non les items dans la liste 1 lors du transfert.
 * On peut egalement choisir de retrier la liste de destination.
 *
 * @param liste1 la liste source du transfert.
 * @param liste2 la liste de destination du transfert.
 * @param bSupprimerDansListe1 booleen indiquant si on doit supprimer ou non les items dans la liste 1.
 * @param bTrierListe2 booleen indiquant si la liste de destination doit etre retriee.
 */
function doTransfererEntreListes(liste1, liste2, bSupprimerDansListe1, bTrierListe2) {

	for (var i=liste1.options.length; i > 0; i--) {
		if (liste1.options[i-1].selected) {
			var opt = liste1.options[i-1];
			doAjouterAListe(liste2, opt.text, opt.value); 
			if (bSupprimerDansListe1) {
				liste1.options[i-1] = null;
			}
		}
	}

	if (bTrierListe2) {
		//doTriListe(liste2);
		doTriListeOptions(liste2);
	}
}

/**
 * Fonction permettant de transferer tout les items de la liste 1 dans la liste 2.
 * On peut choisir de supprimer ou non les items dans la liste 1 lors du transfert.
 *
 * @param liste1 la liste source du transfert.
 * @param liste2 la liste de destination du transfert.
 * @param bSupprimerDansListe1 booleen indiquant si on doit supprimer ou non les items dans la liste 1.
 * @param bTrierListe2 booleen indiquant si la liste de destination doit etre retriee.
 */
function doTransfererToutEntreListes(liste1, liste2, bSupprimerDansListe1, bTrierListe2) {

	for (var i=liste1.options.length; i > 0; i--) {
		var opt = liste1.options[i-1];
		doAjouterAListe(liste2, opt.text, opt.value); 
		if (bSupprimerDansListe1) {
			liste1.options[i-1] = null;
		}
	}
	
	if (bTrierListe2) {
		//doTriListe(liste2);
		doTriListeOptions(liste2);
	}
}

/**
 * Fonction permettant d'ajouter un item dans une liste. On verifie que l'item
 * n'existe pas deja dans la liste avant l'ajout.
 *
 * @param liste la liste dans laquelle ajouter l'item.
 * @param chaine le texte de l'item.
 * @param valeur la valeur associee a l'item.
 */
function doAjouterAListe(liste, chaine, valeur) {

	// Si la liste comporte un seul item de valeur egale a 'null' on le supprime.
	if (liste.options.length == 1) {
		var opt = liste.options[0];
		if (opt.value == 'null') {
			liste.options.length = 0;
		}
	}

	// On verifie qu'aucun item de meme valeur n'existe dans la liste.
	var dejaPresent = false;
	for (var i=liste.options.length; i > 0; i--) {
		var opt = liste.options[i-1];
		if (opt.value == valeur) {
			dejaPresent = true;
			break;
		}
	}

	// Ajout effectif.
	if (!dejaPresent) {
		/*var opt=new Option(chaine);
		opt.value=valeur;
		liste.options[liste.options.length]=opt;*/
		liste.options[liste.options.length]=new Option(chaine, valeur);
	}
}

/**
 * Fonction permettant de supprimer tout les items selectionnes d'une liste.
 *
 * @param liste la liste pour laquelle supprimer tout les elements selectionnes.
 */
function doSupprimerDansListe(liste) {
	for (var i=liste.options.length ; i > 0; i--) {
		if (liste.options[i-1].selected) {
			var opt = liste.options[i-1];
			liste.options[i-1] = null;
		}
	}
}

/**
 * Fonction permettant de selectionner tout les items d'une liste.
 *
 * @param liste la liste pour laquelle selectionner tout les elements.
 */
function doSelectionnerTouteLaListe(liste) {
	if(!liste) {
		return;
	}
	for (var i=liste.options.length ; i > 0; i--) {
		liste.options[i-1].selected = true;
	}
}

/**
 * Fonction permettant de deselectionner tout les items d'une liste.
 *
 * @param liste la liste pour laquelle deselectionner tout les elements.
 */
function doDeselectionnerTouteLaListe(liste) {
	for (var i=liste.options.length ; i > 0; i--) {
		liste.options[i-1].selected = false;
	}
}

/**
 * Fonction de comparaison entre deux chaines de caractere.
 * La comparaison ignore la case.
 *
 * @param e1 la premiere chaine.
 * @param e2 la seconde chaine.
 */
function doCompareElements(e1, e2) {
	if (e1.toUpperCase() < e2.toUpperCase()) return -1;
	if (e1.toUpperCase() > e2.toUpperCase()) return 1;
	return 0;
}

/**
 * Supprime le dernier element d'une liste ayant une valeur nulle.
 */
function doSupprimerDernierElementNull(liste){

	var opt = liste.options[liste.length - 1];

	if (opt.value == '') {
		liste.options[liste.length-1] = null;
	} else {
		alert('Tentative de supprimer un element de cle non nulle : cle = ' + opt.value);	
	}

}


// ATTENTION: la fonction doTriListe genere un bug si deux options ont le meme texte
/**
 * Fonction permettant de trier une liste a partir
 * d'une fonction de tri, ici doCompareElements.
 *
 * @param liste la liste a trier.
 */
function doTriListe(liste) {

	var tabtext = new Array();
	var oldtabtext = new Array();
	var tabvalue = new Array();
	var oldtabvalue = new Array();
	count = 0;

	for (i=0; i < liste.length; i++) {
		tabtext[count] = liste.options[i].text;
		oldtabtext[count] = liste.options[i].text;
		tabvalue[count] = liste.options[i].value;
		oldtabvalue[count] = liste.options[i].value;
		count ++;
	}

	tabtext.sort(doCompareElements);
	liste.length = 0;

	for (var i=0; i < tabtext.length; i++) {
		for(var j=0; j < tabtext.length; j++) {
			if (tabtext[i] == oldtabtext[j]) {
				tabvalue[i] = oldtabvalue[j];
			}
		}
		opt = new Option(tabtext[i], tabvalue[i]);
		liste.options[i] =  opt;
	}

	for (i=0; i < tabtext.length;i++) {
		opt = new Option(tabtext[i], tabvalue[i]);
		liste.options[i] =  opt;
	}
}

/* Tri d'une liste d'options d'un select.
 * Le tri s'effectue par ordre alphabetique des libelles. */
function doTriListeOptions(liste) {
	var items = liste.options.length;
	// Creation d'un tableau temporaire
	var tmpArray = new Array(items);
	for(i = 0 ; i < items ; i++) {
		tmpArray[i] = new Option(liste.options[i].text, liste.options[i].value);
	}
	// Tri des libelles des options
	tmpArray.sort(compareOptionText);
	// Recopie des options triees dans la liste
	for(i = 0 ; i < items ; i++) {
		liste.options[i] = new Option(tmpArray[i].text, tmpArray[i].value);
	}
}

/* Fonction de comparaison entre deux options.
 * Retourne : 0 si a = b
 *            1 si a > b
 *           -1 si a < b
 */
function compareOptionText(a, b) {
	return a.text != b.text ? a.text < b.text ? -1 : 1 : 0;
}
