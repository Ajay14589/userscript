// ==UserScript==
// @name        Facebook 2013
// @include     https://www.facebook.com/
// @include     https://www.facebook.com/*
// @include     https://*.facebook.com/
// @include     https://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://facebook.com/
// @version     1.0.0 alpha
// @grant       none
// @author      sandros
// ==/UserScript==

// CORRECTING PAGE HEADER
	
	// functions
	
		function getSearchBoxId()
		{
			var allElements = document.getElementsByTagName('*');
			
			for (var i = 0, n = allElements.length; i < n; i++)
			{
            
				if (allElements[i].getAttribute("role") == "search")
				{
					return allElements[i];
				}
			}
		}

    // define document elements
    
        var navPanel = document.getElementsByClassName('rfloat _ohf')[0]; // whole navigation panel
        var navJewels = document.getElementById('navJewels'); // notifications
        var navSearch = getSearchBoxId(); // searchbox
        var navHome = document.getElementById('navHome'); // home button and newsfeed counter
        var navAccount = document.getElementsByClassName('navItem firstItem tinyman litestandNavItem')[0]; // account info and profile button
        var navSearchLi = document.createElement('li'); // new element for pos searchbox

    
    // update position of notifications' flyouts
    
        document.getElementsByClassName('jewelFlyout fbJewelFlyout uiToggleFlyout')[0].style.right = "-314px";
        document.getElementsByClassName('beeperNub')[0].style.marginRight = "252px";
        
        document.getElementsByClassName('jewelFlyout fbJewelFlyout uiToggleFlyout')[1].style.right = "-282px";
        document.getElementsByClassName('beeperNub')[1].style.marginRight = "252px";
        
        document.getElementsByClassName('jewelFlyout fbJewelFlyout uiToggleFlyout')[2].style.right = "-252px";
        document.getElementsByClassName('beeperNub')[2].style.marginRight = "252px";

// CORRECTING SOME STYLESHEETS 
	
	// define style tag
		var styleSheet = document.createElement('style');
	
	// correct fonts
	
		// images' pop-ups
			styleSheet.innerHTML = "._5p3y, ._5p3y button, ._5p3y input, ._5p3y label, ._5p3y select, ._5p3y td, ._5p3y textarea, ._5p3y .uiMentionsInput .highlighter, ._5p3y .uiButtonText, ._5p3y .uiButton input, ._5p3y .uiLinkButton input, ._5p3y button.as_link {font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; font-size: 11px;}";
		
		//  searchBox
			styleSheet.innerHTML += ".__wu #navSearch.roundedBox .uiSearchInput .inputtext { font-size: 12px; }";
		
		// general posts
			styleSheet.innerHTML += "._5p3y ._5pbw, ._5p3y ._5pbx, ._5p3y ._5pbx span.text_exposed_link { font-size: 13px; }";
		
		// time in posts 
			styleSheet.innerHTML += "._5p3y .fsm, ._5p3y .uiHeader h3, ._5p3y h4, ._5p3y h5, ._5p3y h6, ._5p3y .UFICommentContent ._5v47 { font-size: 11px; }";
		
		// titles, e.g. in invites
			styleSheet.innerHTML += "._5p3y #fbRequestsFlyout .title { font-size 11px; }";
		
		// linkBoxes in posts
			styleSheet.innerHTML += "._6m6 { font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; font-size: 14px; } ";
			styleSheet.innerHTML += "._6m7 { font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; font-size: 11px; color: #888; }";
		
		// textarea in post-adding form
			styleSheet.innerHTML += "._5t_y ._2yg .input, ._5t_y ._2yg .uiMentionsInput .highlighterContent { font-size: 12px; }";
		
		// likes showed on fanpage like newsfeed
			styleSheet.innerHTML += "._6lh ._8yb, ._6lh ._8yb a { font-size: 11px; }";	
	
	// change styles
				
		// likeBox in posts
			styleSheet.innerHTML += "._5vsi { background-color: #F6F7F8; border-radius: 0 0 3px 3px; border-top: 1px solid #E1E2E3; margin: 10px -12px 0; padding: 7px 15px; }";
			styleSheet.innerHTML += "._5vsj._5vsj._5vsj { margin: 0 -12px -12px; }";
			   
		// live notification
			styleSheet.innerHTML += "._5vb_ ._3sod, ._6nw ._3sod { background-color: #E1E6EE; }";
		
		// unread messages info  on chatBar
			styleSheet.innerHTML += "._5q5b ._51jx { position: absolute; right: 3px; top: -5px; }";
		// Sandros
styleSheet.innerHTML+="body,#contentCol,.fbTimelineScrubber {background:#FFF !important;}"
styleSheet.innerHTML+="._4-u2.mvm._495i,.ego_unit,.ego_section{display:none !important; border:0 !important;} ._4-u2 {border-radius: 0 !important;} .fbChatSidebar, .tickerFeedMessage {background-color:#FFF !important; font-size: 11px !important;} ._5v6e{border:0 !important;}"
		
    // put all styles into head tag
		document.head.appendChild(styleSheet);
		