﻿// ==UserScript==
// @name		    Auto Like Facebook work 100% cepat by www.facebook.com/rizani19 @rizani19
// @namespace		Auto Like Facebook work 100% cepat by www.facebook.com/rizani19 @rizani19
// @description		Auto Like Facebook work 100% cepat by www.facebook.com/rizani19 @rizani19. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account. autolike and have emoticon Final version 2013 february.new version, work
// @author			Rizani
// @authorURL		http://www.facebook.com/rizni19
// @homepage		http://www.facebook.com/groups/397231113671957/
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @icon			http://profile.ak.fbcdn.net/hprofile-ak-frc3/s160x160/385750_403605433048848_413415633_a.jpg
// @version			v.7 Final
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

// ======= Do Not Remove Credit =======
// == Nama : Auto Like Facebook v.7 Final ==
// ======= Author : Rizani ========
// ======= Site : http://www.facebook.com/groups/397231113671957/ =======
// =======================================

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "150px";div.style.opacity= 0.90;div.style.bottom = "+90px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Sigarakan [F5]</center></blink></a>"
body.appendChild(div);}

if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "150px"; div.style.opacity= 0.90;div.style.bottom = "+69px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Katujui Status</center></a></a>"
body.appendChild(div);
   unsafeWindow.Anonymous69 = function(){var B=0;var J=0;var I=document.getElementsByTagName("a");var H=new Array();for(var D=0;D<I.length;D++){if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J’aime")){H[J]=I[D];J++}}function E(L){H[L].click();var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Sudah dikatujui: "+(L+1)+"/"+H.length+"</center></a>";document.getElementById("like2").innerHTML=K}function G(K){window.setTimeout(C,K)}function A(){var M=document.getElementsByTagName("label");var N=false;for(var L=0;L<M.length;L++){var K=M[L].getAttribute("class");if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Peringatan dari facebook");N=true}}if(!N){G(1)}}function F(K){window.setTimeout(A,K)}function C(){if(B<H.length){E(B);F(5);B++}};C()}}
     
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "150px";div.style.opacity= 0.90;div.style.bottom = "+48px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Katujui Komentar</center></a>"
body.appendChild(div);unsafeWindow.AnonymousComments = function(){var B=0;var J=0;var I=document.getElementsByTagName("a");var H=new Array();for(var D=0;D<I.length;D++){if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J’aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen")){H[J]=I[D];J++}}function E(L){H[L].click();var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Sudah dikatujui: "+(L+1)+"/"+H.length+"</center></a>";document.getElementById("like3").innerHTML=K}function G(K){window.setTimeout(C,K)}function A(){var M=document.getElementsByTagName("label");var N=false;for(var L=0;L<M.length;L++){var K=M[L].getAttribute("class");if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Peringatan dari Facebook");N=true}}if(!N){G(1)}}function F(K){window.setTimeout(A,K)}function C(){if(B<H.length){E(B);F(5);B++}}C()}}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "150px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<center><a ajaxify='/ajax/messaging/composer.php?ids%5B0%5D=100001981834171&amp;ref=timeline' href='/messages/rizani19' role='button' rel='dialog'><span class='uiButtonText'>Message</span></a></center>"
body.appendChild(div);unsafeWindow.BugInfo = function() {
window.open(this.href='http://www.facebook.com/rizani19', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
};}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "150px";div.style.height = "18px";div.style.opacity= 0.90;div.style.bottom = "+0px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<iframe src='//www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2Frizani19&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font=arial&amp;width=450&amp;appId=461683983853869' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height='10' ALIGN='center' allowTransparency='true'></iframe>"
body.appendChild(div);}
