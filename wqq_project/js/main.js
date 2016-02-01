function setFullpage() {
	$("#fullpage").fullpage({
		navigation: true,
		navigationPosition: "right",
		showActiveTooltip: true,
		verticalCentered: false,
		keyboardScrolling: true,
		css3: false,
		scrollingSpeed: 700,
		autoScrolling: true,
		easingcss3: "ease-in"
	});
}

function setFade() {
	var container = $(".first-page"),
		wrapper = $(".allbg .banner"),
		info = $(".first-line .item"),
		info_xs = $(".first-line-xs .item"),
		r = 0;
	$(".section").fadeIn();
	wrapper.eq(0).show();
	setInterval(function () {
		r++;
		var e = r - 1;
		if (r > wrapper.length - 1) {
			r = 0;
		}
		$(wrapper).stop().fadeOut();
		$(wrapper[r]).stop().fadeIn(2e3);
		info.stop().fadeOut();
		$(info[r]).stop().fadeIn(2e3);
		info_xs.stop().fadeOut();
		$(info_xs[r]).stop().fadeIn(2e3);
	}, 5 * 1e3);
}

$(document).ready(function () {
	setFullpage();
	setFade();
});


