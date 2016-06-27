// ui scripts

$(document).ready(function() {
	$(".search__container").hide();
	$(".nav__call__panel").hide();
	$(".modal__call-back").hide();
	$("#nav__mobile__search").click(function(){
		$(this).toggleClass("active").children("i.fa").toggleClass("fa-search fa-times");
		$(".search__container").slideToggle('fast');
		$('.search__container > input[type="search"]').focus();
		// $("header").toggleClass("active");
	});
	$("#nav__mobile__phone").click(function() {
		$(this).toggleClass("active").children("i.fa").toggleClass("fa-phone fa-times");
		$(".nav__call__panel").slideToggle('fast');
	});
	$("#nav__call__panel__call-back").click(function(){
		$(".modal__call-back").show();
	});
	$("#modal__call-back__close").click(function(){
		$(".modal__call-back").hide();
	});
});

$(document).ready(function() {
	$(".switcher-control input").click(function() {
		var className = $(this).attr("ID");
		console.log(className);
		$("body").removeClass();
		$("body").addClass(className);
	});
});
