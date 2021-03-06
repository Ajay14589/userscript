// ==UserScript==
// @name           jay
// @namespace      http://myspace.com/sdajslk
// @description    Adds a set of links on small images.  NEW VERSION!
// @include        http://myspace.com/*
// @include        http://*.myspace.com/*
// @exclude        http://*.myspace.com/*.viewCategory*
// ==/UserScript==
// CREDITS: The original concept and design of this script was created by
// Steve Ryherd. It was later updated by Zebra Gang (myspace.com/yeah_dude_13).
// Version 2.0 is a redesign by Adrian (myspace.com/adrian232) to add support
// for more icons, and a customizeable interface. It also fixes a few bugs
// in previous versions. All questions, bug reports, and suggestions should
// be sent to Adrian via MySpace.

(function() {

/************\
|*  CONFIG  *|
\************/

// Initialize some variables.
var shortcuts    = new Array;  // the array of shortcuts
var i = 0;

/******************************************************************************\
 *            M O D I F Y   S C R I P T   I N S T R U C T I O N S             *
 *                                                                            *
 * To add a shortcut, simply remove the '//' from the beginning of the line.  *
 * To remove a shortcut, add a '//' at the beginning of the line.             *
 *                                                                            *
 * You may change the order of the shortcuts by changing the order of this    *
 * list. The script will automatically arrange it into rows of no more than 5 *
 * icons per row.                                                             *
 *                                                                            *
 * Do Not, under ANY circumstances attempt to create a shortcut that is not   *
 * listed here, unless you know what you're doing (and write a handler for it *
 * in the Shortcut() constructor).                                            *
\******************************************************************************/

shortcuts[i++] = 'view_pictures';		/* View Pictures */
shortcuts[i++] = 'send_mail';			/* Send Mail */
shortcuts[i++] = 'add_comment';			/* Add a Comment */
shortcuts[i++] = 'view_comments';		/* View Friend's Comments */

/* To change the Icon Pack, change the text within the quotes (") to one of the
 * following pre-arranged icon packs:
 *
 *- silk: A high-quality, smooth, and somewhat colorful icon pack. (default)
 *      base: http://www.famfamfam.com/lab/icons/silk/
 *- explodingboy: A simple grey icon pack.
 *      base: http://www.exploding-boy.com/2005/09/28/more-free-icons/
 *- explodingboy-blue: A simple button-like pack in an assortment of colors.
 *- explodingboy-orange: "
 *- explodingboy-grey:   "
 *      base: http://www.exploding-boy.com/2005/09/13/explodingboy-pixel-icons/
 *- original: An icon pack loosely based on the original script's icons.
 *      base: (add_friend, add_comment, view_pictures, and send_mail were part
 *            of the original design by Steve Ryherd, all the rest were created
 *            by Adrian based on the originals and some icons from MySpace)
 *
 * -- You may also create your own icon pack and link to its directory here -- 
 * An easy way to do this is to create an album on photobucket.com and upload
 * your icons there. Then write the album's url into the 'iconpack' variable
 * below. (NOTE: Album url's do NOT contain .jpg or .png! Remove the filename
 * from the url of an icon down to the '/' to get the album's url).
 */
var iconpack = "original";

// You can change the size to be "small", "medium", "large", or "ex-large" icons
var icon_size = "small";

// change these variables only for custom icon packs
var iconpack_ext = "png";	// the icon extension (e.g. jpg, png, or gif)
var iconpack_width = 16;	// the icon width in pixels
var iconpack_style = "border: none !important; height: auto !important; width: " + iconpack_width + "px !important;";	// the style for the icon

/**************************************************\
|*  CORE CODE   -- DON'T EDIT BELOW THIS SECTION  *|
\**************************************************/

// Transform the shortcuts into real objects
for (i = 0; i < shortcuts.length; i++)
	shortcuts[i] = new Shortcut(shortcuts[i]);

function Shortcut(name) {

	if (iconpack.match(/^http/)) {
		var icon_base = iconpack;
	} else if (iconpack.indexOf("explodingboy") == 0) {
		if (iconpack.indexOf("-") == -1)
			var icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/explodingboy2/";
		else if (iconpack.indexOf("-blue") != -1)
			var icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/explodingboy-blue/";
		else if (iconpack.indexOf("-orange") != -1)
			var icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/explodingboy-orange/";
		else
			var icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/explodingboy-grey/";
		iconpack_ext = "gif";
		if (icon_size == "ex-large")
			iconpack_width = 24;
		else if (icon_size == "large")
			iconpack_width = 20;
		else if (icon_size == "small")
			iconpack_width = 12;
		else
			iconpack_width = 16;
		iconpack_style = "border: none !important; height: auto !important; width: " + iconpack_width + "px !important;";
	} else if (iconpack == "original") {
		var icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/original/";
		iconpack_ext = "png";
		if (icon_size == "ex-large")
			iconpack_width = 24;
		else if (icon_size == "large")
			iconpack_width = 20;
		else if (icon_size == "small")
			iconpack_width = 12;
		else
			iconpack_width = 16;
		iconpack_style = "border: none !important; height: auto !important; width: " + iconpack_width + "px !important;";
	} else {
		iconpack = 'silk';
		// 16 x 16 px PNG transparent icons
		var icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/silk/";
		iconpack_ext = "png";
		if (icon_size == "ex-large")
			iconpack_width = 24;
		else if (icon_size == "large")
			iconpack_width = 20;
		else if (icon_size == "small")
			iconpack_width = 12;
		else
			iconpack_width = 16;
		iconpack_style = "border: none !important; height: auto !important; width: " + iconpack_width + "px !important;";
	}

	if (name == 'add_friend') {
		this.description = 'Add to Friends';
		this.url = "'http://www.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID=' + friendID";
		//this.url = "'#'";
		//this.code = "shortcut.name = friendID;";
		//this.code += "shortcut.addEventListener('click', function(){quickFriendRequest(this.name);}, false);";
	}

	if (name == 'view_friends') {
		this.description = 'View Friends';   
		this.url = "'http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=' + friendID";
	}

	if (name == 'add_favorite') {
		this.description = 'Add to Favorites';     
		this.url = "'http://collect.myspace.com/index.cfm?fuseaction=user.addToFavorite&friendID=' + friendID + '&public=0'";
	}
           
	if (name == 'block_user') {
		this.description = 'Block User';     
		this.url = "'http://www.myspace.com/index.cfm?fuseaction=block.blockUser&userID=' + friendID";
	}
	
	if (name == 'view_pictures') {
		this.description = 'View Pictures';
		this.url = "'http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID=' + friendID";
	}
	
	if (name == 'view_videos') {
		this.description = 'View Videos';
		this.url = "'http://vids.myspace.com/index.cfm?fuseaction=vids.showvids&friendID=' + friendID";
	}

	if (name == 'send_mail') {
		this.description = 'Send a Message';    
		this.url = "'http://collect.myspace.com/index.cfm?fuseaction=mail.message&friendID=' + friendID";
	}
	
	if (name == 'send_im') {
		this.description = 'Send an Instant Message';
		this.url = "'javascript: void(0);'";
		this.onclick = '"javascript:up_launchIC(\'0\',\'" + friendID + "\',\'\',0);return false;"';
	}

	if (name == 'add_comment') {
		this.description = 'Leave a Comment';   
		this.url = "'http://comments.myspace.com/index.cfm?fuseaction=user&circuitaction=viewProfile_commentForm&friendID=' + friendID";
	}
           
	if (name == 'view_comments') {
		this.description = 'View Comments';   
		this.url = "'http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + friendID";
	}
	
	if (name == 'add_group') {
		this.description = 'Add to Group';
		this.url = "'http://groups.myspace.com/index.cfm?fuseaction=groups.addtogroup&friendID=' + friendID";
	}
	
	if (name == 'rank_user') {
		this.description = 'Rank User';
		this.url = "'http://collect.myspace.com/index.cfm?fuseaction=RateImage.UserRating&UserID=' + friendID";
	}
	
	if (name == 'forward_friend') {
		this.description = 'Forward to Friend';
		this.url = "'http://messaging.myspace.com/index.cfm?fuseaction=mail.forward&friendID=' + friendID + '&f=forwardprofile'";
	}
	
	if (name == 'view_blog') {
		this.description = 'View Blog';
		this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID=' + friendID";
	}
	
	if (name == 'subscribe_blog') {
		this.description = 'Subscribe to Blog';
		this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.ConfirmSubscribe&friendID=' + friendID";
	}
	
	if (name == 'add_preferred') {
		this.description = 'Add to Blog Preferred List';
		this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.addToPrivateList&friendID=' + friendID";
	}
	
	this.icon = icon_base + name + '.' + iconpack_ext;
}



function quickFriendRequest(friendID){
	
	//alert(friendID);
	GM_xmlhttpRequest({
	  method:"GET",
	  url:"http://www.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID="+friendID,
	  onload:function(details){quickFriendRequestSubmit(details)}
	});
	
}

function quickFriendRequestSubmit(details){
	    
	document.writeln(details.responseText.replace(/</, '&lt;'));
	form_url = details.responseText.match(/<form name="addFriend" action="(.*)?"/i)[1];
	input_hashcode = details.responseText.match(/name="hashcode" value="(.*)?"/i)[1];
	input_friendID = details.responseText.match(/name="friendID" value="(.*)?"/i)[1];
	//input_submit = details.responseText.match(/name="submit" value="(.*)?"/i)[1];
	
	formData  = '?hashcode='+input_hashcode;
	formData += '&friendID='+input_friendID;
	
	GM_xmlhttpRequest({
	  method:"POST",
	  data:formData,
	  url:form_url,
	  headers: {
		'User-agent': 'Mozilla/4.0 (compatible)',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		'Referer':'http://www.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID='+friendID,
	  },
	  onload:function(details2){
		document.writeln(details2.responseText.replace(/</, '&lt;'));
	  }
	});

}




function friendIdFromHttp(request){

	friendMatch = request.match(/friendid=([0-9]*)/i);
	
	return (friendMatch.length >= 1) ? friendMatch[1] : '6221';
	
}






// Select all links with a mid-size image inside them.
selectedLinks = document.evaluate("//a[img[not(contains(@src, 'blog.myspace.com/images/preview.gif'))] and (contains(@href, '.viewprofile') or contains(@href, '.viewProfile'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


// iterate through list
for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {
	
	// Stuff we already know
	var friendLink = selectedLinks.snapshotItem(snapshotIndex);
	var friendPic = friendLink.firstChild;
	while (friendPic && friendPic.nodeName != "IMG")
		friendPic = friendPic.nextSibling;
	var friendID = friendIdFromHttp(friendLink.href);
	
	if (friendPic) { // hopefully this is true
		friendPic.style['marginBottom'] = '0px';
	}
	
	
	// Create shortcuts!
	shortcutGroup = document.createElement('div');
	shortcutGroup.style['textAlign'] = 'center';
	  
	var firstIcon = true;
	var lastIcon = false;
	var minMargin = 1;
	// if the picture hasn't loaded yet...... guess?
	var friendPicWidth = friendPic.width < 90 ? (document.location.href.indexOf("=viewImage&") != -1 ? 170 : 90) : friendPic.width;
	var iconSize = iconpack_width + minMargin*2;
	var maxIcons = parseInt((friendPicWidth + minMargin*2) / iconSize);
		
	// This calculates the number of columns needed per row based on the number of icons and a specified maximum
	var rows = parseInt(shortcuts.length / maxIcons) + (shortcuts.length % maxIcons ? 1 : 0);
	var cols = parseInt(shortcuts.length / rows) + (shortcuts.length % rows ? 1 : 0);
		
	// This calculates the left and right margin sizes for the icons
	var margin = parseInt(((friendPicWidth - ((iconSize - minMargin*2) * (cols))) / (cols-1)) / 2);
	if (margin < minMargin)
		margin = minMargin;
	//margin = minMargin;
	
	//if (snapshotIndex == 0)
		//alert('iconSize: ' + iconSize + ', maxIcons: ' + maxIcons + ', cols: ' + cols + ', margin: ' + margin + ', friendPicWidth: ' + friendPicWidth);
	
	for ( var shortcutIndex = 0; shortcutIndex < shortcuts.length; ++shortcutIndex){
		
		shortcutIcon = document.createElement('img');
		shortcutIcon.src = shortcuts[shortcutIndex].icon;
		shortcutIcon.alt = shortcuts[shortcutIndex].description;
		shortcutIcon.setAttribute('style', iconpack_style);
		
		shortcut = document.createElement('a');
		shortcut.href = eval(shortcuts[shortcutIndex].url);
		if (shortcuts[shortcutIndex].onclick) shortcut.setAttribute('onClick', eval(shortcuts[shortcutIndex].onclick));
		shortcut.title = shortcuts[shortcutIndex].description;
		shortcut.setAttribute('style', "padding: 0px !important; margin: 0px !important;");
		shortcut.appendChild(shortcutIcon);
		
		shortcutIcon.style['marginTop'] = "1px";
		shortcutIcon.style['marginLeft'] = margin + "px";
		shortcutIcon.style['marginRight'] = margin + "px";
		
		if (firstIcon)
		  shortcutIcon.style['marginLeft'] = "0px";
		firstIcon = false;
		if (!((shortcutIndex + 1) % cols)) {
		  lastIcon = true;
		  firstIcon = true;
		}
		if (lastIcon)
		  shortcutIcon.style['marginRight'] = "0px";
		
		if (shortcuts[shortcutIndex].code) eval(shortcuts[shortcutIndex].code);
		//if (shortcuts[shortcutIndex].code) alert(eval(shortcuts[shortcutIndex].code));
		//if (shortcuts[shortcutIndex].code) alert(shortcuts[shortcutIndex].code);
		
		shortcutGroup.appendChild(shortcut);
		//shortcutGroup.setAttribute('style', 'height: 0px');
		
		if (lastIcon && shortcutIndex + 1 != shortcuts.length)
		  shortcutGroup.appendChild(document.createElement('br'));
		lastIcon = false;
	}
	
	if (friendLink.nextSibling){
		friendLink.parentNode.insertBefore(shortcutGroup, friendLink.nextSibling);
	} else {
		friendLink.parentNode.appendChild(shortcutGroup);
	}
	
	
}

})(); 



