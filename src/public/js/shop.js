$(document).ready(function (){
    $('#shop_form').submit(function (e){
        e.preventDefault()
        newShop()
    })

    function newShop(){
        let shopName = $('#txt_shop_name').val()
        let address = $('#txt_address').val()
        $.ajax({
            url: $('#shop_form').attr('action'),
            type: $('#shop_form').attr('method'),
            beForeSend: animation(),
            data: {shopName, address},
            success: function (data){
                if(data.status === 200){
                    location.href = '/product'
                } else {
                    animation()
                    alert('something wrong! create shop fail')
                }
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