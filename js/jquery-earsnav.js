(function($) {
	$.fn.earsnav = function(options) {
		var defaults = {
			wrapperCSS : {},
			pointerSize: 14,
			textTransform: 'none',
			opacity: .8,
			backgroundColor: '#234',
			fontColor: '#eee',
			fontFamily: 'Arial, Helvetica, sans-serif',
			fontSize: '18px',
			letterSpacing: '-1px',
			prevEl: '#prev',
			nextEl: '#next',
			minWidth: 50,
			maxWidth: 250,
			container: 'body',
			titlePrev: 'Older',
			titleNext: 'Newer',
			shadow: true,
			borderRadius: 5,
			slideText: true,
			type: null
		};

		var settings = $.extend(true, {}, defaults, options);

		return this.each(function() { // Main
			
			var el = new Array();
			if(settings.type !== null && settings.type == 'next'){ // is it a single "next"? let's fake the "prev"
				el[0] = undefined;
			} else if($(settings.prevEl).length > 0){
				el[0] = $(settings.prevEl);
			}
			if(settings.type !== null && settings.type == 'prev'){ // is it a single "prev"? let's fake the "next"
				el[1] = undefined;
			} else if($(settings.nextEl).length > 0){
				el[1] = $(settings.nextEl);
			}

			$.each(el, function (i, e) {
				if(typeof e !== 'undefined'){
					var side = (i === 0)?'left':'right';
					drawIt(this.html(), this.attr('href'), side);
					this.hide();
				}
			});
		});

		function drawIt (title, href, side) {
			// Elements Styles
			var wrapperStyle = {
				background: settings.backgroundColor,
				color: settings.fontColor,
				fontFamily: settings.fontFamily,
				fontSize: settings.fontSize,
				letterSpacing: settings.letterSpacing,
				textTransform: settings.textTransform,
				textDecoration: 'none',
				opacity: settings.opacity,
				position: 'fixed',
				display: 'block',
				width: settings.minWidth,
				height: settings.fontSize,
				padding: '60px 10px',
				lineHeight: '1',
				overflow: 'visible',
				'zoom': 1,
				zIndex: 100
			};

			var pointerStyle = {
				borderWidth: settings.pointerSize,
				borderStyle: 'solid',
				borderColor: ((side == 'right')?'transparent transparent transparent '+ settings.backgroundColor:'transparent '+ settings.backgroundColor +' transparent transparent'),
				display: 'block',
				position: 'fixed',
				'zoom': 1,
				zIndex: 101
			};

			var defaultTitleStyle = {
				cursor: 'pointer'
			};

			var articleTitleStyle = {
				position: 'absolute',
				cursor: 'pointer'
			};

			// Elements
			var $wrapper = $('<a />')
				.attr('id', 'earsnav-'+ side)
				.addClass('earsnav')
				.css(wrapperStyle)
				.css(settings.wrapperCSS) // Set Extra CSS!
				.attr('href', href);

			var $defaultTitle = $('<span />')
				.addClass('earsnav-default-title')
				.css(defaultTitleStyle)
				.html(((side == 'right')?settings.titleNext:settings.titlePrev));

			var $articleTitle = $('<span />')
				.addClass('earsnav-article-title')
				.css( articleTitleStyle )
				.css({top: $($wrapper).outerHeight(true) / 2})
				.html( title );

			if(settings.pointerSize > 0){ // is the pointer size defined?
				var $pointer = $('<strong />')
					.css(pointerStyle);
				if(side == 'right')
					$pointer.css({right:-settings.pointerSize});
				else
					$pointer.css({left:-settings.pointerSize});
	
				$pointer.css({
					top : $(window).height() / 2 - $($pointer).outerHeight(true) / 2
				});
				$pointer.appendTo($wrapper);
			}

			// Extra Styles
			if(settings.borderRadius > 0) // Rounded Corners?
				$wrapper.css({
					'-moz-border-radius': settings.borderRadius +'px',
					'-webkit-border-radius': settings.borderRadius +'px',
					'border-radius': settings.borderRadius +'px'
				});

			if(settings.shadow === true) // Drop Shadow Perhaps?
				$wrapper.css({
					'-moz-box-shadow': '0 2px 6px rgba(50, 50, 50, .5)',
					'-webkit-box-shadow': '0 2px 6px rgba(50, 50, 50, .5)',
					'box-shadow': '0 2px 6px rgba(50, 50, 50, .5)'
				});

			// Side Specific Styles
			if(side == 'right'){
				$wrapper.css({
					right: settings.pointerSize,
					textAlign: 'right'
				});
				$articleTitle.css({right: 10});
			} else {
				$wrapper.css({
					left: settings.pointerSize
				});
				$articleTitle.css({
					left: 10
				});
			}

			$wrapper.css({ // Needed AFTER the Element was created :(
				top : $(window).height() / 2 - $($wrapper).outerHeight(true) / 2
			});

			// IE Workarounds
			if($.browser.msie){
				$wrapper.css({
					zIndex: 'inherit'
				})
				$pointer.css({
					opacity: settings.opacity,
					top : $(window).height() / 2 - $($pointer).outerHeight(true) / 2
				});
				$articleTitle.css({
					top: $($wrapper).outerHeight(true) / 2
				});
			}

			$defaultTitle.appendTo($wrapper);
			$articleTitle.appendTo($wrapper);
			$wrapper.appendTo(settings.container);

			$('.earsnav-article-title').hide();
			if(isMobileSafari() == true){
				$($wrapper).click(onHover).mouseout(onOut);
			} else {
				$($wrapper).hover(onHover, onOut);
			}

			// Is anybody resizing (or scrolling in iOs) the browser window?? Let's repositionate stuff ASAP
			if(isMobileSafari() == true)
				$(document).bind('scroll', function () {
					if($pointer)
						$pointer.css({
							position: 'absolute',
							top : $($wrapper).height() / 2 - $($pointer).outerHeight(true) / 2
						});
					$wrapper.css({
						position: 'absolute',
						top : $(window).height() / 2 + $(window).scrollTop() - $($wrapper).outerHeight(true) / 2 + 44
					});
				});
			else
				$(window).bind('resize', function () {
					if($pointer)
						$pointer.css({
							top : $(window).height() / 2 - $($pointer).outerHeight(true) / 2
						});
					$wrapper.css({
						top : $(window).height() / 2 - $($wrapper).outerHeight(true) / 2
					});
				});
		}

		// Effects
		function onHover() {
			$(this).children('.earsnav-default-title').animate({
				opacity: 'hide'
			}, 100, function() {
				if($.browser.msie)
					$(this).parent().children('strong').animate({
						opacity: 1
					}, 75);
				$(this).parent().animate({
					opacity: 1,
					width: settings.maxWidth
				}, 75, function() {
					$(this).children('.earsnav-article-title').animate({opacity: 'show'}, 100);
					$(this).children('.earsnav-article-title').css({
						marginTop: -($($(this).children('.earsnav-article-title')).outerHeight() / 2)
					});
					if(isMobileSafari() == true)
						$(this).bind('click', mSafariGo);
						
				});
			});
			return false;
		}
		function onOut() {
			$(this).children('.earsnav-article-title').animate({
				opacity: 'hide'
			}, 100, function() {
				if($.browser.msie)
					$(this).parent().children('strong').animate({
						opacity: settings.opacity
					}, 75);
				$(this).parent().animate({
					opacity: settings.opacity,
					width: settings.minWidth
				}, 75, function() {
					$(this).children('.earsnav-default-title').animate({opacity: 'show'}, 100);
					if(isMobileSafari() == true)
						$(this).unbind('click', mSafariGo);
				});
			});
			return false;
		}

		// Mobile Safari Detection
		function isMobileSafari() {
			return ((navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) != null)? true: false);
		}
		function mSafariGo() {
			window.location = $(this).attr('href');
		}
	}
})(jQuery);