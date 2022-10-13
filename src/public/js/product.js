$(document).ready(function (){
    $('#pro_form').submit(function (e){
        e.preventDefault()
        if($('#pro_img').val() !== ''){
            handleCreatePro(this)
        } else {
            $('#lb_img').html('Image (require)')
            $('#lb_img').css('color','red')
        }
    })

    function handleCreatePro(_this){
        let productForm = new FormData(_this)

        $.ajax({
            url: $(_this).attr('action'),
            type: $(_this).attr('method'),
            data: productForm,
            beforeSend: animation(),
            cache:false,
            contentType: false,
            processData: false,
            success: function (data){
                if(data.status === 200){
                    location.href = '/product'
                } else {
                    animation()
                    alert('something wrong! add product fail')
                }
            },
            error: function (){
                animation()
                alert('something wrong! add product fail')
            }
        })
    }

    $('#btn_open_dialog_image').click(function (){
        $('#pro_img').click()
        $('#lb_img').html('Image')
        $('#lb_img').css('color','black')
    })

    $('#pro_img').change(function (){
        previewImage()
    })

    function previewImage(){
        document.getElementById("img_preview").src = '/images/preview.png';
        var imageReader = new FileReader();
        imageReader.readAsDataURL(document.getElementById("pro_img").files[0]);
        imageReader.onload = function (oFREvent) {
            document.getElementById("img_preview").src = oFREvent.target.result;
        };
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

    let proId = null
    $('.btn-delete-pro').click(function (){
        proId = $(this).data('pro-id')
        $('#btn_show_confirm_delete').click()
    })

    $('#btn_ok_delete').click(function (){
        $('.btn-close').click()
        $.ajax({
            url: '/product-remove',
            type: 'DELETE',
            data: {proId},
            beforeSend: animation(),
            success: function (data){
                if(data.status === 200){
                    location.href = '/product'
                } else {
                    animation()
                    alert('something wrong! delete product fail')
                }
            },
            error: function (){
                animation()
                alert('something wrong! delete product fail')
            }
        })
    })

    $('#btn_search_product').click(function (){
        let proName =  $('#txt_search_pro').val()
        if(proName !== ''){
            $.ajax({
                url: '/product-search/'+proName,
                type: 'GET',
                beforeSend: animation(),
                success: function (data){
                    if(data.status === 200){
                        renderProductFound(data.product)
                    } else {
                        animation()
                        alert('Not found')
                    }
                }
            })
        }
    })

    function renderProductFound(product){
        var proList = ''
        for (let i = 0; i < product.length; i++) {
            var productHTML = ` 
        <div class="item">
            <div class="thumbnail">
                <img class="group list-group-image pro-image" src="/images/${product[i].pro_image}" alt="">
            </div>
            <div class="infor-product">
                <div>
                    <h5 class="pro-name">${product[i].pro_name}</h5>
                </div>
                <div class="caption">
                    <h6>Category: ${product[i].cate_name}</h6>
                    <h6>Supplier: ${product[i].sup_name}</h6>
                    <h6>Price: ${product[i].pro_price}</h6>
                    <h6>Quantity: ${product[i].quantity}</h6>
                </div>
                <div><button class="btn btn-warning btn-delete-pro btn-custom" data-pro-id="${product[i].pro_id}">Delete</button></div>
            </div>
        </div>`
            proList += productHTML
        }

        $('.container-product').empty()
        $('.container-product').append(proList)
        $('.btn-delete-pro').click(function (){
            proId = $(this).data('pro-id')
            $('#btn_show_confirm_delete').click()
        })
        animation()
    }
})