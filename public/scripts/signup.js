$(function() {

    $('#createAccount').on('click', function() {
        var title = $('#title').val();
        var first = $('#firstName').val();
        var middle = $('#middleName').val();
        var last = $('#lastName').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var email = $('#email').val();
        var industries = $('#industries').val();

        var data = {
                title: title,
                first: first,
                middle: middle,
                last: last,
                username: username,
                email: email,
                industries: industries
            };
        
        var setUserInfoObject = new Promise(function(res, rej) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));

            window.userInfo = data;

            res();
        });

        $.ajax({
            type: "POST",
            url: '/newClient',
            data: data,
            dataType: 'json'
        }).then(function(user) {
            if(user) {
                $('#loginError').fadeIn();
                return;
            }

            setUserInfoObject.then(function() {
                $('nav')
                    .fadeOut()
                    .addClass('fixed-bottom');

                $.get('/markup/main.htm', function(markup) {
                    $.get('/navigation/bottomnavbar.htm', function(markup) {
                        $('#navigation').html(markup);

                        $('#username').html(userInfo.first + ' ' + userInfo.last);

                        $('#navigation').fadeIn();
                    });

                    $('#mainContent').html(markup);

                    $('.main-page').fadeIn();
                });
            });
        });
    });
});