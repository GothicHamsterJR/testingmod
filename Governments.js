G.AddData({
    name: 'Government mod',
    author: 'GothicHamster',
    desc: 'A collection of mods and improvements for NeverEnding Legacy.',
    engineVersion: 1,
    manifest: 0,
    requires: ['Default dataset*'],
    sheets: {'spicySheet': 'img/spicyModIconSheet.png'},
    func: function() {
        /************************************************
         *           HERITAGE SETTINGS API              *
         ************************************************
         */

        // For starters, basically wraps/mimics the default policy definition, with a few additions
        G.hSetting = [];
        G.hSettingByName = [];
        G.hSettingCategory = [];
        G.HSettingsLoaded = false;

        G.HSetting = function(obj) {
            this.type = 'policy'; // required to work with G.checkReq()
            this.category = 'debug'; // best way to keep them hidden for now
            this.family = '';
            this.startWith = 0;
            this.icon = [0, 0];
            this.modes = [];
            this.mode = 0;
            this.req = {};

            this.cost = {};
            this.startsWith = true;
            this.visible = false;

            for (var i in obj) this[i] = obj[i];
            this.id = G.policy.length;
            if (!this.displayName) this.displayName = cap(this.name);
            if (!this.hcategory) this.hcategory = G.context.name;
            G.policy.push(this);
            G.policyByName[this.name] = this;
            G.setDict(this.name, this);
            if (this.modes.length == 0) {
                // no modes defined? auto-populate as simple on/off switch
                this.modes['off'] = { name: 'Disabled', desc: 'This policy is disabled.' };
                this.modes['on'] = { name: 'Enabled', desc: 'This policy is enabled.' };
                if (this.effectsOff) this.modes['off'].effects = this.effectsOff;
                if (this.effects) this.modes['on'].effects = this.effects;
                this.binary = true;
            }
            this.mod = G.context;

            // extra stuff here
            G.hSetting.push(this);
            G.hSettingByName[this.name] = this;
        }

        // wrapper function to make sure all settings are displayed when added
        G.addHSetting = function(obj) {
            new G.HSetting(obj);
            if (G.HSettingsLoaded) G.buildTabs(); // after initial load, rebuild the tabs to display new settings
        }

        // Add new government-related setting category
        G.addHSettingCategory({
            displayName: 'Government Modpack Settings',
            desc: 'Settings related to the government in your mod'
        });

        // Example government setting
        G.addHSetting({
            name: 'democracyEnabled',
            displayName: 'Enable Democracy',
            desc: 'Enable or disable the democracy system.',
            icon: [1, 1],
            modes: {
                'on': { name: 'Enabled', desc: 'Democracy is enabled.' },
                'off': { name: 'Disabled', desc: 'Democracy is disabled.' }
            },
            visible: true,
            hcategory: 'Government modpack options' // Assign it to the new government category
        });

        // Add more government-related settings as needed...

        /************************************************
         *             HERITAGE SETTINGS                *
         ************************************************
         */

        // Create a new button for each setting in the "Government modpack options" category
        G.writeHSettingButton({
            id: 'democracyEnabled',
            name: 'democracyEnabled',
            text: 'Enable Democracy',
            tooltip: 'Toggle whether the democracy system is enabled or disabled.'
        });

        // A function to write each category of settings and buttons
        G.writeHSettingCategories = function() {
            var str = '';
            for (c in G.hSettingCategory) {
                if (c == 'hidden') continue;
                var category = G.hSettingCategory[c];
                str += '<div class="barred fancyText">' + category.displayName + '</div>';
                for (var i in G.hSetting) {
                    var s = G.hSetting[i];
                    if (s.hcategory == c) {
                        if (s.type == 'setting') {
                            str += G.writeSettingButton({
                                id: s.id,
                                name: s.name,
                                text: s.displayName,
                                tooltip: s.desc
                            });
                        } else {
                            str += G.writeHSettingButton({
                                id: s.name,
                                name: s.name,
                                text: s.displayName,
                                tooltip: s.desc,
                            });
                        }
                    }
                }
                str += '<br /><br />';
            }
            return str;
        }
    }
});
