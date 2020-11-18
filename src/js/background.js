
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

		function get_stream_data () {

			return new Promise( async ( resolve ) => {

				try {

					var response = await fetch( "https://www.youtube.com/c/DrDisRespect" );
					var text = await response.text();

					console.log( text );

					var match = text.match( /window\[\"ytInitialData\"\] \= (.+);\n/ );

					console.log( match[ 1 ] );
					console.log( JSON.parse( match[ 1 ] ) );

					var yt_initial_data = JSON.parse( match[ 1 ] );
					var video_renderer = yt_initial_data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelFeaturedContentRenderer.items[0].videoRenderer;
					var thumbnail_overlays = video_renderer.thumbnailOverlays;
					var live_flag = false;

					for ( var i = thumbnail_overlays.length; i--; ) {

						if ( thumbnail_overlays[ i ].thumbnailOverlayTimeStatusRenderer && thumbnail_overlays[ i ].thumbnailOverlayTimeStatusRenderer.style === "LIVE" ) {

							live_flag = true;
							break;

						};

					};

					console.log( "live_flag", video_renderer, live_flag );

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