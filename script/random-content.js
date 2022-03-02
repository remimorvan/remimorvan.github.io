var funFact = new Array();
var funFactTitle = new Array();

funFact[0] = "Contrary to popular belief, there is in fact a tenth circle of hell, reserved for people using \"et al\" in their presentations.";
funFactTitle[0] = "Did you know?";
funFact[1] = "In school, you might have learned that writing was invented around 3000 BC. This is fake news: <a href='https://ctan.org/pkg/knowledge?lang=en'>it was invented</a> in 2016!";
funFactTitle[1] = "Did you know?";
funFact[2] = "Despite many efforts, my <a href=\"https://www.irif.fr/~haberm/haindex.html\">ha-index</a> is only 64.";
funFactTitle[2] = "Did you know?";
funFact[3] = "You can click on the background of this page to create new polygons!";
funFactTitle[3] = "Did you know?";
funFact[4] = "<a href='https://ctan.org/pkg/knowledge'>Knowledge</a> is a LaTeX package for (among other things) automatically linking a notion to its definition via an internal hyperlink. For example, <a href='https://arxiv.org/pdf/2201.03089.pdf'>this paper</a> or <a href='https://arxiv.org/pdf/1805.06238.pdf'>this thesis</a> were written using <a href='https://ctan.org/pkg/knowledge'>knowledge</a>.";
funFactTitle[4] = "Have you heard of?";
funFact[5] = "There will be a <a href='https://edbtschool22.labri.fr/'>summer school on database theory</a> this summer in Bordeaux!";
funFactTitle[5] = "Did you know?";


var num = Math.floor( Math.random() * funFact.length );
document.getElementById("randomtitle").innerHTML = funFactTitle[num];
document.getElementById("randomcontent").innerHTML = funFact[num];