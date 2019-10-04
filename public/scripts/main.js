$(function () {
    $('.personal-settings-button').on('click', function(e) {
        $.get('/markup/personalsettings.htm', function(markup) {

            $('#mainContent').html(markup);

        });
    });

    $('.home-button').on('click', function() {
        $.get('/navigation/bottomnavbar.htm', function(markup) {
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));

            $('#navigation').html(markup);

            $('#username').html(userInfo.first + ' ' + userInfo.last);

        });

        $.get('/markup/main.htm', function(markup) {
            $('#mainContent').html(markup);

            $('.main-page').fadeIn();
        });
    });
});