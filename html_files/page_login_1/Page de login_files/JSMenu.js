menuGauche=0
menuHaut=59

menuLien = new Array;

document.write('<STYLE TYPE="text/css">#menu { position:absolute;top:'+menuHaut+';left:'+menuGauche+'; }</STYLE>');

ie4=document.all
ns4=document.layers
ns6=document.getElementById&&!document.all

/**
 * Méthode permettant de repositionner automatiquement le menu selon la barre de scrolling verticale.
 */
function placeMenu() {
	if (ie4) {
		// le decalage du menu depend de la presence d'un frameset dans la page
		//nb: la valeur 12 correspond a la hauteur de la barre de separation
		menu.style.pixelTop = calcNewTopPosition(document.body.scrollTop, (self!=top)?12:menuHaut);
	} else if (ns4) {
		document.menu.top = calcNewTopPosition(window.pageYOffset, menuHaut);
	} else if (ns6) {
		document.getElementById("menu").style.top = calcNewTopPosition(window.pageYOffset, menuHaut);
	}

	if(ie4 || ns4 || ns6) {
		setTimeout("placeMenu()", 150);
	}
}

/**
 * Fonction permettant de calculer la nouvelle position à partir du haut de la page
 * du menu. On se base sur le décalage de la page verticalement (pageYOffset) ainsi
 * que sur un décalage du menu par rapport au haut de page (menuYOffset).
 * De plus, on utilise la taille du menu, car s'il dépasse de la taille de l'écran
 * certains liens ne seront plus accessibles.
 *
 * @param pageYOffset l'offset courant de la page dans le navigateur.
 * @param menuYOffset l'offset du menu par rapport au haut de page.
 * @return la position par rapport à la page du menu.
 */
function calcNewTopPosition(pageYOffset, menuYOffset) {
	if (pageYOffset > menuYOffset) {
		return pageYOffset;
	} else {
		return menuYOffset;
	}
}

/**
 * Méthode de création du menu dynamique, et positionnement.
 */
function creeMenu(){
	document.write('<SPAN ID=menu><table bgcolor=#FFFFFF border=0 cellspacing=0 cellpadding=0 WIDTH=137>')

	var imgSeparateur = '<img src="images/separateurs/p-virgule.gif" border="0" width="92" height="8">';
	var imgPuce = '<img src="images/puces/puce_rouge_petite.gif" width="10" height="15" border="0">';

	var inTitre = false;
	var baliseTitre = false;
	var titre;
	
	var nbElements = menuLien.length;
	for(i = 0; i < nbElements; i++) {

		// Est-on dans un titre ?
		baliseTitre = false;

		if (menuLien[i].substring(0, 11) == "TITRE:DEBUT") {
			// Rendu du titre
			document.write('<tr><td colspan=3>' + menuLien[i].substring(11) + '</td></tr>');
			inTitre = true;
			baliseTitre = true;
		}

		if (menuLien[i].substring(0, 9) == "TITRE:FIN") {
			inTitre = false;
			baliseTitre = true;
		}

		// Rendu de l'élement si ce n'est pas un indicateur de titre
		if (!baliseTitre) {
			if (inTitre) {
				if (menuLien[i] == "TRAIT") {
					writeSepLine(5);
					document.write('<tr><td>&nbsp;</td><td colspan="2">' + imgSeparateur + '</td></tr>');
					writeSepLine(5);
				} else if (menuLien[i].substring(0, 7) == "NOPUCE:") {
					document.write('<tr><td colspan="2">&nbsp;</td><td>' + menuLien[i].substring(7) + '</td></tr>');
				} else if (menuLien[i].substring(0, 16) == "MENTIONSLEGALES:") {
					document.write('<tr><td colspan="3" align="right">&nbsp;' + menuLien[i].substring(16) + '</td></tr>');					
				} else {
					document.write('<tr><td width="10%">&nbsp;</td><td>' + imgPuce + '</td><td>' + menuLien[i] + '</td></tr>');
				}
			} else {
				if (menuLien[i] == "TRAIT") {
					writeSepLine(5);
					document.write('<tr><td colspan=3>' + imgSeparateur + '</td></tr>');
					writeSepLine(5);
				} else if (menuLien[i].substring(0,7) == "NOPUCE:") {
					document.write('<tr><td colspan="2">&nbsp;</td><td>' + menuLien[i].substring(7) + '</td></tr>');
				} else if (menuLien[i].substring(0, 16) == "MENTIONSLEGALES:") {
					document.write('<tr><td colspan="3" align="right">&nbsp;' + menuLien[i].substring(16) + '</td></tr>');						
				} else {
					document.write('<tr><td width="10%">' + imgPuce + '</td><td colspan="2">' + menuLien[i] + '</td></tr>');
				}
			}
		}
	}

	document.write('</TR></TABLE></SPAN>')
	window.onload = placeMenu;
}

/**
 * Ecrit une ligne séparatrice dans le document.
 *
 * @param height taille de la ligne séparatrice
 */
function writeSepLine(height) {
	document.write('<tr><td colspan="3" height="');
	document.write(height);
	document.write('"><img src="images/separateurs/spacer.gif" border="0" width="1" height="');
	document.write(height);
	document.write('"></td></tr>');
}