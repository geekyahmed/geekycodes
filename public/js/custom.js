/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Home Slider
5. Init Video
6. Init Top Slider
7. Init Vid Slider
8. Init Events Slider
9. Init Grid


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var menuActive = false;
	var menu = $('.menu');
	var burger = $('.hamburger');

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initHomeSlider();
	initVideo();
	initTopSlider();
	initVidSlider();
	initEventsSlider();
	initGrid();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			if($('.hamburger').length)
			{
				burger.on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();

						$(document).one('click', function cls(e)
						{
							if($(e.target).hasClass('menu_mm'))
							{
								$(document).one('click', cls);
							}
							else
							{
								closeMenu();
							}
						});
					}
				});
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	4. Init Home Slider

	*/

	function initHomeSlider()
	{
		if($('.home_slider').length)
		{
			var homeSlider = $('.home_slider');
			homeSlider.owlCarousel(
			{
				items:1,
				autoplay:false,
				loop:true,
				smartSpeed:1200,
				dots:true,
				dotsContainer:'.custom_dots_home_slider',
				nav:false
			});

			if($('.home_slider_next').length)
			{
				$('.home_slider_next').on('click', function()
				{
					homeSlider.trigger('next.owl.carousel');
				});
			}

			if($('.custom_prev_home_slider').length)
			{
				$('.custom_prev_home_slider').on('click', function()
				{
					homeSlider.trigger('prev.owl.carousel');
				});
			}

			if($('.custom_next_home_slider').length)
			{
				$('.custom_next_home_slider').on('click', function()
				{
					homeSlider.trigger('next.owl.carousel');
				});
			}

			/* Custom dots events */
			if($('.custom_dot_home_slider').length)
			{
				$('.custom_dot_home_slider').on('click', function(ev)
				{	
					var dot = $(ev.target);
					$('.custom_dot_home_slider').removeClass('active');
					dot.addClass('active');
					homeSlider.trigger('to.owl.carousel', [$(this).index(), 300]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			homeSlider.on('changed.owl.carousel', function(event)
			{
				$('.custom_dot_home_slider').removeClass('active');
				$('.custom_dots_home_slider li').eq(event.page.index).addClass('active');
			});	
		}
	}

	/* 

	5. Init Video

	*/

	function initVideo()
	{
		if($("#P1").length)
		{
			$("#P1").YTPlayer();
			if($('.video_container').length)
			{
				var videos = $('.video_container');
				videos.each(function()
				{
					var video = $(this);
					video.on('click', function()
					{
						videos.removeClass('active');
						video.addClass('active');
					});
				});
			}
		}	
	}

	/* 

	6. Init Top Slider

	*/

	function initTopSlider()
	{
		if($('.sidebar_slider_top').length)
		{
			var topSlider = $('.sidebar_slider_top');
			
			topSlider.owlCarousel(
			{
				items:1,
				loop:true,
				autoplay:false,
				smartSpeed:1200,
				dots:true,
				dotsContainer:'.custom_dots_top',
				nav:false
			});

			if($('.custom_prev_top').length)
			{
				$('.custom_prev_top').on('click', function()
				{
					topSlider.trigger('prev.owl.carousel');
				});
			}

			if($('.custom_next_top').length)
			{
				$('.custom_next_top').on('click', function()
				{
					topSlider.trigger('next.owl.carousel');
				});
			}

			/* Custom dots events */
			if($('.custom_dot_top').length)
			{
				$('.custom_dot_top').on('click', function(ev)
				{	
					var dot = $(ev.target);
					$('.custom_dot_top').removeClass('active');
					dot.addClass('active');
					topSlider.trigger('to.owl.carousel', [$(this).index(), 300]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			topSlider.on('changed.owl.carousel', function(event)
			{
				$('.custom_dot_top').removeClass('active');
				$('.custom_dots_top li').eq(event.page.index).addClass('active');
			});	
		}
	}

	/* 

	7. Init Vid Slider

	*/

	function initVidSlider()
	{
		if($('.sidebar_slider_vid').length)
		{
			var vidSlider = $('.sidebar_slider_vid');
			
			vidSlider.owlCarousel(
			{
				items:1,
				loop:true,
				autoplay:false,
				smartSpeed:1200,
				dots:true,
				dotsContainer:'.custom_dots_vid',
				nav:false
			});

			if($('.custom_prev_vid').length)
			{
				$('.custom_prev_vid').on('click', function()
				{
					vidSlider.trigger('prev.owl.carousel');
				});
			}

			if($('.custom_next_vid').length)
			{
				$('.custom_next_vid').on('click', function()
				{
					vidSlider.trigger('next.owl.carousel');
				});
			}

			/* Custom dots events */
			if($('.custom_dot_vid').length)
			{
				$('.custom_dot_vid').on('click', function(ev)
				{	
					var dot = $(ev.target);
					$('.custom_dot_vid').removeClass('active');
					dot.addClass('active');
					vidSlider.trigger('to.owl.carousel', [$(this).index(), 300]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			vidSlider.on('changed.owl.carousel', function(event)
			{
				$('.custom_dot_vid').removeClass('active');
				$('.custom_dots_vid li').eq(event.page.index).addClass('active');
			});	
		}
	}

	/* 

	8. Init Events Slider

	*/

	function initEventsSlider()
	{
		if($('.sidebar_slider_events').length)
		{
			var vidSlider = $('.sidebar_slider_events');
			
			vidSlider.owlCarousel(
			{
				items:1,
				loop:true,
				autoplay:false,
				smartSpeed:1200,
				dots:true,
				dotsContainer:'.custom_dots_events',
				nav:false
			});

			if($('.custom_prev_events').length)
			{
				$('.custom_prev_events').on('click', function()
				{
					vidSlider.trigger('prev.owl.carousel');
				});
			}

			if($('.custom_next_events').length)
			{
				$('.custom_next_events').on('click', function()
				{
					vidSlider.trigger('next.owl.carousel');
				});
			}

			/* Custom dots events */
			if($('.custom_dot_events').length)
			{
				$('.custom_dot_events').on('click', function(ev)
				{	
					var dot = $(ev.target);
					$('.custom_dot_events').removeClass('active');
					dot.addClass('active');
					vidSlider.trigger('to.owl.carousel', [$(this).index(), 300]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			vidSlider.on('changed.owl.carousel', function(event)
			{
				$('.custom_dot_events').removeClass('active');
				$('.custom_dots_events li').eq(event.page.index).addClass('active');
			});	
		}
	}

	/* 

	9. Init Grid

	*/

	function initGrid()
	{
		setTimeout(function()
		{
			$('.grid').masonry(
			{
				itemSelector:'.grid-item',
				columnWidth: '.card_default',
				gutter:30
			});
		}, 500);
			
	}

});