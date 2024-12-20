G.AddData({
name:'Heritage mod',
author:'geekahedron',
desc:'A collection of mods and improvements for NeverEnding Legacy.',
engineVersion:1,
manifest:'https://rawgit.com/geekahedron/heritage/master/heritageModManifest.js',
requires:['Default dataset*'],
sheets:{
	'heritageSheet':'https://cdn.rawgit.com/geekahedron/heritage/018c0de80c706c0a2bae3ce11d71b1e4fadb1cbc/img/heritageModIconSheet.png',
},
func:function()
{
/************************************************
 *           HERITAGE SETTINGS API              *
 ************************************************
 *
 * Use hidden in-game policies as 'settings' for this mod.
 * We could use actual settings, but the main codebase says mods should not do that (no explanation as to why not -- it works fine -- but hey).
 * Also, settings are not part of the "checkReq" list, only policies, traits, techs, and units, so we want to do it this way anyway.
 *
 */	

// For starters, basically wraps/mimics the default policy definition, with a few additions
	G.hSetting=[];
	G.hSettingByName=[];
	G.hSettingCategory=[];
	G.HSettingsLoaded=false;

	G.HSetting=function(obj)
	{
		this.type='policy';	// required to work with G.checkReq()
		this.category='debug';	// best way to keep them hidden for now
		this.family='';
		this.startWith=0;
		this.icon=[0,0];
		this.modes=[];
		this.mode=0;
		this.req={};

		this.cost={};
		this.startsWith=true;
		this.visible=false;

		for (var i in obj) this[i]=obj[i];
		this.id=G.policy.length;
		if (!this.displayName) this.displayName=cap(this.name);
		if(!this.hcategory) this.hcategory=G.context.name;
		G.policy.push(this);
		G.policyByName[this.name]=this;
		G.setDict(this.name,this);
		if (this.modes.length==0)
		{
			//no modes defined? auto-populate as simple on/off switch
			this.modes['off']={name:'Disabled',desc:'This policy is disabled.'};
			this.modes['on']={name:'Enabled',desc:'This policy is enabled.'};
			if (this.effectsOff) this.modes['off'].effects=this.effectsOff;
			if (this.effects) this.modes['on'].effects=this.effects;
			this.binary=true;
		}
		this.mod=G.context;

		// extra stuff here
		G.hSetting.push(this);
		G.hSettingByName[this.name]=this;
	}

// wrapper function to make sure all settings are displayed when added
	G.addHSetting=function(obj)
	{
		new G.HSetting(obj);
		if (G.HSettingsLoaded) G.buildTabs();	// after intial load, rebuild the tabs to display new settings
	}

	G.baseHSetting=function(obj)
	{
		this.type='setting';
		for (var i in obj) this[i]=obj[i];
		G.hSetting.push(this);
		G.hSettingByName[this.name]=this;
	}

	G.getHSetting=function(name) {
		if (!G.hSettingByName[name])
			ERROR('No policy exists with the name '+name+'.');
		else
			return G.hSettingByName[name];
	}

	G.checkHSetting=function(name)
	{
		var me=G.getHSetting(name);
//		if (!me.visible) return 0;
		return me.mode.id;
	}

	G.setHSettingModeByName=function(name,mode)
	{
		me=G.getHSetting(name);
		G.setHSettingMode(me,me.modes[mode]);
	}

	G.setHSettingMode=function(me,mode)
	{
		//free old mode uses, and assign new mode uses
		var oldMode=me.mode;
		var newMode=mode;
		if (oldMode!=newMode)
		{
			me.mode=mode;

			if (me.mode.effects) G.applyKnowEffects(me.mode,false,true);
			
			if (me.l != 0)	// only update visuals for displayed policy buttons
			{
				if (G.getSetting('animations')) triggerAnim(me.l,'plop');
				if (me.binary)
				{
					if (mode.id=='off') me.l.classList.add('off');
					else me.l.classList.remove('off');
				}
			}

			// function callback specifically for HSettings
			if (me.effects.onChange) me.effects.onChange.func();
		}
	}

	// add and manage categories of settings for automation population
	G.addHSettingCategory=function(obj)
	{
		if (!obj.id) obj.id=G.context.name;	// if not specified, add a category specific to the calling mod
		if (!obj.name) obj.name=obj.id;

		// make sure the category doesn't exist
		if (G.hSettingCategory[obj.id]===undefined)
		{
			G.hSettingCategory[obj.id]=obj;
		} else {
			console.error("HSetting category ",obj.id," already exists");
		}
	}

	G.updateHSettingCategory=function(obj)
	{
		// make sure the category exists
		if (G.hSettingCategory['obj.id']!==undefined)
		{
			for (var i in obj)
			{
				G.hSettingCategory['obj.id'][i] = obj[i];
			}
		} else {
			console.error('No such hSetting category: ',obj.id);
		}
	}

/************************************************
 *             HERITAGE SETTINGS                *
 ************************************************
 *
 * Add initial category for heritage mod built-in settings.
 * Other mods and additions can create their own categories by the same means.
 */
	G.addHSettingCategory({
		displayName:'Heritage modpack options',
		desc:'Gameplay options from the Heritage modpack'
	});
	
	G.writeHSettingButton=function(obj)
	{
		G.pushCallback(function(obj){return function(){
			var div=l('hsettingButton-'+obj.id);
			if (div)
			{
				var me=G.getHSetting(obj.name);
				if (me.binary==true)
				{
					var on = (G.checkHSetting(obj.name)=="on");

					div.innerHTML=obj.text||me.name;
					if (on) div.classList.add('on');
				}

				div.onclick=function(div,name,value,siblings){return function(){G.clickHSettingButton(div,name,value,siblings);}}(div,obj.name,obj.value,obj.siblings);
				if (obj.tooltip) G.addTooltip(div,function(str){return function(){return str;};}(obj.tooltip),{offY:-8});
			}
		}}(obj));
		return '<div class="button" id="hsettingButton-'+obj.id+'"></div>';
	}

	G.clickHSettingButton=function(div,name,value,siblings)
	{
		var me=G.getHSetting(name);

		if (me.binary)
		{
			if (G.checkHSetting(name)=="on")
			{
				G.setHSettingMode(me,me.modes["off"]);
			}
			else{
				G.setHSettingMode(me,me.modes["on"]);
			}
		}
		else
		{
			G.setHSettingMode(me,me.modes[value]);
		}

		if (div)
		{
			var on=(me.mode.id=="on");
			if (on) div.classList.add('on'); else div.classList.remove('on');
			if (siblings)
			{
				for (var i in siblings)
				{
					if (('hsettingButton-'+siblings[i])!=div.id)
					{l('hsettingButton-'+siblings[i]).classList.remove('on');}
				}
			}
		}
	}

	// A function to write each category of settings and buttons
	G.writeHSettingCategories=function()
	{
		var str='';
		for (c in G.hSettingCategory)
		{
			if (c=='hidden') continue;
			var category=G.hSettingCategory[c];
			str+='<div class="barred fancyText">'+category.displayName+'</div>';
			for (var i in G.hSetting)
			{
				var s = G.hSetting[i];
				if (s.hcategory == c)
				{
					if (s.type=='setting')
					{
						str+=G.writeSettingButton({
							id:s.id,
							name:s.name,
							text:s.displayName,
							tooltip:s.desc
						});
					} else {
						str+=G.writeHSettingButton({
							id:s.name,
							name:s.name,
							text:s.displayName,
							tooltip:s.desc,
						});
					}
				}
			}
			str+='<br /><br />';
		}
		return str;
	}
}
});
