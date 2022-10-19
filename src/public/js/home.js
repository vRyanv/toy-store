$(document).ready(function (){
    function animation(){
        if($('.overlay-screen').css('display') === 'none')
        {
            $('.overlay-screen').css('display', 'block')
        }
        else
        {
            $('.overlay-screen').css('display', 'none')
        }
    }
    $('#btn_search_product').click(function (){
            searchPro($('#txt_search_pro').val())
    })

    function searchPro(proName){
        if(proName.trim() !== ''){
            $.ajax({
                url: '/customer-search-pro/'+proName,
                type: 'GET',
                beforeSend: animation(),
                success: function (data){
                    if(data.status === 200){
                        renderPro(data.proList)
                    } else {
                        animation()
                        alert(data.mess)
                    }
                },
                error: function (){
                    animation()
                    alert('something wrong!')
                }
            })
        }
    }



    function renderPro(proList){
        var proListHTML = ''
        for (let i =0; i< proList.length;i++){
            let proHTML = `<div class="row product-list-item">
                <div class="col-md-3 col-sm-4 col-xs-4 width-100">
                    <div class="toy-block">
                        <div class="baby-image">
                            <div class="toy-img" style="width: 16rem;height: 16rem">
                                <img src="/images/${proList[i].pro_image}" class="img-responsive" alt="toy" style="width: 100%; height: 16rem">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9 col-sm-8 col-xs-8 width-100">
                    <div class="aside">
                        <div class="caption_inside">
                            <div class="name"><a href="single-product.html">${proList[i].pro_name}</a></div>
                            <div class="price price-product">
                                <h3>${ proList[i].pro_price }</h3>
                            </div>
                            <div class="description">
                                <p>category: ${proList[i].cate_name }</p>
                                <p>supplier: ${ proList[i].sup_name }</p>
                                <p>shop: ${proList[i].shop_name}</p>
                                <p>quantity: ${proList[i].quantity}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            proListHTML += proHTML
        }

        $('.product-list-layout').empty()
        $('.product-list-layout').append(proListHTML)
        animation()
    }
})