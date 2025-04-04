import { getDate, printDate } from "./date.js";
import { addLinks } from "./kl.js";

const responseTalks = await fetch("data/talks.json");
const talks = await responseTalks.json();

var checkboxGroupByTitle = document.querySelector('#checkboxGroupTalks');

// Print the last two talks
populateRecentTalks(talks);

// Print full talk list, either by date or grouped by title.
if (checkboxGroupByTitle.checked) {
	populateTalkListTitle(talks);
} else {
	populateTalkListDate(talks);
}
addLinks();

// If checkbox is updated, either print by date or grouped by title.
checkboxGroupByTitle.addEventListener('change', (event) => {
	if (event.currentTarget.checked) {
		populateTalkListTitle(talks);
	} else {
		populateTalkListDate(talks);
	};
	addLinks();
});

function getLiFromSorted(talk, short) {
	const myLi = document.createElement("li");
	if ("eventLink" in talk) {
		myLi.innerHTML = `<span class="talkConferenceSorted"><a href="${talk.eventLink}">${talk.event}</a></span>, `;
	} else {
		myLi.innerHTML = `<span class="talkConferenceSorted">${talk.event}</span>, `;
	}
	myLi.innerHTML += `<span class="talkDateSorted">${printDate(talk.date)}</span>`;
	if (!short) {
		myLi.innerHTML += `, `;
		if ("where" in talk) {
			myLi.innerHTML += `${talk.where} `;
		}
		if ("duration" in talk) {
			myLi.innerHTML += `(${talk.duration})`;
		}
	}
	if ("slides" in talk) {
		myLi.innerHTML += `<a class="pdf" href="${talk.slides}">slides</span>`;
	} else if ("blackboard" in talk && talk.blackboard) {
		myLi.innerHTML += `<span class="blackboard">blackboard talk</span>`;
	};
	myLi.innerHTML += `<br>`
	const mySpan = document.createElement("span");
	mySpan.className = "talkOther";
	mySpan.innerHTML = `<span class="talkTitle">${talk.title}</span> `;
	myLi.appendChild(mySpan);
	return myLi;
}

function getLiFromGrp(grp) {
	const myLi = document.createElement("li");
	myLi.innerHTML = `<span class="talkGroupedTitle">${grp.title}</span>`
	const myUl = document.createElement("ul");
	for (var talk of grp.list) {
		const myLiTalk = document.createElement("li");
		myLiTalk.className = "talkGroupedItem";
		myLiTalk.innerHTML = `<span class="talkDateGrouped">${printDate(talk.date)}:</span> `;
		if ("eventLink" in talk) {
			myLiTalk.innerHTML += `<a href="${talk.eventLink}">${talk.event}</a>, `;
		} else {
			myLiTalk.innerHTML += `${talk.event}, `;
		}
		if ("where" in talk) {
			myLiTalk.innerHTML += `${talk.where} `;
		}
		if ("duration" in talk) {
			myLiTalk.innerHTML += `(${talk.duration}) `;
		}
		if ("slides" in talk) {
			myLiTalk.innerHTML += `<a class="pdf" href="${talk.slides}">slides</span>`;
		} else if ("blackboard" in talk && talk.blackboard) {
			myLiTalk.innerHTML += `<span class="blackboard">blackboard talk</span>`;
		};
		myUl.appendChild(myLiTalk);
	}
	myLi.appendChild(myUl);
	return myLi;
}

function populateTalkListTitle(obj) {
	const talksArticle = document.querySelector("#talksArticleContent");

	var talksGrouped = obj.reduce((x, y) => {
		var titlesSeen = x.map((grp) => grp.title)
		if (titlesSeen.includes(y.title)) {
			const grp = x.find((grp) => grp.title == y.title);
			grp.list.push(y)
		} else {
			x.push({title: y.title, list: [y]})
		}
		return x;
	}, []);

	// Sort each group by date
	for (var grp of talksGrouped) {
		grp.list.sort((x, y) => {
			var dx = new Date("01/01/1970");
			var dy = new Date("01/01/1970");
			getDate(x.date, dx);
			getDate(y.date, dy);
			return dy - dx;
		})
	};

	// Sort the groups by date of most recent talk
	talksGrouped.sort((x, y) => {
		var dx = new Date("01/01/1970");
		var dy = new Date("01/01/1970");
		getDate(x.list[0].date, dx);
		getDate(y.list[0].date, dy);
		return dy - dx;
	});

	// Print each group
	const myUl = document.createElement("ul");
	myUl.className = "talkGrouped";
	for (var grp of talksGrouped) {
		myUl.appendChild(getLiFromGrp(grp));
	}
	talksArticle.innerHTML = ``;
	talksArticle.appendChild(myUl);
}

function populateTalkListDate(obj) {
	const talksArticle = document.querySelector("#talksArticleContent");

	// Sort the talks by date
	obj.sort((x, y) => {
		var dx = new Date("01/01/1970");
		var dy = new Date("01/01/1970");
		getDate(x.date, dx);
		getDate(y.date, dy);
		return dy - dx;
	});

	const myUl = document.createElement("ul");
	myUl.className = "talkSorted";
	for (const talk of obj) {
		myUl.appendChild(getLiFromSorted(talk, false));
	}
	talksArticle.innerHTML = ``;
	talksArticle.appendChild(myUl);
}

function populateRecentTalks(obj) {
	const recentTalks = document.querySelector("#recentTalks");
	const myUl = document.createElement("ul");
	myUl.appendChild(getLiFromSorted(obj[0], true));
	myUl.appendChild(getLiFromSorted(obj[1], true));
	myUl.appendChild(getLiFromSorted(obj[2], true));
	recentTalks.innerHTML = ``;
	recentTalks.appendChild(myUl);
}