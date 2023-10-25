(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

	window.addEventListener('scroll', function () {
		var navbar = document.getElementById('ftco-navbar');
		if (window.scrollY > 0) {
			navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		} else {
			navbar.style.backgroundColor = 'transparent';
		}
	});

})(jQuery);
