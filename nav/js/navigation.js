$(document).ready(function(){
    
    // Desktop Menu stuff
    /////////////////////
    /////////////////////
    
    function toggleHover() {
        $(this).toggleClass('has-hovered');
    }    
    
    // first level menu hover toggle
    $(".nav__container > li").hoverIntent({
        over: toggleHover,
        out: toggleHover,
        timeout: 400
    });
    
    // second level menu hover toggle 
    $(".nav__container > li > ul > li").hoverIntent({
        over: toggleHover,
        out: toggleHover,
        timeout: 600
    });
    
    // Small Screen Menu stuff
    /////////////////////
    /////////////////////
    
    // small screen actions
    $("nav").on("click", "#js-nav__mobile__search", function() {
		$(this).toggleClass("nav__mobile__search--active");
        $(this).toggleClass("active").children("i.fa").toggleClass("fa-search fa-times");
		$(".nav__search").slideToggle('fast');
        $('.nav__search > input[type="search"]').focus();
	});
    
    $("nav").on("click", "#js-nav__mobile__phone", function() {
        $(this).toggleClass("active").children("i.fa").toggleClass("fa-phone fa-times");
 		$(this).toggleClass("nav__mobile__phone--active");
		$(".nav__call").slideToggle('fast');       
    });

	$("#nav__call__call-back").click(function(){
		$(".modal__call-back").show();
	});

	$("#modal__call-back__close").click(function(){
		$(".modal__call-back").hide();
	});
    
    // open the mobile menu
     $("nav").on("click", "#js-nav__mobile__menu", function() {  
        
        $("#js-nav__mobile__menu").toggleClass('active').children(".fa").toggleClass("fa-reorder fa-times");

        // if its already open, delete the copied menu 
        if ($('.nav__mobile__container').length === 1) { 
            $('.nav__mobile__container').animate({
               opacity: 0 
            }, 250, function(){
                $(this).remove();
                $('.nav__back').remove();
                // add focus back to original action bar
                $('.nav__container > .nav__actions a').attr('tabindex', '');
            }); 
            
        } else { // if its not already open, create the new menu
            $('.nav__container').append('<div class="nav__mobile__container"></div>');
            var stuff = $('.nav__actions').clone();
            var search = $('.nav__search').clone();
            var calls = $('.nav__call').clone();
            var subNav = $('.nav__sub-nav').clone();
            var levels = $('.nav__container > li').clone();
            $('.nav__mobile__container').append(stuff, calls, subNav, levels);
            $('.nav__mobile__container').prepend(search); 
            $('.nav__mobile__container').animate({
               opacity: 1 
            }, 250, function(){
                // add focus to the first menu item to help keyboard navigation  
                levels.first().children('a').focus();
                // remove focus from original action bar
                $('.nav__container > .nav__actions a').attr('tabindex', -1);
            });  
            // get our level indicator and add to items
            levels.addClass("level-" + 0);   
        }
     });
     
        // listen for a menu click
        $("nav").on("click", ".nav__mobile__container .nav--has-child", function() {
            
            // keep track of the location in the reference menu
            var menuIndex = $(this).data("index");
            $('.nav__container li').removeClass("nav--current");
            $('.nav__container li[data-index="' + menuIndex + '"]').addClass("nav--current");
            
            // get the next level down from the reference menu list
            var nextLevel = $('.nav__container').find('li[data-index="' + menuIndex + '"]').first().children('ul').children('li').clone();

            // get our level indicator and add to items
            var howDeep = $('.nav--current').parentsUntil('nav', 'ul').length;
            nextLevel.addClass("level-" + howDeep);

            // add our division indicator to the parent
            var division = $(this).data("division");
            $('.nav__mobile__container').attr("data-division", division);

            // ensures a smooth snap to the top of the next level
            $(".nav__mobile__container").animate({ scrollTop: 0 }, "fast");

            // animate left and remove old items
            var currentLevel = $('.nav__mobile__container > li');
            currentLevel.css('left', '0%').css('position', 'relative');
            
            var _requestAnimationFrame = function(win, t) {
            return win["webkitR" + t] || win["r" + t] || win["mozR" + t]
                    || win["msR" + t] || function(fn) { setTimeout(fn, 60) }
            }(window, "equestAnimationFrame"); 
            
            function animateLeft() { 
                var duration = 1000 * .2,  //.2 seconds
                end = +new Date() + duration;                  
                var step = function() {    
                    var current = +new Date(),
                    remaining = end - current;                   
                    var parentWidth = $('nav').width();                    
                    var progress = (((currentLevel.position().left / parentWidth ) * 100));            
                    if ( progress < -100 ) {
                        //end animation here as we've transitioned all the way
                        currentLevel.remove();
                        return;
                    } else {
                        var rate = 1 - remaining/duration;
                        currentLevel.css('left', (-(rate * 100) + '%'));
                    }             
                    _requestAnimationFrame(step);
                }    

                step(); // loop the function
            }
            animateLeft();
            
            //  // add in the new items
            $('.nav__mobile__container').append(nextLevel);
            nextLevel.css('left', '100%').css('position', 'relative');
            nextLevel.css('opacity', '0');

            function animateLeftFromRight() { 
                var duration = 1000 * .5,  //.2 seconds
                end = +new Date() + duration;                  
                var step = function() {
                    var current = +new Date(),
                    remaining = end - current;                   
                    var parentWidth = $('nav').width();                    
                    var progress = (((nextLevel.position().left / parentWidth ) * 100));           
                    if ( remaining <= 0 ) {
                        //end animation here as we've transitioned all the way
                        nextLevel.css('left', '0%'); // make sure we finish at 0
                        nextLevel.css('opacity', '1'); // make sure we finish at 0
                        // add focus to the first menu item to help keyboard navigation once the animation is complete
                        nextLevel.first().children('a').focus();
                        return;
                    } else {    
                        var rate = 1 - remaining/duration;
                        nextLevel.css('left', (remaining / 5) + '%');
                        rate = Math.ceil(rate * 10) / 10;
                        nextLevel.css('opacity', rate);
                    }             
                    _requestAnimationFrame(step);
                }           
                step(); // loop the function
            }
            animateLeftFromRight();        

            $('.js-sub-nav__back').addClass('nav__sub-nav__back--is-active');
            $('.js-sub-nav__home').removeClass('nav__sub-nav__home--is-active'); 

            return false;         
        });           
   
     
     $("nav").on("click", ".js-sub-nav__back", function() {
        
        // check if we are at the root and remove back button if so
        if ( $('.nav--current').parent().hasClass('nav__container') ) {
            $('.js-sub-nav__back').removeClass('nav__sub-nav__back--is-active');
            $('.js-sub-nav__home').addClass('nav__sub-nav__home--is-active'); 
        } else {
            // leave back button alone
        }
        
        // keep track of the current level in the reference menu
        var menuIndex = $('.nav__container').find('.nav--current').data("index");
        $('.nav__container li').removeClass("nav--current");
        $('.nav__container li[data-index="' + menuIndex + '"]').parent('ul').parent('li').addClass("nav--current");
        
        // get the next level up from the reference menu list
        var nextLevel = $('.nav__container').find('li[data-index="' + menuIndex + '"]').parents('ul').first().children('li').clone();    
        
        // animate right and remove current level
        $('.nav__mobile__container > li').css('left', '0%').css('position', 'relative');
        var oldLevel = $('.nav__mobile__container > li');

        // get our level indicator and add to container
        var howDeep = $('.nav--current').parentsUntil('nav', 'ul').length;
        nextLevel.addClass("level-" + howDeep);

        // add our division indicator to the parent
        var division = $('.nav__container').find('.nav--current').data("division");
        $('.nav__mobile__container').attr("data-division", division);

        var _requestAnimationFrame = function(win, t) {
        return win["webkitR" + t] || win["r" + t] || win["mozR" + t]
                || win["msR" + t] || function(fn) { setTimeout(fn, 60) }
        }(window, "equestAnimationFrame"); 
            
        function animateLeft() { 
            var duration = 1000 * .2,  //. seconds
                end = +new Date() + duration;                  
            var step = function() {    
                var current = +new Date(),
                remaining = end - current;                   
                var parentWidth = $('nav').width();                    
                var progress = (((oldLevel.position().left / parentWidth ) * 100)); 
                var rate = 1 - remaining/duration;          
                if ( rate > 1 ) {
                    //end animation here as we've transitioned all the way
                    oldLevel.remove();
                    return;
                } else {            
                    oldLevel.css('left', ((rate * 100) + '%'));
                }             
                _requestAnimationFrame(step);
            }           
            step(); // loop the function
        }
        animateLeft();
        
        // add in the new items
        $('.nav__mobile__container').append(nextLevel);
        $('.nav__mobile__container > li').css('left', '-100%').css('position', 'relative');   

        //  // add in the new items
        $('.nav__mobile__container').append(nextLevel);
        nextLevel.css('left', '100%').css('position', 'relative');
        nextLevel.css('opacity', '0');

        function animateLeftFromRight() { 
            var duration = 1000 * .5,  //.2 seconds
            end = +new Date() + duration;     
            var step = function() {
                var current = +new Date(),
                remaining = end - current;                   
                var parentWidth = $('nav').width();                    
                var progress = (((nextLevel.position().left / parentWidth ) * 100));           
                if ( remaining <= 0 ) {
                    //end animation here as we've transitioned all the way
                    nextLevel.css('left', '0%'); // make sure we finish at 0
                    nextLevel.css('opacity', '1'); // make sure we finish at 1
                    return;
                } else {    
                    var rate = 1 - remaining/duration;
                    nextLevel.css('left', '-' + (remaining / 4) + '%');
                    rate = Math.ceil(rate * 10) / 10;
                    nextLevel.css('opacity', rate);
                }             
                _requestAnimationFrame(step);
            }           
            step(); // loop the function
        }
        animateLeftFromRight();
             
        return false; 
     });
     
});