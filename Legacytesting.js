G.AddData({
name:'Add Population',
author:'GothicHamster',
desc:'A simple example mod that adds population at the click of a button.',
engineVersion:1,
manifest:'https://cdn.jsdelivr.net/gh/GothicHamsterJR/testingmod@e336d2bf7b6b8ea86afa30fffec19a731f373081/manifestfortest.js',
requires:['Default dataset*'],
sheets:{'spicySheet':'img/spicyModIconSheet.png'},
func:function()
{
	G.unitCategories.splice(
		(1, 0, {id:'MyMod',name:'MyMod'}),
	);
	new G.Unit({
		name:'AddPop',
	
		startWith:0,
	
		//desc:'@Adds 1000 adults to the population with a click.',
		icon:[0,2],
	
		cost:{'insight':10},
		use:{'worker':1},
		upkeep:{'food':0.1},
		effects:[
			{type:'convert',from:{'herb':0.1},into:{'adult':1000},chance:1,every:3},
		
			
		],
		//req:{'tribalism':true},
		category:'MyMod',
		
		
	});
	

});
