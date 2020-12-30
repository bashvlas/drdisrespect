
	( async function () {

		function parse_view_count_text ( text ) {

			var number = parseInt( text.replace( /[^0-9]/g, "" ) );

			if ( number < 1000 ) {

				return `${ number }`;

			} else if ( number < 1000 * 1000 ) {

				return `${ Math.floor( number / 1000 ) }K`;

			} else if ( number < 1000 * 1000 * 1000 ) {

				return `${ Math.floor( number / ( 1000 * 1000 ) ) }M`;

			} else if ( number < 1000 * 1000 * 1000 * 1000 ) {

				return `${ Math.floor( number / ( 1000 * 1000 * 1000 ) ) }B`;

			} else if ( number < 1000 * 1000 * 1000 * 1000 * 1000 ) {

				return `${ Math.floor( number / ( 1000 * 1000 * 1000 * 1000 ) ) }T`;

			} else {

				return `ALL`;

			};

		};

		function youtube_page_text_to_video_renderer ( text ) {

			var match_1 = text.match( /window\[\"ytInitialData\"\] \= (.+);\n/ );
			var match_2 = text.match( /var ytInitialData \= (.+)\;\<\/script\>/ );

			if ( match_1 ) {

				var yt_initial_data = JSON.parse( match_1[ 1 ] );

			} else if ( match_2 ) {

				var yt_initial_data = JSON.parse( match_2[ 1 ] );

			} else {

				return null;

			};

			try {

				var video_renderer_1 = yt_initial_data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelFeaturedContentRenderer.items[0].videoRenderer;

			} catch ( e ) {

				var video_renderer_1 = null;

			};

			try {

				var video_renderer_2 = yt_initial_data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items[ 0 ].gridVideoRenderer;

			} catch ( e ) {

				var video_renderer_2 = null;

			};

			return video_renderer_1 || video_renderer_2;

		};

		function get_stream_data () {

			return new Promise( async ( resolve ) => {

				try {

					var response = await fetch( "https://www.youtube.com/c/DrDisRespect" );
					var text = await response.text();

					var video_renderer = youtube_page_text_to_video_renderer( text );

					var thumbnail_overlays = video_renderer.thumbnailOverlays;
					var live_flag = false;

					for ( var i = thumbnail_overlays.length; i--; ) {

						if ( thumbnail_overlays[ i ].thumbnailOverlayTimeStatusRenderer && thumbnail_overlays[ i ].thumbnailOverlayTimeStatusRenderer.style === "LIVE" ) {

							live_flag = true;
							break;

						};

					};

					if ( live_flag ) {

						var view_count_text = video_renderer.viewCountText.runs[ 0 ].text;

						resolve({

							live: true,
							view_count_text: parse_view_count_text( view_count_text ),
							video_id: video_renderer.videoId,

						});

					} else {

						resolve({ live: false });

					};

				} catch ( e ) {

					resolve({ live: false });

				};

			});

		};

		chrome.runtime.onMessage.addListener( ( message, sender, callback ) => {

			if ( message === "get_stream_data" ) {

				get_stream_data().then( callback );

				return true;

			};

		});

	} () );