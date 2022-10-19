$(document).ready(function (){
    $('#login_form').submit(function (e){
        e.preventDefault()
        $('.error-login').css('display', 'none')
        login()
    })

    function login(){
        let username = $('#txt_username').val()
        let password = $('#txt_pass').val()
        if(username !== '' && password !== ''){
            $.ajax({
                url: $('#login_form').attr('action'),
                type: $('#login_form').attr('method'),
                data: {username, password},
                beForeSend: animation(),
                success:  function (data){
                    if(data.status === 200){
                        location.href = '/product'
                    } else {
                        animation()
                        $('.error-login').css('display', 'block')
                    }
                }
            })
        }
    }

    function animation(){
        if($('.overlay-screen').css('display') == 'none')
        {
            $('.overlay-screen').css('display', 'block')
        }
        else
        {
            $('.overlay-screen').css('display', 'none')
        }
    }
})