
  'use strict';

window.onload = function() {


var BoxOpened = '';
var ImgOpened = '';
var Counter = 0;
var ImgFound = 0;

var Source = '#boxcard';

var ImgSource = [
  'http://images6.fanpop.com/image/photos/34300000/the-simpsons-the-simpsons-34393788-500-368.gif',
  'http://cdn.screenrant.com/wp-content/uploads/the-simpsons-renewed-season-24-25.jpg',
  'http://i.dailymail.co.uk/i/pix/2014/02/27/article-0-1BDDA26900000578-159_964x524.jpg',
  'http://vignette2.wikia.nocookie.net/simpsons/images/e/e4/Simple_Simpson_promo.jpg/revision/latest?cb=20100331134543',
  'http://wallpaperus.org/wallpapers/05/187/homer-simpson-6000x6000-wallpaper-856281.jpg',
  'https://pbs.twimg.com/profile_images/3409382847/826da01660d8d22f0c1464d0dcc260ac.jpeg',
  'http://image-cdn.zap2it.com/images/the-simpsons-season-26-renewal.jpg',
  'http://ep00.epimg.net/cultura/imagenes/2014/03/12/television/1394627784_911910_1394631485_noticia_normal.jpg',
  'http://www.haywiremag.com/wp-content/uploads/2013/12/Simpsons2.jpg',
  'http://cdn.thewire.com/media/old_wire/img/upload/2013/11/18/Ralph_Wiggum/lead_large.jpg'

];

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
  }

function ShuffleImages() {
  var ImgAll = $(Source).children();
  var ImgThis = $(Source + ' div:first-child');
  var ImgArr = new Array();

  for (var i = 0; i < ImgAll.length; i++) {
    ImgArr[i] = $('#' + ImgThis.attr('id') + ' img').attr('src');
    ImgThis = ImgThis.next();
  }

    ImgThis = $(Source + ' div:first-child');

  for (var z = 0; z < ImgAll.length; z++) {
  var RandomNumber = RandomFunction(0, ImgArr.length - 1);

    $('#' + ImgThis.attr('id') + ' img').attr('src', ImgArr[RandomNumber]);
    ImgArr.splice(RandomNumber, 1);
    ImgThis = ImgThis.next();
  }
}

function ResetGame() {
  ShuffleImages();
  $(Source + ' div img').hide();
  $(Source + ' div').css('visibility', 'visible');
  Counter = 0;
  $('#success').remove();
  $('#counter').html('' + Counter);
  BoxOpened = '';
  ImgOpened = '';
  ImgFound = 0;
  return false;
}
var CurrentOpened;
function OpenCard() {
  var id = $(this).attr('id');

  if ($('#' + id + ' img').is(':hidden')) {
    $(Source + ' div').unbind('click', OpenCard);

    $('#' + id + ' img').slideDown('fast');

    if (ImgOpened === '') {
      BoxOpened = id;
      ImgOpened = $('#' + id + ' img').attr('src');
      setTimeout(function() {
        $(Source + ' div').bind('click', OpenCard);
      }, 300);
    } else {
      CurrentOpened = $('#' + id + ' img').attr('src');
      if (ImgOpened !== CurrentOpened) {
        setTimeout(function() {
          $('#' + id + ' img').slideUp('fast');
          $('#' + BoxOpened + ' img').slideUp('fast');
          BoxOpened = '';
          ImgOpened = '';
        }, 400);
      } else {
        $('#' + id + ' img').parent().css('visibility', 'hidden');
        $('#' + BoxOpened + ' img').parent().css('visibility', 'hidden');
        ImgFound++;
        BoxOpened = '';
        ImgOpened = '';
      }
      setTimeout(function() {
        $(Source + ' div').bind('click', OpenCard);
      }, 400);
    }
    Counter++;
    $('#counter').html('' + Counter);

    if (ImgFound === ImgSource.length) {
      $('#counter').prepend('<span id="success">You Found All Pictues With </span>');
    }
  }
}

$(function() {

for (var y = 1; y < 3 ; y++) {
  $.each(ImgSource, function(i, val) {
    $(Source).append('<div id=card' + y + i + '><img src=' + val + ' />');
  });
}
  $(Source + ' div').click(OpenCard);
  ShuffleImages();
});



}
