$(document).ready(function() { 
    $(window).scroll(function() {
    var scroll= $(window).scrollTop();
    if (scroll > 100) {
        $(".hdmovies-navbar").css("background", "0c0c0c");
    } else {
        $(".hdmovies-navbar").css("background", "transparent");
    }
    })
})

