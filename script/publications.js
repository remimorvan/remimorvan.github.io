import { addLinks } from "./kl.js";

const responsePapers = await fetch("data/papers.json");
const papers = await responsePapers.json();

papers.sort((x, y) => {return y.year - x.year});

var checkboxGroupByType = document.querySelector('#checkboxGroupPapers');

// Print recent papers
populateRecentPublications(papers);
// Print full publication list, either by date or by type
if (checkboxGroupByType.checked) {
	populatePublicationListByType(papers);
} else {
	populatePublicationList(papers);
};
addLinks();

// If checkbox is updated, either print by date or grouped by type.
checkboxGroupByType.addEventListener('change', (event) => {
	if (event.currentTarget.checked) {
		populatePublicationListByType(papers);
	} else {
		populatePublicationList(papers);
	};
	addLinks();
});

function getParPubli(paper) {
	const myPar = document.createElement("p");
	myPar.innerHTML = `<span class="paperTitle">${paper.title}</span><br>`;

	const mySpan = document.createElement("span");
	mySpan.className = "paperOther";
	if ("coauthors" in paper) {
		mySpan.innerHTML += `with `;
		for (const [index, author] of paper.coauthors.entries()) {
			mySpan.innerHTML += `<a class="kl"">${author}</a>`;
			if (index < paper.coauthors.length - 2) {
				mySpan.innerHTML += `, `;
			} else if (index < paper.coauthors.length - 1) {
				mySpan.innerHTML += ` and `;
			} else {
				mySpan.innerHTML += `<br>`;
			};
		}
	}

	if ("journalLink" in paper) {
		mySpan.innerHTML += `<a href="${paper.journalLink}">${paper.journal}</a>, ${paper.year}`;
	} else {
		mySpan.innerHTML += `${paper.journal}, ${paper.year}`;
	};

	if ("doi" in paper) {
		mySpan.innerHTML += ` <a class="doi" href="${paper.doi}">doi</a>`;
	};
	if ("arxiv" in paper) {
		mySpan.innerHTML += ` <a class="pdf" href="${paper.arxiv}">arXiv</a>`;
	};
	if ("pdf" in paper) {
		mySpan.innerHTML += ` <a class="pdf" href="${paper.pdf}">pdf</a>`;
	};

	if ("note" in paper) {
		mySpan.innerHTML += `<br/><span class="paperNote">${paper.note}</span>`;
	};
	myPar.appendChild(mySpan);
	return myPar;
}

function populatePublicationList(obj) {
	var publications = document.querySelector("#publicationsArticleContent");

	publications.innerHTML = ``;

	for (const paper of obj) {
		publications.appendChild(getParPubli(paper));
	}
};

function populatePublicationListByType(obj) {
	var publications = document.querySelector("#publicationsArticleContent");

	var papersGrouped = obj.reduce((x, y) => {
		(x[y.type] = x[y.type] || []).push(y);
		return x;
	  }, {});

	publications.innerHTML = ``;
	publications.innerHTML += `<h3>Journal papers</h3>`;

	for (const paper of papersGrouped["journal"]) {
		publications.appendChild(getParPubli(paper));
	};

	publications.innerHTML += `<h3>Conference proceedings</h3>`;

	for (const paper of papersGrouped["conf"]) {
		publications.appendChild(getParPubli(paper));
	};

	publications.innerHTML += `<h3>Miscellaneous</h3>`;

	for (const paper of papersGrouped["misc"]) {
		publications.appendChild(getParPubli(paper));
	};
};

function populateRecentPublications(obj) {
	const publications = document.querySelector("#recentPublications");

	publications.appendChild(getParPubli(obj[0]));
	publications.appendChild(getParPubli(obj[1]));
};