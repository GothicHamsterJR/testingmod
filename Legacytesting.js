G.AddData({
name:'Add Population',
author:'GothicHamster',
desc:'A simple example mod that adds population at the click of a button.',
engineVersion:1,
manifest:'modManifest.js',
requires:['Default dataset*'],
sheets:{'spicySheet':'img/spicyModIconSheet.png'},
func:function()
{

	G.unitCategories.splice(1, 0, {id:'MyMod',name:'MyMod'},
				
	});
	
	new G.Unit({
		name:'AddPop',
		startWith:0
		desc:'@Adds 1000 adults to the population with a click.',
		icon:[0,2],
		cost:{},
		use:{'worker':1},
		upkeep:{'coin':0.1},
		G.gain('adult',1000,'birth');
		req:{'tribalism':true},
		category:'MyMod',
	});
	
}
});
