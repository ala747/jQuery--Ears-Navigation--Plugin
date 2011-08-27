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

		return this.each(function() {
			
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
					drawIt($(this).html(), $(this).attr('href'), side);
					$(this).hide();
				}
			});
		});

		function onHover() {
			$(this).children('.earsnav-default-title').animate({
				opacity: 'hide'
			},
			100,
			function() {
				$(this).parent().animate({
					opacity: 1,
					width: settings.maxWidth
				},
				75,
				function() {
					
					$(this).children('.earsnav-article-title').animate({opacity: 'show'}, 100);
					$(this).children('.earsnav-article-title').css({
						marginTop: -($($(this).children('.earsnav-article-title')).outerHeight() / 2)
					});
				});
			});

			return false;
		}
		function onOut() {
			$(this).children('.earsnav-article-title').animate({
				opacity: 'hide'
			},
			100,
			function() {
				$(this).parent().animate({
					opacity: settings.opacity,
					width: settings.minWidth
				},
				75,
				function() {
					$(this).children('.earsnav-default-title').animate({opacity: 'show'}, 100);
				});
			});

			return false;
		}

		function drawIt (title, href, side) {
			
			var $style = {
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
				zIndex: 10000
			};
			
			var $wrapper = $('<a />')
				.attr('id', 'earsnav-'+ side)
				.addClass('earsnav')
				.css($style)
				.css(settings.wrapperCSS) // ** Set CSS!
				.attr('href', href);
			var wrapperHeight = $($wrapper).outerHeight(true);  
			var windowHeight = $(window).height();
			
			var $defaultTitle = $('<span />')
				.addClass('earsnav-default-title')
				.css({})
				.html(((side == 'right')?settings.titleNext:settings.titlePrev));
			var $articleTitle = $('<span />')
				.addClass('earsnav-article-title')
				.css({
					top : wrapperHeight / 2 +'px',
					position: 'absolute'
				})
				.html( title );
			if(side == 'right')
					$articleTitle.css({right: 10});
				else
					$articleTitle.css({left: 10});

			if(settings.pointerSize > 0){
				var $pointer = $('<strong />')
					.css({
						borderWidth: settings.pointerSize,
						borderStyle: 'solid',
						borderColor: ((side == 'right')?'transparent transparent transparent '+ settings.backgroundColor:'transparent '+ settings.backgroundColor +' transparent transparent'),
						display: 'block',
						position: 'fixed',
						'zoom': 1,
						//top: windowHeight / 2 - $($pointer).outerHeight() / 2,
					});
				if(side == 'right')
					$pointer.css({right:-settings.pointerSize});
				else
					$pointer.css({left:-settings.pointerSize});
	
				$pointer.css({
					"top" : windowHeight / 2 - $($pointer).outerHeight(true) / 2
				});
					//.html(((side == 'right')?'&#9654;':'&#9664;'));
				$pointer.appendTo($wrapper);
			}

			if(settings.borderRadius > 0)
				$wrapper.css({
					'-moz-border-radius': settings.borderRadius +'px',
					'-webkit-border-radius': settings.borderRadius +'px',
					'border-radius': settings.borderRadius +'px'
				});
			if(settings.shadow === true)
				$wrapper.css({
					'-moz-box-shadow': '0 2px 6px rgba(50, 50, 50, .5)',
					'-webkit-box-shadow': '0 2px 6px rgba(50, 50, 50, .5)',
					'box-shadow': '0 2px 6px rgba(50, 50, 50, .5)',
				});
			if(side == 'right')
				$wrapper.css({
					right: settings.pointerSize,
					textAlign: 'right'
				});
			else
				$wrapper.css({left:settings.pointerSize});
			$wrapper.css({
				"top" : windowHeight / 2 - wrapperHeight / 2
			}
				
			);

			$defaultTitle.appendTo($wrapper);
			$articleTitle.appendTo($wrapper);
			$wrapper.appendTo(settings.container);
			
			$('.earsnav-article-title').hide();
			$($wrapper).hover(onHover, onOut);
		}
	}
})(jQuery);