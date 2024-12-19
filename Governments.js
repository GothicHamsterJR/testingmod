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
		desc:'Your people will eat [herb]s when other [food] gets scarce, with dire consequences for health and morale.',
		icon:[6,12,3,7],
		cost:{'influence':1},
		startMode:'on',
		req:{'rules of food':false},
		category:'food',
	});
}
  
});
