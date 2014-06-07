//5/23/2005 8:23AM JGD reviewed.  No warrany expressed or implied.
// ==UserScript==
// @name          Amazon BCCLS Search
// @namespace     http://www.ieric.net
// @description	  Search the Bergen County Cooperative Library System from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(function() {
  function PublicLibraryInfo (name, link) {
      this.name = name;
      this.link = link;
  }

  function AmazonPublicLibraryLinkBuilder(libraryInfo) {
    this.libraryInfo = libraryInfo;
  
    this.insertLink = function(searchTerm) {
        var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (header) {
            var spl_link = document.createElement('a');
            spl_link.setAttribute('href', libraryInfo.link + escape(searchTerm));
            spl_link.setAttribute('title', 'Lookup up this item at ' + this.libraryInfo.name);
            spl_link.innerHTML 
              = '</br>Lookup up this item at ' + libraryInfo.name;
            header.parentNode.insertBefore(spl_link, header.nextSibling);
       }
    }
  }
  
  function ItemInfo() {
    this.isbn = '';
    this.description = '';
	this.title = '';
    
    /*
          * Setup ISBN
          */
    var isbnMatch = window._content.location.href.match(/\/(\d{9}[\d|X])\//);
    if (isbnMatch){
        this.isbn = isbnMatch[1];
    }
    /*
          * Setup description
          */
    var metaTags = document.getElementsByTagName("META");
    for (var i = 0; i < metaTags.length; i++) {
        var metaTag = metaTags[i];
        if (metaTag.name = "description") {
            this.description = metaTag.content;
            break;
        }
    }
    /*
          * Setup title
          */
	var title = document.getElementsByTagName("TITLE")[0].text;
	var titleArray = title.split(":");
	for (var i = 2; i < titleArray.length; i++) {
		this.title += titleArray[i];
	}
  }
  
  var bccls = new PublicLibraryInfo("BCCLS", "http://web2.bccls.org/web2/tramp2.exe/do_keyword_search/log_in?setting_key=BCCLS&servers=1home&index=default&query=");

  var linkBuilder = new AmazonPublicLibraryLinkBuilder(bccls);
  
  var itemInfo = new ItemInfo();
  
  // MPL does not support ISBN search, so just search for title
  linkBuilder.insertLink(itemInfo.title);
  
})();
