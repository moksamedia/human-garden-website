// Loading Gif
$(window).load(function() {
	setTimeout(function () {
		$(".loading").fadeOut("slow");
	},1000);
});

// On scroll
$(window).scroll(function() {

	if($(document).scrollTop() < 201 && ! $("#navbar").hasClass("in")){
		$('nav').removeClass('shrink');
	}
	else {
		$('nav').addClass('shrink');
	}

});

$(document).ready(function(){

	$('#what_is_a_burn_popup').popup({
		transition: 'all 0.3s'
	});

	$('#what_is_a_burn').click(function(e) {
		e.preventDefault();
		$('#what_is_a_burn_popup').popup('show');
	});

	$("#contactForm").validate({
		rules: {
			subject: {
				required: true
			},
			name: {
				required: true,
				minlength:1,
				maxlength:50
			},
			email: {
				required: true,
				email:true
			},
			message: {
				required: true,
				minlength:1,
				maxlength:5000
			}
		}
	});

});

$(function(){

	$("#contactForm").on( "submit", function( event ) {
		event.preventDefault();
		if (!$("#contactForm").valid()) return;
		$.post('./sendmail.php', $('#contactForm').serialize()).done(function( data ) {
			$('.tohideaftermail').slideUp(function() {
				$('.thanks').slideDown();
			});
		});
	});

	$('#navbar').on('show.bs.collapse', function () {
		$('nav').addClass('shrink');
	});

	/* Smooth scrolling */
	$('a.smooth-scroll').click(function(e){
		e.preventDefault();
		var target = $( $.attr(this, 'href') );
		$('body,html').animate({'scrollTop': target.offset().top}, 500, function(){ animating = false; });
	});

	/* Isotope */
	// Init
	var $container = $('.isotope').isotope({
		itemSelector: '.element-item',
		layoutMode: 'fitRows'
	});

	// Filter functions
	var filterFns = {
	// Show if number is greater than 50
	numberGreaterThan50: function() {
		var number = $(this).find('.number').text();
		return parseInt( number, 10 ) > 50;
	},
	// Show if name ends with -ium
	ium: function() {
		var name = $(this).find('.name').text();
		return name.match( /ium$/ );
	}
	};

	// Bind filter button click
	$('#filters').on( 'click', 'button', function() {
		var filterValue = $( this ).attr('data-filter');
	// Use filterFn if matches value
	filterValue = filterFns[ filterValue ] || filterValue;
	$container.isotope({ filter: filterValue });
	});

	// Bind sort button click
	$('#sorts').on( 'click', 'button', function() {
		var sortByValue = $(this).attr('data-sort-by');
		$container.isotope({ sortBy: sortByValue });
	});

	// Change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
		});
	});

	$("#portfolio").on("click", ".element-item a", function(e){
		e.preventDefault();
		href = $(this).data("href");
		console.log(href);
		$("#portfolioPlaceholder").css('background-image', 'url('+href+')');
	});

});

function smoothScroll(target) {
	animating = true;
	$('body,html').animate({'scrollTop': target.offset().top}, 500, function(){ animating = false; });
}