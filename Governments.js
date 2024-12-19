 let my_butt = document.getElementsById("sectionTabs");
// Create a new element
const newElement = document.createElement("div");
newElement.textContent = "This is a new paragraph"; 

// Append the new element to the div
my.appendChild(newElement);

G.AddData({
name:'GovernmentMod',
author:'GothicHamster',
desc:'A mod that adds governments.',
engineVersion:1,
manifest:0,
requires:['Default dataset*'],
sheets:{'spicySheet':'img/spicyModIconSheet.png'},
func:function()
{
		
	//Policies
	
	new G.Policy({
		name:'eat herbs',
		desc:'[herb]s are eaten, which may be unhealthy.',
		icon:[6,12,4,6],
		cost:{'influence':1},
		startMode:'on',
		req:{'rules of food':true},
		effects:[
			{type:'make part of',what:['herb'],parent:'food'},
		],
		effectsOff:[
			{type:'make part of',what:['herb'],parent:''},
		],
		category:'food',
	});
}
});
