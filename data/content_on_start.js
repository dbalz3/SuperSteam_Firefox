//This file prevents HighlightPlayer from first initialisation by using our own stub file instead.
var s = document.createElement('script');
s.src = s.src = self.options.highlight_player_stub;
s.onload = function() {
	this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

/*function loadHighlightPlayerStub() {
	var addedHighlightPlayerStub = false;
	return {
		addScript:function(){
			console.log ("loading request");
			if(!addedHighlightPlayerStub){
				console.log ("load script");
				var s = document.createElement('script');
				s.src = s.src = self.options.highlight_player_stub;
				s.onload = function() {
					this.parentNode.removeChild(this);
				};
				(document.head || document.documentElement).appendChild(s);
				addedHighlightPlayerStub = true;
			}
		}
	}
}*/
//var highlightplayer = loadHighlightPlayerStub();
//highlightplayer.addScript();