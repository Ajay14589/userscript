// --------------------------------------------------------------------
//
// Script : Liste smileys
// Version 0.1
// 1-07-2010
// Copyright (c) 2010, [Anti-resetti]
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          zap dans la liste
// @description   zap arrive :zap:
// @homepage      
// @namespace     
// @exclude       http://*.blog.jeuxvideo.com/*
// @exclude       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/forums/1-*
// @exclude       http://www.jeuxvideo.com/forums/3-*
// @exclude       http://www.jeuxvideo.com/profil/*.html
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include       http://www.jeuxvideo.com/smileys/legende.htm
// @author        [anti-resetti]
// @contributor   [anti-resetti]

// ==/UserScript==

function addImg(href){
var img = document.createElement('img');
img.src = href;
return img;
}

function addA(href, code){
var a = document.createElement('a');
a.href = 'javascript:passCode("newmessage","'+code+'");'
a.appendChild(addImg(href));
return a;
}

function addTd1(href, code){
var td = document.createElement('td');
td.appendChild(addA(href, code));
return td;
}

function addTd2(code){
var td = document.createElement('td');
td.innerHTML = code;
return td;
}

function addTr(i){
var tr = document.createElement('tr');
var classe = (i%2 == 0)? 'tr1' : 'tr2';
tr.setAttribute('class', classe);
return tr;
}

function nbTr(){
	return document.getElementsByTagName('tr').length;
}

function lastTr(){
return document.getElementsByTagName('tr')[nbTr()-1];
}

function nbTd(tr){
return lastTr().getElementsByTagName('td').length;
}

function addSmiley(tr, href, code){
if(nbTd(tr) == 8)
tr = tr.parentNode.appendChild(addTr(nbTr()));
tr.appendChild(addTd1(href, code));
tr.appendChild(addTd2(code));
}

function addSmileys(){
try{

addSmiley(lastTr(), "http://hapshack.com/images/zap.gif", ":zap:" );

}
catch(e){
alert(e);
}
}

addSmileys();