{
		G.tabs.push({
			name:'Government',
			id:'government',
			popup:true,
			addClass:'left',
			desc:'Set your Government.'
		});
		for (var i=0;i<G.tabs.length;i++){G.tabs[i].I=i;}
		G.buildTabs();
		
	}

	G.tabPopup['government']=function()
