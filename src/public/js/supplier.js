$(document).ready(function (){
    $('#sup_form').submit(function (e){
        e.preventDefault()
        newSup()
    })

    function newSup(){
        const supName = $('#txt_sup_name').val()
        const address = $('#txt_address').val()
        $.ajax({
            url: $('#sup_form').attr('action'),
            type: $('#sup_form').attr('method'),
            data: {supName, address},
            beforeSend: animation(),
            success: function (data){
                if(data.status === 200){
                    location.href = '/supplier'
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