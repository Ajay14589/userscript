// ==UserScript==
// @name           Winter Style Filelist 2
// @namespace      filelist.ro
// @include        http://*filelist.ro/*
// @include        http://*flro.org/*
// @author 		   AddyUCL
// @date		    11 December 2011
// ==/UserScript==

	

/********** User Options - Change these if you want *****************************/


// 0: Use Mondial Style Filelist in logo
// 1: Use Mondial Style Filelist in logo, w/ gold badge
// 2: Use FileList in logo, w/ no gold badge
var whichLogo = 0;

// .


/********************************************************************************/
/********** Don't Change Below Here! (unless you know what you're doing) ********/
/********************************************************************************/
(function() {
var css = "body {\n		color: #000000 !important; \n		background-color: #eaeaea !important;   \n	}\n\n	table {\n		background-color: #CDCDCD !important;\n	}\n	\n	table.bottom {\n		background-color: #000000 !important;\n	}\n	td {\n          border-color: #000000 !important;\n        }\n	td.colhead {\n	  background-color: #BC4153 !important;\n           border-color: #000000!important;\n	}\n	\n	a:link, a:visited {\n	  color: #000000 !important;\n	}\n\n	a:hover {\n	  color: #1589FF !important;\n	}\n	a.sort {\n		color: #F6358A !important;	\n		text-decoration: none !important;\n	}\n	a.sort:hover {\n		text-decoration: underline !important;\n	}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

var useus = [];
var withus = [];
var useimg = [];

var destroy = [];
	
/**
 *bg
 */
var td = window.document.getElementsByTagName("td");
for(var i=0;i<td.length;i++){
	if(td[i].className.indexOf("xexe") != -1){
		td[i].style.backgroundColor = "#E0E0E0";
	}
	if(td[i].className.indexOf("clear") != -1){
		td[i].style.backgroundColor = "#eaeaea";
	}
	if((td[i].className.indexOf("xexe") != -1)&&(td[i].style.background.indexOf("menubg")>0)){
		td[i].style.background = "";
	}
	if(td[i].className.indexOf("embedded")!=-1 && (""+window.location).indexOf("browse.php")>-1){
		td[i].style.backgroundColor = "#CDCDCD";
	}
	if(td[i].firstChild!=null && td[i].firstChild.tagName == "B"){
		if(td[i].firstChild.innerHTML.indexOf("SceneAccess")>-1){
			destroy.push(td[i].parentNode);
		}
	}
	if(td[i].style.backgroundColor == "#F6358A"){
		td[i].style.removeAttribute("style");
		td[i].style.removeAttribute("background");
	}
}


/**
 * Cat icons n other crap
 */
var imgs = window.document.getElementsByTagName("img");
for(var x=0;x<imgs.length;x++){
	if(imgs[x].src.indexOf("home.jpg")>-1){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-news.png";
		imgs[x].width = "72";
		imgs[x].height = "48";
		newimg = document.createElement("img");
		newimg.setAttribute("src","http://ubitsa.org/sctimg/nav-left.png");
		newimg.setAttribute('style','border:none;');
		imgs[x].parentNode.insertBefore(newimg,imgs[x]);
		
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
	}else 
	// .......
	if(imgs[x].src.indexOf("logo.jpg")>0){
		if(whichLogo == 0){
			imgs[x].parentNode.parentNode.parentNode.style.background = "url()";
		}else if(whichLogo == 1){
			imgs[x].parentNode.parentNode.parentNode.style.background = "url()";
		}else{
			imgs[x].parentNode.parentNode.parentNode.style.background = "url()";
		}
		var parent = imgs[x].parentNode;
		//parent.removeChild(imgs[x]);
		destroy.push(imgs[x]);
		parent.parentNode.parentNode.parentNode.parentNode.style.width="1022";
		parent.parentNode.parentNode.style.width="1022";
		parent.parentNode.removeAttribute('style');
		parent.parentNode.style.height="111";
		parent.parentNode.style.width = "340";
		parent.parentNode.nextSibling.removeAttribute('style');
		parent.parentNode.previousSibling.removeAttribute('style');
	}else if(imgs[x].src.indexOf("/unlockednew.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockednew.png";
	}else if(imgs[x].src.indexOf("/unlockednew2.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockednew.png";
	}else if(imgs[x].src.indexOf("/locked.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-locked.png";
	}else if(imgs[x].src.indexOf("/locked2.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-locked.png";
	}else if(imgs[x].src.indexOf("/lockednew.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-lockednew.png";
	}else if(imgs[x].src.indexOf("/lockednewposted.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-lockednewposted.png";
	}else if(imgs[x].src.indexOf("/lockedposted.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-lockedposted.png";
	}else if(imgs[x].src.indexOf("/unlocked.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlocked.png";
	}else if(imgs[x].src.indexOf("/unlockednew.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockednew.png";
	}else if(imgs[x].src.indexOf("/unlockednewposted.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockednewposted.png";
	}else if(imgs[x].src.indexOf("/unlockedposted.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockedposted.png";
	}else if(imgs[x].src.indexOf("browse.jpg")>0){
		newimg = document.createElement("img");
		newimg.setAttribute("src","http://ubitsa.org/sctimg/nav-seperator.png");
		newimg.setAttribute('style','border:none;');
		
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
    		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
		imgs[x].src = "http://ubitsa.org/sctimg/nav-browse.png";
		destroy.push(imgs[x].parentNode.nextSibling);
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
	}else if(imgs[x].src.indexOf("browse2.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-mp30day.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("archive.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-archive.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("profile.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-profile.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("forums.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-forums.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("donate.jpg")>0){
		imgs[x].src = "http://img843.imageshack.us/img843/1226/snowicon.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("staff.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-staff.png";
		
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));		
		newimg = document.createElement("img");
		newimg.setAttribute('src',"http://ubitsa.org/sctimg/nav-right.png");
		newimg.setAttribute('style','border:none;');
		imgs[x].parentNode.appendChild(newimg);
	}else if(imgs[x].src.indexOf("default_avatar.png")>0){
		imgs[x].src = "http://img259.imageshack.us/img259/3859/default1d.png";
	}else 
	// remove bookmark image, replace with blue one
	if(imgs[x].src.indexOf("bookmark.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/bookmark.png";
		destroy.push(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.previousSibling);
	}else 
	// change download image to text
	if(imgs[x].title == "Download"){
		var parent = imgs[x].parentNode;
		destroy.push(imgs[x]);
		var b = document.createElement("b");
		parent.appendChild(b);
		var txt = document.createTextNode("[DL]");
		b.appendChild(txt);
	}else if(imgs[x].src.indexOf("righttop.gif")>0){
		imgs[x].parentNode.removeAttribute('style');
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("bottom1.gif")>0){
		imgs[x].parentNode.style.background = "url(http://ubitsa.org/sctimg/bottom_left.png)";
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("bottom3.gif")>0){
		imgs[x].parentNode.style.background = "url(http://i297.photobucket.com/albums/mm209/ubitsa_2/bottom_right.png)";
		destroy.push(imgs[x]);
	}else 
	// This does ... but it fixes the nav :)
	if(imgs[x].src.indexOf("left_top.gif")>0){
		var nextElem = imgs[x].parentNode.nextSibling.nextSibling; 
		nextElem.removeAttribute('style');
		nextElem.removeAttribute('background');
		imgs[x].parentNode.removeAttribute('style');
		imgs[x].parentNode.parentNode.style.background = "url(http://ubitsa.org/sctimg/navbg-new.png)";
		imgs[x].parentNode.parentNode.parentNode.parentNode.style.width = "1022";
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].removeAttribute("background");
		if((""+window.location).indexOf("action=editpos")==-1){
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].removeAttribute("background");
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].removeAttribute("style");
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].style.background = "url(http://ubitsa.org/sctimg/newrightbar.png)";
		}else{
			var td = document.createElement("td");
			td.className = "xexe";
			td.style.width="36";
			td.style.background = "url(http://ubitsa.org/sctimg/newrightbar.png)";		
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.appendChild(td);
		}
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].removeAttribute("style");
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].style.background = "url(http://ubitsa.org/sctimg/newleftbar.png)";
		//imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[1].style.width = "945";
		//imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[1].style.tableLayout = "fixed";
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("xvid.png")!=-1){ 
		imgs[x].src = "http://filelist.ro/pic/cat/xvid.png";
	}else if(imgs[x].src.indexOf("eps.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/eps.png";
	}else if(imgs[x].src.indexOf("appz.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/appz.png";
        }else if(imgs[x].src.indexOf("games.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/games.png";  
	}else if(imgs[x].src.indexOf("misc.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/misc.png";
	}else if(imgs[x].src.indexOf("dvd-r.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/dvd-r.png";
	}else if(imgs[x].src.indexOf("console.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/console.png";
        }else if(imgs[x].src.indexOf("hdtv.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/hdtv.png";
        }else if(imgs[x].src.indexOf("hd.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/hd.png";
        }else if(imgs[x].src.indexOf("hdro.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/hdro.png";
	}else if(imgs[x].src.indexOf("toons.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/toons.png";
	}else if(imgs[x].src.indexOf("linux.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/linux.png";
	}else if(imgs[x].src.indexOf("mvideos.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/mvideos.png";
	}else if(imgs[x].src.indexOf("sport.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/sport.png";
	}else if(imgs[x].src.indexOf("e-book.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/e-book.png";
	}else if(imgs[x].src.indexOf("dvd.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/dvd.png";
	}else if(imgs[x].src.indexOf("porn.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/porn.png";
	}else if(imgs[x].src.indexOf("music.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/music.png";
	}else if(imgs[x].src.indexOf("oldies.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/oldies.png";
        }else if(imgs[x].src.indexOf("blu.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/blu.png";
        }else if(imgs[x].src.indexOf("mobile.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/mobile.png";
	}else if(imgs[x].src.indexOf("vcd.png")>0){
		imgs[x].src = "http://filelist.ro/pic/cat/vcd.png";
	}else if(imgs[x].src.indexOf("logo.png")>0){
		imgs[x].src = "http://img825.imageshack.us/img825/4545/addyuclp.png";
	}else if(imgs[x].src.indexOf("logo_2011.png")>0){
		imgs[x].src = "http://img825.imageshack.us/img825/4545/addyuclp.png";
	}else if(imgs[x].src.indexOf("arrowup.gif")>0){
		imgs[x].src = "http://img600.imageshack.us/img600/8998/arrowupgif.png";
	}else if(imgs[x].src.indexOf("arrowdown.gif")>0){
		imgs[x].src = "http://img59.imageshack.us/img59/6113/arrowdowngif.png";
	}else if(imgs[x].src.indexOf("download.gif")>0){
		imgs[x].src = "http://img7.imageshack.us/img7/3127/downloadgif.png";
	}else if(imgs[x].src.indexOf("files.gif")>0){
		var txt = document.createTextNode("Files");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("comment")>0){    // these couple of ones are removing the images 
		var txt = document.createTextNode("Comm"); //   at the top of columns on browse page
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("added.gif")>0){
		var txt = document.createTextNode("Added");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);	
	}else if(imgs[x].src.indexOf("size.gif")>0){
		var txt = document.createTextNode("Size");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);	
	}else if(imgs[x].src.indexOf("downloaded.gif")>0){
		//imgs[x].parentNode.parentNode.parentNode.parentNode.parentNode.style.tableLayout = "fixed";
		imgs[x].parentNode.parentNode.parentNode.parentNode.parentNode.style.width = "940";
		var txt = document.createTextNode("Snatched");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("seeders.gif")>0){
		var txt = document.createTextNode("Seeds");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("leechers.gif")>0){
		var txt = document.createTextNode("Leechers");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
        }else if(imgs[x].src.indexOf("star.png")>0){
		imgs[x].src = "http://filelist.ro/pic/star.png";		
	}else if(imgs[x].src.indexOf("starbig.png")>0){
		imgs[x].src = "http://filelist.ro/pic/starbig.png";
	}else if(imgs[x].src.indexOf("buddylist.png")>0){
		imgs[x].src = "http://filelist.ro/pic/buddylist.gif";
        }else if(imgs[x].src.indexOf("rss.png")>0){
		imgs[x].src = "http://filelist.ro/getrss.php";
        }else if(imgs[x].src.indexOf("pn_inbox.gif")>0){
		imgs[x].src = "http://img225.imageshack.us/img225/7718/pninboxnew3.gif";
        }else if(imgs[x].src.indexOf("pn_sentbox.gif")>0){
		imgs[x].src = "http://img225.imageshack.us/img225/7718/pninboxnew3.gif";
        }else if(imgs[x].src.indexOf("pn_inboxnew.gif")>0){
		imgs[x].src = "http://img10.imageshack.us/img10/4980/pninboxnew1.png";
        }else if(imgs[x].src.indexOf("top.gif")>0){
		imgs[x].src = "http://img7.imageshack.us/img7/6043/top5w.png";
        }else if(imgs[x].src.indexOf("warned.png")>0){
		imgs[x].src = "http://filelist.ro/pic/warned.png";
        }else if(imgs[x].src.indexOf("warnedbig.png")>0){
		imgs[x].src = "http://filelist.ro/pic/warnedbig.png";
        }else if(imgs[x].src.indexOf("unlocked.png")>0){
		imgs[x].src = "http://img23.imageshack.us/img23/6152/unlocked1.png";
        }else if(imgs[x].src.indexOf("unlockednew.png")>0){
		imgs[x].src = "http://img849.imageshack.us/img849/8271/unlockednew.png";
        }else if(imgs[x].src.indexOf("lockednew.png")>0){
		imgs[x].src = "http://img221.imageshack.us/img221/4576/jhhghmd.png";
        }else if(imgs[x].src.indexOf("disabled.png")>0){
		imgs[x].src = "http://filelist.ro/pic/disabled.png";
        }else if(imgs[x].src.indexOf("disabledbig.png")>0){
		imgs[x].src = "http://filelist.ro/pic/disabledbig.png";
        }else if(imgs[x].src.indexOf("button_pm.gif")>0){
		imgs[x].src = "http://img853.imageshack.us/img853/8066/59212412.png";
        }else if(imgs[x].src.indexOf("button_mail.gif")>0){
		imgs[x].src = "http://img23.imageshack.us/img23/3815/emailth.png";
        }else if(imgs[x].src.indexOf("logout.php?id")>0){
		imgs[x].src = "http://img194.imageshack.us/img194/4408/logoutp.png";
        }else if(imgs[x].src.indexOf("offline.png")>0){
		imgs[x].src = "http://img7.imageshack.us/img7/7972/offlinek.png";
        }else if(imgs[x].src.indexOf("online.png")>0){
		imgs[x].src = "http://img13.imageshack.us/img13/3006/onlinero.png";
        }else if(imgs[x].src.indexOf("locked.png")>0){
		imgs[x].src = "http://img12.imageshack.us/img12/1441/5675.png";
	}
	
}

//need this to be delayed til here cuz.... else it crashes
// just adds seperators between nav imgs
for(var i=0;i<useus.length;i++){
	useus[i].insertBefore(useimg[i],withus[i]);
}

// Change links in Seeders column to be black
var fonts = document.getElementsByTagName("font");
for(var i=0;i<fonts.length;i++){
	if(fonts[i].color =="#fffff0"){
		fonts[i].color = "#000000";
	}
	if(fonts[i].color =="#387fa8"){
		fonts[i].color = "#0e41e4";
		if(fonts[i].innerHTML == "Ratio:"){
			fonts[i].nextSibling.nextSibling.color = "#000000";
		}
	}
}

// remove all the images we're sposda get rid of
for(var i=0;i<destroy.length;i++){
	destroy[i].parentNode.removeChild(destroy[i]);
}

// fix bottom_mid pic
var links = document.getElementsByTagName("a");
for(var i=0;i<links.length;i++){
	if(links[i].href=="http://www.sceneaccess.org/bookmarks.php"||links[i].href=="https://www.sceneaccess.org/bookmarks.php"){
		links[i].parentNode.parentNode.parentNode.removeAttribute("style");
		links[i].parentNode.parentNode.parentNode.removeAttribute("background");
		links[i].parentNode.parentNode.parentNode.style.background = "url(http://ubitsa.org/sctimg/bottom_mid.png)";
	}
	// Donation bar creation.... jesus!
	if((links[i].href=="http://filelist.ro/donate.php"||links[i].href=="http://filelist.ro/donate.php") && links[i].className == "donation"){
		var pct = links[i].title; // donation %
		var numpct = parseInt(pct.substring(0,pct.length-1));
		//clear everything
		var parent = links[i].parentNode;
		parent.vAlign = "top";
		parent.style.width = "125";
		nukeChildren(parent);
		var spacer = document.createElement("div");
		spacer.style.height = "27";
		parent.appendChild(spacer);
		var dlink = document.createElement("a");
		dlink.setAttribute("href","/donate.php");
		dlink.style.cssFloat = "left";
		var dimg = document.createElement("img");
		dimg.src = "http://ubitsa.org/sctimg/donate_main.png";
		dimg.alt = "Donate";
		dimg.style.cssFloat = "left";
		dimg.setAttribute('style','border:none;');
		parent.appendChild(dlink);
		dlink.appendChild(dimg);
		var dbar = document.createElement("div");
		dbar.style.cssFloat = "left";
		dbar.style.height = "40";
		dbar.style.width = "20";
		parent.appendChild(dbar);
		var heit = (numpct*30/100);
		var dbimg = document.createElement("img");
		dbimg.src = "http://ubitsa.org/sctimg/donate_bar_top.png";
		dbimg.style.height = "5";
		dimg.setAttribute('style','border:none;');
		dbar.appendChild(dbimg);
		var dbimg = document.createElement("img");
		dbimg.src = "http://ubitsa.org/sctimg/donate_bar_empty.png";
		dbimg.style.height = parseInt(33-heit);
		dbimg.style.width = "18";
		dimg.setAttribute('style','border:none;');
		dbar.appendChild(dbimg);
		var dbimg = document.createElement("img");
		var heit = (numpct*33/100);
		if(numpct <50){		
			dbimg.src = "http://ubitsa.org/sctimg/donate_bar_red.png";
			dbimg.style.height = parseInt(heit);
		}else if(numpct < 85){
			dbimg.src = "http://ubitsa.org/sctimg/donate_bar_yellow.png";
			dbimg.style.height = parseInt(heit);	
		}else{
			dbimg.src = "http://ubitsa.org/sctimg/donate_bar_green.png";
			dbimg.style.height = parseInt(heit);
		}		
		dbimg.setAttribute("title",pct);
		dbimg.style.width = "18";
		dimg.setAttribute('style','border:none;');
		dbar.appendChild(dbimg);
		var dbimg = document.createElement("img");
		dbimg.src = "http://ubitsa.org/sctimg/donate_bar_bottom.png";
		dbimg.style.height = "5";
		dimg.setAttribute('style','border:none;');
		dbar.appendChild(dbimg);
	}
}

function nukeChildren(node){
	if (node.hasChildNodes()){
		while (node.childNodes.length >= 1){
			node.removeChild(node.firstChild);       
		}
	}
}