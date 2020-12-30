
	( function () {

		var _state = {

			stream_data: null,
			side_nav_section: null,

		};

		function get_item_html ( stream_data ) {

			if ( stream_data && stream_data.live && stream_data.view_count_text ) {

				return `
					<a class="side-nav-card__link tw-align-items-center tw-flex tw-flex-nowrap tw-full-width tw-interactive tw-link tw-link--hover-underline-none tw-pd-x-1 tw-pd-y-05" data-a-id="followed-channel-0" data-test-selector="followed-channel" href="https://www.youtube.com/watch?v=${ stream_data.video_id }" target = "_blank" >

						<div class="side-nav-card__avatar tw-align-items-center tw-flex-shrink-0">
							<figure aria-label="DrDisRespect" class="tw-avatar tw-avatar--size-30">
								<img class="tw-block tw-border-radius-rounded tw-image tw-image-avatar" alt="DrDisRespect" src="${ chrome.extension.getURL( "/img/the_two_time.jpg" ) }">
							</figure>
						</div>

						<div class="tw-ellipsis tw-flex tw-full-width tw-justify-content-between">

							<div data-a-target="side-nav-card-metadata" class="tw-ellipsis tw-full-width tw-mg-l-1">
								<div class="side-nav-card__title tw-align-items-center tw-flex">
									<p data-a-target="side-nav-title" class="tw-c-text-alt tw-ellipsis tw-ellipsis tw-flex-grow-1 tw-font-size-5 tw-line-height-heading tw-semibold" title="DrDisRespect">DrDisRespect</p>
								</div>
								<div class="side-nav-card__metadata tw-pd-r-05" data-a-target="side-nav-game-title">
									<p class="tw-c-text-alt-2 tw-ellipsis tw-font-size-6 tw-line-height-heading" title="Gaming">Gaming</p>
								</div>
							</div>

							<div class="side-nav-card__live-status tw-flex-shrink-0 tw-mg-l-05" data-a-target="side-nav-live-status">
								<div class="tw-align-items-center tw-flex">
									<div class="ScChannelStatusIndicator-sc-1cf6j56-0 fSVvnY tw-channel-status-indicator" data-test-selector="0"></div>
									<div class="tw-mg-l-05"><span data-test-selector="1" aria-label="7.4K viewers" class="tw-c-text-alt tw-font-size-6">${ stream_data.view_count_text }</span></div>
								</div>
							</div>

						</div>

					</a>
				`;

			} else {

				return `
					<a class="side-nav-card__link tw-align-items-center tw-flex tw-flex-nowrap tw-full-width tw-interactive tw-link tw-link--hover-underline-none tw-pd-x-1 tw-pd-y-05" data-a-id="followed-channel-4" data-test-selector="followed-channel" href="https://www.youtube.com/c/DrDisRespect" target = "_blank" >
						<div class="side-nav-card__avatar side-nav-card__avatar--offline tw-align-items-center tw-flex-shrink-0">
							<figure aria-label="DrDisRespect" class="tw-avatar tw-avatar--size-30"><img class="tw-block tw-border-radius-rounded tw-image tw-image-avatar" alt="DrDisRespect" src="${ chrome.extension.getURL( "/img/the_two_time.jpg" ) }"></figure>
						</div>
						<div class="tw-ellipsis tw-flex tw-full-width tw-justify-content-between">
							<div data-a-target="side-nav-card-metadata" class="tw-ellipsis tw-full-width tw-mg-l-1">
								<div class="side-nav-card__title tw-align-items-center tw-flex">
									<p data-a-target="side-nav-title" class="tw-c-text-alt tw-ellipsis tw-ellipsis tw-flex-grow-1 tw-font-size-5 tw-line-height-heading tw-semibold" title="DrDisRespect">DrDisRespect</p>
								</div>
								<div class="side-nav-card__metadata tw-pd-r-05" data-a-target="side-nav-game-title">
									<p class="tw-c-text-alt-2 tw-ellipsis tw-font-size-6 tw-line-height-heading"></p>
								</div>
							</div>
							<div class="side-nav-card__live-status tw-flex-shrink-0 tw-mg-l-05" data-a-target="side-nav-live-status"><span class="tw-c-text-alt tw-font-size-6">Offline</span></div>
						</div>
					</a>
				`;

			};

		};

		function create_and_render_model () {

			if ( document.querySelector( '.drdisrespect-nav-section' ) === null && _state.side_nav_section && _state.stream_data ) {

				$( _state.side_nav_section ).before( `

					<style>

						.drdisrespect-collapsed-header {

							position: absolute;
							left: -10000px;

						}

						.drdisrespect-expanded-header {

							display: none !important; 

						}

						.side-nav--collapsed .drdisrespect-collapsed-header {

							position: static;

						}

						.side-nav--expanded .drdisrespect-expanded-header {

							display: flex !important;

						}

					</style>

					<div aria-label="Main Channel" class="side-nav-section drdisrespect-nav-section" role="group" >

						<div class="side-nav-header tw-mg-1 tw-pd-t-05 drdisrespect-expanded-header" data-a-target="side-nav-header-expanded">
							<h5 class="tw-font-size-6 tw-semibold tw-upcase">Main Channel</h5>
						</div>

						<div class="side-nav-header tw-align-items-center tw-c-text-alt-2 tw-flex tw-flex-wrap tw-justify-content-center tw-mg-1 drdisrespect-collapsed-header" data-a-target="side-nav-header-collapsed">

							<figure class="ScFigure-sc-1j5mt50-0 laJGEQ tw-svg">
								<svg type="color-fill-current" width="20px" height="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScSvg-sc-1j5mt50-1 hAChQG">
									<g>
										<path fill-rule="evenodd" d="M9.171 4.171A4 4 0 006.343 3H6a4 4 0 00-4 4v.343a4 4 0 001.172 2.829L10 17l6.828-6.828A4 4 0 0018 7.343V7a4 4 0 00-4-4h-.343a4 4 0 00-2.829 1.172L10 5l-.829-.829zm.829 10l5.414-5.414A2 2 0 0016 7.343V7a2 2 0 00-2-2h-.343a2 2 0 00-1.414.586L10 7.828 7.757 5.586A2 2 0 006.343 5H6a2 2 0 00-2 2v.343a2 2 0 00.586 1.414L10 14.172z" clip-rule="evenodd"></path>
									</g>
								</svg>
							</figure>

						</div>

						<div class="tw-relative tw-transition-group">
							<div class="tw-transition tw-transition--enter-done tw-transition__scale-over tw-transition__scale-over--enter-done" style="transition: transform 250ms ease 0ms, opacity;">
								<div>
									<div>

										<div class="side-nav-card tw-align-items-center tw-flex tw-relative drdisrespect-item-container" >

											${ get_item_html( _state.stream_data ) }

										</div>

									</div>
								</div>
							</div>
						</div>
					</div>

				` );

			};

			if ( _state.stream_data && _state.side_nav_section ) {

				$( ".drdisrespect-item-container" ).html( get_item_html( _state.stream_data ) );

			};

		};

		function handle_tick () {

			if ( document.querySelector( '.drdisrespect-nav-section' ) === null ) {

				var side_nav_section = document.querySelector( "div.side-nav-section" );

				if ( side_nav_section ) {

					_state.side_nav_section = side_nav_section;
					create_and_render_model();

				};

			};

		};

		function handle_tick_long () {

			chrome.runtime.sendMessage( "get_stream_data", function ( data ) {

				_state.stream_data = data;
				create_and_render_model();

			});

		};

		setInterval( handle_tick, 1000 );
		setInterval( handle_tick_long, 3 * 60 * 1000 );

		chrome.runtime.sendMessage( "get_stream_data", function ( data ) {

			_state.stream_data = data;
			create_and_render_model();

		});

	} () );