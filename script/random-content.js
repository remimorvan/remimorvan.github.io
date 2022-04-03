var funFact = new Array();
var funFactTitle = new Array();

funFact[0] = "Contrary to popular belief, there is in fact a tenth circle of hell, reserved for people using “et al” in their presentations.";
funFactTitle[0] = "Did you know?";
funFact[1] = "In school, you might have learned that writing was invented around 3000 BC. This is fake news: <a href='https://ctan.org/pkg/knowledge?lang=en'>the first decent writing system</a> was invented in 2016!";
funFactTitle[1] = "Did you know?";
funFact[2] = "Despite many efforts, my <a href=\"https://www.irif.fr/~haberm/haindex.html\">ha-index</a> is only 64.";
funFactTitle[2] = "Did you know?";
funFact[3] = "<a href='https://github.com/remimorvan/knowledge-clustering'>Knowledge-Clustering</a> is a program that helps the user write LaTeX documents using the knowledge package, by giving (helpful!) suggestions on which notions should be grouped together.";
funFactTitle[3] = "Have you heard of?";


var num = Math.floor( Math.random() * funFact.length );
document.getElementById("randomtitle").innerHTML = funFactTitle[num];
document.getElementById("randomcontent").innerHTML = funFact[num];