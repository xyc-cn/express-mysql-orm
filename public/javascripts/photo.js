/**
 * Created by Administrator on 14-7-31.
 */
$(function(){
    $('.tableimg').XYCphoto();
});

$.fn.XYCphoto = function(){
    function changephoto (index) {
        var url = $('.tableimg').get(index).src;
        $('.divbgimg').attr({
            src: url,
            alt: index
        });
    }

    var bdheight = document.body.scrollHeight?document.body.scrollHeight:document.documentElement.scrollHeight;
    var photobg = $('<div class="divbg"></div>');
    photobg.css('height',bdheight+'px');
    var photo = $('<div class="divbginner"></div>');
    var left_btn = $('<img src="images/iconfont-xiangzuo.png" class="divbg-left">');
    var right_btn = $('<img src="images/iconfont-xiangyou.png" class="divbg-right">');
    left_btn.bind('click', function(event) {
        var size = $('.tableimg').size();
        var curpage = $('.divbgimg').attr('alt');
        if(curpage == 0){
            changephoto(--size);
        }
        else{
            changephoto(--curpage);
        }
    });
    right_btn.bind('click', function(event) {
        var size = $('.tableimg').size();
        var curpage = $('.divbgimg').attr('alt');
        if(curpage == --size){
            changephoto(0);
        }
        else{
            changephoto(++curpage);
        }
    });
    var album = $('<img src="" alt="" class="divbgimg"></img>');
    var close = $('<img src="images/iconfont-cuowu.png" class="divbg-close">');
    close.bind('click', function(event) {
        photobg.hide();
        photo.hide();
    });
    photo.append(left_btn);
    photo.append(right_btn);
    photo.append(album);
    photo.append(close);
    $('body').append(photobg);
    $('body').append(photo);
    photobg.hide();
    photo.hide();
    return $(this).each(function(){
        $(this).bind('click', function(event) {
            var offtop = document.body.scrollTop?document.body.scrollTop: document.documentElement.scrollTop;
            var url = $(event.target).attr('src');
            var index = $(event.target).attr('alt');
            photo.css('top',offtop+150);
            photo.find('.divbgimg').attr({
                src: url,
                alt: index
            });
            photobg.show();
            photo.show();

        });
    });

}