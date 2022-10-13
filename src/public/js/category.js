$(document).ready(function (){
    $('#cate_form').submit(function (e){
        e.preventDefault()
        newCate()
    })

    function newCate(){
        const cateName = $('#txt_cate_name').val()
        $.ajax({
            url: $('#cate_form').attr('action'),
            type: $('#cate_form').attr('method'),
            data: {cateName},
            beforeSend: animation(),
            success: function (data){
                if(data.status === 200){
                    location.href = '/category'
                } else {
                    animation()
                    alert('Something wrong! ' + data.mess)
                }
            },
            error: function (){
                animation()
                alert('Something wrong!')
            }
        })
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