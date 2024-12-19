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
		desc:'@Adds 10 adults to the population with a click.',
		icon:[0,0,'spicySheet'],
		cost:{},
		use:{'worker':1},
		upkeep:{'food':0.1},
		effects:[
			{type:'convert',from:{'water':1},into:{'adult':10},chance:1,every:5},
		],
		req:{'tribalism':true},
		category:'MyMod',	
		});
	
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
