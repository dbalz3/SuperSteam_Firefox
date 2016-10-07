function add_total_drops_count() {
	if (is_signed_in && $(".profile_small_header_texture a")[0].href == $(".playerAvatar:first a")[0].href.replace(/\/$/, "")) {
		var drops_count = 0,
			drops_games = 0,
			completed = false;

		if ($(".pagebtn").length) {
			$(".profile_xp_block_right").prepend("<div id='es_calculations'><div class='btn_grey_black btn_small_thin'><span>" + localized_strings.drop_calc + "</span></div></div>");

			$("#es_calculations").click(function() {
				if (completed == false) {
					$("#es_calculations").text(localized_strings.loading);

					// First, get the contents of the first page
					$(".badge_title_stats_drops").find(".progress_info_bold").each(function(i, node) {
						var count = $(node).text().match(/(\d+)/);

						if (count) {
							drops_games = drops_games + 1;
							drops_count += +count[1];
						}
					});

					// Now, get the rest of the pages
					var base_url = window.location.origin + window.location.pathname + "?p=",
						last_page = parseFloat($(".profile_paging:first").find(".pagelink:last").text()),
						deferred = new $.Deferred(),
						promise = deferred.promise(),
						pages = [];

					for (page = 2; page <= last_page; page++) {
						pages.push(page);
					}

					$.each(pages, function (i, item) {
						promise = promise.then(function() {
							return $.ajax(base_url + item).done(function(data) {
								$(data).find(".badge_title_stats_drops").find(".progress_info_bold").each(function(i, node) {
									var count = $(node).text().match(/(\d+)/);

									if (count) {
										drops_games = drops_games + 1;
										drops_count += +count[1];
									}
								});
							});
						});
					});

					promise.done(function() {
						add_drops_count();
					});
					
					deferred.resolve();
					completed = true;
				}
			});
		} else {
			$(".profile_xp_block_right").prepend("<div id='es_calculations'>" + localized_strings.drop_calc + "</div>");
			$(".badge_title_stats_drops").find(".progress_info_bold").each(function(i, node) {
				var count = $(node).text().match(/(\d+)/);

				if (count) {
					drops_games = drops_games + 1;
					drops_count += +count[1];
				}
			});

			add_drops_count();
		}

		function add_drops_count() {
			$("#es_calculations").html(localized_strings.card_drops_remaining.replace("__drops__", drops_count) + "<br>" + localized_strings.games_with_drops.replace("__dropsgames__", drops_games));

			get_http("//steamcommunity.com/my/ajaxgetboostereligibility/", function(txt) {
				var booster_games = txt.match(/class="booster_eligibility_game"/g),
					booster_games = booster_games && booster_games.length || 0;

				$("#es_calculations").append("<br>" + localized_strings.games_with_booster.replace("__boostergames__", booster_games));
			});
		}

		//if ($(".badge_details_set_favorite").find(".btn_grey_black").length > 0) {
		//	$(".badge_details_set_favorite").append("<a class='btn_grey_black btn_small_thin' href='//steamcommunity.com/tradingcards/faq'><span>" + localized_strings.faqs + "</span></a>");
		//}
	}
}
