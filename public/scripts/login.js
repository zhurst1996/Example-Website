$(function() {
    $.get('/navigation/topnavbar.htm', function(markup) {

        $('#navigation').append(markup);

        $('#loginLink').on('click', function(e) {
            e.preventDefault();

            $(this).addClass('disabled');

            $.get('/markup/login.htm', function(markup) {
                $('#mainContent').html(markup);

                $('.login').fadeIn();
            });
        });

        $('.navbar-brand').on('click', function(e) {
            e.preventDefault();

            $('#loginLink').removeClass('disabled');
        });

        $('.testingtestertest').on('click', function(e) {
            $('nav').addClass('fixed-bottom');

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

        $('#signupLink').on('click', function(e) {
            e.preventDefault();

            $.get('/markup/signup.htm', function(markup) {
                $('#mainContent').html(markup);

                $('#industries').selectize({
                    delimter: ',',
                    persist: false
                });
            });
        });

        $('.nav-link')
            .not('#loginLink')
            .on('click', function() {
                $('#loginLink').removeClass('disabled')
            })
    });

});