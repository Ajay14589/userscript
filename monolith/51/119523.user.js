// ==UserScript==
// @name           d. mondaine 002
// @namespace      d
// @include        http://*.4shared.com/*
// @description    nothing interest (or not...)
// ==/UserScript==
if(document.getElementById('aSFDiv_wide')){
  document.getElementById('aSFDiv_wide').style.display='none';
  }

var tr = document.getElementsByTagName('tr');
for (var i = 0; i < tr.length; i++) {
    if (tr[i].getAttribute('valign') == 'top' && tr[i].getElementsByTagName('h1')[0] !== undefined && tr[i].getElementsByClassName("playThumb")[0] !== undefined && !tr[i].innerHTML.match('Accerelated')) {
        var link = tr[i].getElementsByClassName('playThumb')[0].getElementsByTagName('img')[0].getAttribute('onclick').split(',')[1].replace(/\'/g, '').replace(/\s*/g, '');
        var url = link + '?' + tr[i].getElementsByTagName('h1')[0].getElementsByTagName('a')[0].innerHTML;
        var url2 = link.replace(/(img.*load_2F)(.*)(_3Ftsid_3D)(.*)(\/renomear\.mp3)/i, "download/$2?tsid=$4");
        tr[i].getElementsByClassName('fsize')[0].innerHTML += '<h4><a href="' + url2 + '"><font color=#000000>Slow</font></a><br><br><a href="' + url + '"><font color=#000000>Fast</font></a></h4>';
    }
}

if (window.location.href.match('/audio/')) {
  var ngaran = document.getElementById('fileNameTextSpan').innerHTML;
  var slowDL = '';
  var fastDL = document.getElementsByTagName("meta").item(11).content + '?' + ngaran;
  document.body.innerHTML = document.body.innerHTML.replace(/http:\/\/www\.4shared\.com\/get\/.*\.[html]+/i, fastDL);
}