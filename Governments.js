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
	new G.Policy({
		name:'eat herbs',
		desc:'[herb]s are eaten, which may be unhealthy.',
		icon:[6,12,4,6],
		cost:{'influence':1},
		startMode:'on',
		req:{'rules of food':false},
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
