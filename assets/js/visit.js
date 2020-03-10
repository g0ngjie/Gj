
$(document).ready(function () {
    console.log(navigator, 'navigator')

     //获取城市ajax
    $.ajax({
        url: 'http://api.map.baidu.com/location/ip?ak=ia6HfFL660Bvh43exmH9LrI6',
        type: 'POST',
        dataType: 'jsonp',
        success:function(data) {
            console.log(data, 'data')
            console.log(data.content.address_detail.province, 'data.content.address_detail.province')
            console.log(data.content.address_detail.city, 'data.content.address_detail.city')
        }
    });

     //获取ip ajax
     $.ajax({
        url: 'http://freegeoip.net/json/',
        success: function(data){
            console.log(data, 'data freegeoip')
        },
        type: 'GET',
        dataType: 'JSON'
    });


})