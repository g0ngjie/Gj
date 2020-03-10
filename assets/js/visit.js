
$(document).ready(function () {
    const soho = "http://pv.sohu.com/cityjson?ie=utf-8";
    $.get(soho, function(res){
        console.log(res)
    })
    console.log(navigator, 'navigator')

    console.log(returnCitySN["cip"], 'returnCitySN["cip"]')

    $.ajax({
        url: 'http://api.map.baidu.com/location/ip?ak=ia6HfFL660Bvh43exmH9LrI6',
        type: 'POST',
        dataType: 'jsonp',
        success:function(data) {
            console.log(data.content.address_detail.province, 'data.content.address_detail.province')
            console.log(data.content.address_detail.city, 'data.content.address_detail.city')
        }
    });


})