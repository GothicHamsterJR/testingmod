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
	
	//Categories
	
	G.governmentCategories.push(
		{id:'test1',name:'test1'},
		{id:'test2',name:'test2'},
		{id:'test3',name:'test4'},
		{id:'test5',name:'test5'},
		{id:'test6',name:'test6'}
	);

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
