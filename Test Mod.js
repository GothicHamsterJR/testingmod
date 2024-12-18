G.AddData({
name:'Add Population',
author:'GothicHamster',
desc:'A simple example mod that adds population at the click of a button.',
engineVersion:1,
manifest:0,
requires:['Default dataset*'],
sheets:{'spicySheet':'img/spicyModIconSheet.png'},
func:function()
{
	G.unitCategories.splice(1, 0, {id:'MyMod',name:'MyMod'});
	
	new G.Unit({
		name:'AddPop',
		desc:'@Adds 100 adults to the population with a click.',
		icon:[0,0,'spicySheet'],
		cost:{},
		use:{'worker':1},
		upkeep:{'food':0.1},
		effects:[
			{type:'convert',from:{'herb':1},into:{'adult':100}},
		],
		req:{'tribalism':true},
		category:'MyMod',	
		});
	}
});
