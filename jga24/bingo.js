var cell_content = ["Quelqu'un pose la question « Et sur les graphes de tree-width borné ? »",
	"Quelqu'un parle de fermentation",
	"Exposé sur une classe de graphes à trois pattes et deux moustaches",
	"Quelqu'un s'endort pendant un talk",
	"Problème avec le vidéo-projecteur",
	"Un téléphone sonne pendant un talk",
	"Un permanent fait une remarque de droite",
	"Trois exposés consécutifs ne parlent PAS d'algorithmes",
	"Quelqu'un prétend que sa recherche a des applications concrètes",
	"Ouin-ouin d'un permanent sur l'écologie/aller en conf en avion",
	"Tu as écouté un talk en intégralité et compris le principal",
	"Tu te questionnes sur le sens de la vie suite à un talk perché",
	"« Théorème de Courcelle »",
	"« FO-transduction »",
	"Quelqu'un mentionne Michał Pilipczuk",
	"Quelqu'un compare la longueur de ta thèse avec celle de Théo Pierron",
	"Des normaliens parlent de l'ENS pendant trop longtemps",
	"Blague sur le coloriage",
	"Quelqu'un critique ses coauteurs pendant son talk",
	"Un talk parle la twin-width uniquement pour dire que c'est à la mode",
	"Marthe dit « Ah… c'est mieux non ? » quand quelqu'un quite la pièce/la discussion",
	"Claire propose de jouer au Zik",
	"Clara balance une dinguerie sur son passé",
	"« Oh mais tu devrais aller en Pologne faire un postdoc »",
	"Le Rubik's Cube est mentionné comme motivation pour étudier un problème de reconfiguration",
	"Tu oses aller voir quelqu'un dont tu as bien aimé un papier pour le lui dire",
	"« Oh mais tu devrais aller en Pologne faire un postdoc »",
	"Taïssir porte un vêtement avec des papillons dessus",
	"« Tout le monde connait (…) » est prononcé pendant un talk",
];

var size = 5;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

var used_cell_content = []

bingotable = document.getElementById('bingotable');
for (var i = 0; i < size; i++) {
	var row = document.createElement("tr");
	for (var j = 0; j < size; j++) {
		var cell = document.createElement("td");
		var cell_id = getRandomInt(cell_content.length);
		cell.innerHTML += cell_content[cell_id];
		cell_content.splice(cell_id,1);
		row.appendChild(cell);
	}
	bingotable.appendChild(row);
}