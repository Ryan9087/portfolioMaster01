/*global $, jQuery, alert*/
$(function () {
   
    'use strict';
    
    // owlCarousel
	$('.slider .owl-carousel').owlCarousel({
		items: 1,
		loop: true,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        animateOut: 'fadeOut'
	});

	// owlCarousel
	$('.carousel .owl-carousel').owlCarousel({
		items: 1,
		loop: true,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500
	});
    
    // scrollIt
    $.scrollIt({
        upKey: 38,                // key code to navigate to the next section
        downKey: 40,              // key code to navigate to the previous section
        easing: 'linear',         // the easing function for animation
        scrollTime: 600,          // how long (in ms) the animation takes
        activeClass: 'active',    // class given to the active nav element
        onPageChange: null,       // function(pageIndex) that is called when page is changed
        topOffset: -78            // offste (in px) for fixed top navigation
    });
    
    // navbar scrolling background
    $(window).on('scroll', function () {
        var navbar = $('.navbar');
        if ($(window).scrollTop() >= navbar.height()) {
            navbar.addClass('nav-scroll');
        } else {
            navbar.removeClass('nav-scroll');
        }
    });
    
    // button scroll to top
    $(window).on('scroll', function () {
        var buttonTop = $('.button-top');
        if ($(this).scrollTop() >= 700) {
            buttonTop.show();
        } else {
            buttonTop.hide();
        }
    });
    
    // progress bar
    $(window).on('scroll', function () {
        $(".skills-progress span").each(function () {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight(),
                bottom_of_window = $(window).scrollTop() + $(window).height(),
                myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width : myVal
                });
            }
        });
    });
    
    // owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500
    });
    
    // services-tabs
    $('.services-tabs').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.services-tab-content .services-item').hide();
        $('.' + $(this).data('class')).fadeIn();
    });
    
    // magnificPopup
    $('.portfolio .link').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    
    // contact map toggle
    $('.contact-map').on('click', '.map-toggle', function () {
        $('.contact-map .map').slideToggle(10);
        $('.contact-map .map-toggle span').toggleClass("open");
    });
    
});


$(window).on('load', function () {
    
    'use strict';
    
    // Preloader
    $('.loading').fadeOut(500);
    
    
    // isotope
    var $gallery = $('.gallery').isotope({
        // options
        itemSelector: '.item-img'
    });
   
    // filter items on button click
    $('.filtering').on('click', 'span', function () {
        var filterValue = $(this).attr('data-filter');
        $gallery.isotope({ filter: filterValue });
    });
    
    // add active class to filter button
    $('.filtering span').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    
    
    // contact form
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type,
                        messageText = data.message,
                        alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });
       
});