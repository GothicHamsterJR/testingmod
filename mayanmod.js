G.AddData({
name:'Example mod',
author:'Orteil',
desc:'A simple example mod that adds hot peppers and hot sauce.',
engineVersion:1,
manifest:'modManifest.js',
requires:['Default dataset*'],
sheets:{'spicySheet':'img/spicyModIconSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	<div id="tab-government" class="tab on bgLight plop">Governments</div>
}
});
