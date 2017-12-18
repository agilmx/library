$(function () {
   
    var top_nav = $('.top-nav .plNavList li');
    // Getting all the total top nav
    //var total_top_nav = top_nav.children().length
    //Loop through all the child nav and check for subchild
    /*for (var i = 0; i < total_top_nav; i++) {
        var isUL = $(top_nav.children(i))
        console.log(isUL.children('ul').length)
    }*/
    /*top_nav.children('ul').each(function () {
        console.log(this)
    })*/
    $("#ctl00_PlaceHolderMain_WikiField > div").css("padding-right", "0px")
    $(".ms-rte-embedcode").css("width", "100%")
    
    $('.banner').jSlidingBanner({ slideAnimationSpeed: 500 });

    $('body').on('mouseover', '.paladin-navbar a.dropdown-toggle', function (e) {
        var $el = $(this);
        var $parent = $(this).offsetParent(".dropdown-menu");
        $(this).parent("li").toggleClass('show');

        if (!$parent.parent().hasClass('navbar-nav')) {
            $el.next().css({ "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 });
        }
        $('.navbar-nav li.show').not($(this).parents("li")).removeClass("show");
        return false;
    });
    $('body').on('click', '.paladin-navbar a', function (e) {
        if ($(this).attr("target") != undefined) {
            window.open($(this).attr("href"), $(this).attr("target"));
        }
        else {
            $(location).attr('href', $(this).attr("href"));
        }
        console.log($(this).attr("target"))
        return false;
    });
    /*Mobile Nav*/
    $("#toggleMobileNav").on('click', function () {
        $(".plmenu-sidebar").toggleClass('open')
        $("#toggleMobileNav .fa-navicon").toggleClass('d-none')
        $("#toggleMobileNav .fa-close").toggleClass('d-none')
    })

    var wikiInEditMode;
    if (typeof(MSOWebPartPageFormName) != 'undefined') {
        wikiInEditMode = document.forms[MSOWebPartPageFormName]._wikiPageMode;
    }
    var isHomePage = $("#news-letter").length != 0;
    if (isHomePage == true) {
        if ($("#s4-bodyContainer").hasClass("pl-inner-edit")) {
            $("#s4-bodyContainer").removeClass("pl-inner-edit");
        }
        $("#s4-bodyContainer").addClass("pl-home");
        if (wikiInEditMode != undefined) {
            if (wikiInEditMode.value == "Edit") {
                $("#plfooter").addClass("pl-inner-edit");
            }
            else {
                $("#plfooter").removeClass("pl-inner-edit");
            }
        }
        
    }
    else {
        
        if (wikiInEditMode != undefined) {
            if (wikiInEditMode.value == "Edit") {
                enableEditModeContent(true);
            }
            else {
                enableEditModeContent(false);
            }
        }
        else {
            if (window.location.href.indexOf("_layouts") >= 0 || window.location.href.indexOf("AllPages")) {
                enableEditModeContent(true);
            }
            else {
                enableEditModeContent(false);
            }
        }
    }

    // Left Sub-Menu toggleing
    $("body").on("mouseover",".left-navigation .left-mainmenu li a", function (event) {
        //event.preventDefault();
        var subMenu = $(this).next(".left-submenu");
        if (subMenu.length == 1) {
            if (subMenu.hasClass("open")) {
                leftToggleArrow($(this), false);
                subMenu.removeClass("open")
            }
            else {
                closeAllNestedOpenSubMenu()
                leftToggleArrow($(this), true);
                subMenu.addClass("open")
            }
        }
    });
    
});

function closeAllNestedOpenSubMenu() {
    // $(".left-navigation .left-mainmenu li .left-submenu").removeClass("open")
    $(".left-navigation .left-mainmenu li a").each(function () {
        var subMenu = $(this).next(".left-submenu");
        if (subMenu.length == 1) {
            leftToggleArrow($(this), false);
            subMenu.removeClass("open")
        }
    });
}

function leftToggleArrow(instance, flag) {
    if (flag == false) {
        instance.removeClass("triangle-down")
        instance.addClass("triangle-right")
    }
    else {
        instance.addClass("triangle-down")
        instance.removeClass("triangle-right")
    }
}

function enableEditModeContent(flag, isHome) {
    if (flag == true) {
        $("#s4-bodyContainer").addClass("pl-inner-edit");
        $("#plfooter").addClass("pl-inner-edit");
    }
    else {
        $("#s4-bodyContainer").removeClass("pl-inner-edit");
        $("#plfooter").removeClass("pl-inner-edit");
    }
}


window.onload = function () {
    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g)
    if (isIE) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/SiteAssets/css/plie.css';
        link.media = 'all';
        head.appendChild(link);
        console.log("Done")
    }
}

