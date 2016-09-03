//Main app logic located here

var r = /\d+/;
var app_id = document.location.href.match(r)[0]

//chrome.runtime.sendMessage({action: "gaPageID", data:app_id})

var s = document.createElement('script');
s.src = self.options.highlight_player_updated;
s.onload = function() {
	this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);


//We have our player injected at this point
$.ajax({
	url: "//www.fairsteam.com/app/"+app_id+"?api_version=2",
	dataType: 'json',
    timeout: 5000,
	success: function(data){ 
		var formated_array = new Object();
		var thumb_data = new Object();
        var channel_data = new Object();

		if (!data['data']) return
		
		videos = data['data']['videos']
		rating_change = data['data']['rating_change']
		
		if(videos && videos.length>0)
		{
			for (var i = videos.length; i--;) {
				var item = videos[i];
				
				formated_array['yv_'+item.yid] = item.yid
				thumb_data['yv_'+item.yid] = item.thumb
				channel_data['yv_'+item.yid] = item.channel
			}
			
			for(key in thumb_data) {
				var channel_name = channel_data[key].length > 17 ? channel_data[key].substring(0,14)+"..." : channel_data[key];

				highlight_strip_youtube = '<div class="highlight_strip_item highlight_strip_youtube" id="thumb_youtube_'+ key +'">'+
					'<img style="max-width: 100%;max-height:100%;" src="'+thumb_data[key]+'">'+
					'<div class="highlight_youtube_marker"></div>'+
					'<div class="highlight_channel_marker">'+channel_name+'</div>'+
				'</div>'
				
				$('.highlight_selector').after(highlight_strip_youtube);
			
				highlight_youtube = '<div style="display: none;" class="highlight_player_item highlight_youtube tall" id="highlight_youtube_'+key+'">'+
							'<div id="youtube_'+key+'"/>'+

						'</div>'

				$('.highlight_player_area_spacer').after(highlight_youtube);
			}
			
			$('#highlight_strip_scroll').width($('#highlight_strip_scroll').width() + Object.keys(formated_array).length*120)
			
			var youtubeUrlCode = 'var rgYoutubeURLs = ' + JSON.stringify(formated_array); + ';';

			var script = document.createElement('script');
			script.textContent = youtubeUrlCode;
			(document.head || document.documentElement).appendChild(script);
			script.parentNode.removeChild(script);
		}
	},
	error: function(data) {
		console.log('Cant reach api server'); 
		
		//chrome.runtime.sendMessage({action: "gaPageFailure"})
	},
	complete: function(data) {
		runPlayerInit()
	}
});

var runPlayerInit = function(){
	var s = document.createElement('script');
	s.src = self.options.player_init;
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);
}

