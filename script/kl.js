const responseKl = await fetch("data/kl.json");
const kls = await responseKl.json();

addLinks();

function addLinks() {
	for (const ref of document.querySelectorAll(".kl")) {
		const name = ref.innerText;
		var found = false;
		for (const k of kls) {
			if (name == k.name && !found) {
				ref.setAttribute("href", k.link);
				found = true;
			}
		}
	}
}

export {addLinks};