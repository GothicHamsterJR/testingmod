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

        // Initialize settings arrays
        G.hSetting = [];
        G.hSettingByName = [];
        G.hSettingCategory = [];
        G.HSettingsLoaded = false;

        // Setting constructor function
        G.HSetting = function(obj) {
            this.type = 'policy'; 
            this.category = 'debug'; 
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
                // Auto-populate with default on/off if no modes are defined
                this.modes['off'] = { name: 'Disabled', desc: 'This policy is disabled.' };
                this.modes['on'] = { name: 'Enabled', desc: 'This policy is enabled.' };
                if (this.effectsOff) this.modes['off'].effects = this.effectsOff;
                if (this.effects) this.modes['on'].effects = this.effects;
                this.binary = true;
            }
            this.mod = G.context;

            G.hSetting.push(this);
            G.hSettingByName[this.name] = this;
        }

        // Function to add new settings
        G.addHSetting = function(obj) {
            new G.HSetting(obj);
            if (G.HSettingsLoaded) G.buildTabs(); // Rebuild UI if settings are loaded
        }

        // Add a settings category
        G.addHSettingCategory({
            displayName: 'Government Modpack Settings',
            desc: 'Settings related to the government in your mod'
        });

        // Example government setting: Democracy
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
            hcategory: 'Government modpack options'
        });

        // Example government setting: Monarchy
        G.addHSetting({
            name: 'monarchyEnabled',
            displayName: 'Enable Monarchy',
            desc: 'Enable or disable the monarchy system.',
            icon: [2, 2],
            modes: {
                'on': { name: 'Enabled', desc: 'Monarchy is enabled.' },
                'off': { name: 'Disabled', desc: 'Monarchy is disabled.' }
            },
            visible: true,
            hcategory: 'Government modpack options'
        });

        /************************************************
         *              ADDING A GOVERNMENT TAB         *
         ************************************************
         */

        // Add a Government tab to the UI
        G.addTab({
            name: 'governmentSettingsTab',
            displayName: 'Government Settings',
            category: 'settings', // Specify where the tab will go
            active: false, // Start inactive
            content: function() {
                return G.writeHSettingCategories();
            }
        });

        // Function to handle the writing of settings categories and buttons
        G.writeHSettingCategories = function() {
            var str = '';
            for (var c in G.hSettingCategory) {
                if (c == 'hidden') continue;
                var category = G.hSettingCategory[c];
                str += '<div class="barred fancyText">' + category.displayName + '</div>';
                for (var i in G.hSetting) {
                    var s = G.hSetting[i];
                    if (s.hcategory == c) {
                        str += G.writeHSettingButton({
                            id: s.name,
                            name: s.name,
                            text: s.displayName,
                            tooltip: s.desc,
                        });
                    }
                }
                str += '<br /><br />';
            }
            return str;
        }

        /************************************************
         *             INITIATE TAB SYSTEM             *
         ************************************************
         */

        // This function initializes the tab system, adding a Government tab among other settings
        G.buildTabs = function() {
            var tabsContainer = document.getElementById('tabsContainer'); // Assuming an element with this ID exists
            tabsContainer.innerHTML = ''; // Clear existing tabs

            // Add all tabs, including the new Government tab
            G.tabs.forEach(function(tab) {
                var tabElement = document.createElement('div');
                tabElement.classList.add('tab');
                tabElement.id = tab.name;
                tabElement.innerHTML = tab.displayName;
                tabElement.onclick = function() {
                    // Handle tab selection
                    G.selectTab(tab);
                };
                tabsContainer.appendChild(tabElement);
            });

            // Show the Government Settings tab by default (or any other tab logic you want)
            G.selectTab(G.tabs[0]);
        }

        // Tab selection function
        G.selectTab = function(tab) {
            var tabsContainer = document.getElementById('tabsContainer');
            var contentContainer = document.getElementById('contentContainer');

            // Clear all active tabs
            tabsContainer.querySelectorAll('.tab').forEach(function(tabElement) {
                tabElement.classList.remove('active');
            });

            // Remove all previous content
            contentContainer.innerHTML = '';

            // Add active class to the selected tab
            document.getElementById(tab.name).classList.add('active');

            // Display the content for the selected tab
            contentContainer.innerHTML = tab.content();
        }

        // Initialize tabs if not already loaded
        if (!G.HSettingsLoaded) {
            G.buildTabs(); // Build tabs once all settings are loaded
            G.HSettingsLoaded = true;
        }
    }
});
