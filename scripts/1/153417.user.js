﻿// ==UserScript==
// @name           Mafia Wars Happy Switch
// @copyright      Mafia Wars Malaysia
// @description    Switch Mafia Wars Profile On FB/Timeline & Playing Mafia Wars @ HappyPlace
// @icon           http://lockupmwm.webs.com/gambor/mwmsmall1.png
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://*apps.facebook.com/*
// @version        Balqis Comey.〤
// ==/UserScript==

// $Id: FB/TL switch.js,v Balqis Comey.〤 2012-12-04 05:39:28~subky
// Credits : Spockholm & Lucifers
var y=document.getElementById("pageNav");y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="javascript:%28function%28%29%7Bif%28%2Fapps.facebook.com.inthemafia%2F.test%28document.location%29%29%7Bfor%28var%20i%3D0%3Bi%3Cdocument.forms.length%3Bi%2B%2B%29%7Bif%28%2F%5Ecanvas_iframe_post%2F.test%28document.forms%5Bi%5D.id%29%29%7Bdocument.forms%5Bi%5D.target%3D%27%27%3Bdocument.forms%5Bi%5D.submit%28%29%3Breturn%3B%7D%7D%7Delse%20if%28document.getElementById%28%27some_mwiframe%27%29%29%7Bwindow.location.href%3Ddocument.getElementById%28%27some_mwiframe%27%29.src%3Breturn%3B%7Delse%7Bfunction%20get_id_from_game%28%29%7Btry%7Bif%28m%3D%2Fxw_controller%3Drobbing.%2A%3Ftarget%3D%28%5B0-9%5D%2B%29%2F.exec%28document.getElementById%28%27inner_page%27%29.innerHTML%29%29%7Breturn%20m%5B1%5D%3B%7Dif%28m%3D%2Fxw_controller%3Dstats.%2A%3Fuser%3D%28%5B0-9%5D%2B%29%2F.exec%28document.getElementById%28%27inner_page%27%29.innerHTML%29%29%7Breturn%20m%5B1%5D%3B%7Dif%28m%3D%2Fxw_action%3Dgift_wishlist.%2A%3Fuser%3D%28%5B0-9%5D%2B%29%2F.exec%28document.getElementById%28%27inner_page%27%29.innerHTML%29%29%7Breturn%20m%5B1%5D%3B%7Dif%28m%3D%2Fq%28%5B0-9%5D%2B%29_%28%5Cd%2B%29%5C.jpg%2F.exec%28document.getElementById%28%27inner_page%27%29.innerHTML%29%29%7Breturn%20m%5B1%5D%3B%7Dif%28document.getElementsByClassName%28%27fightres_image%27%29.length%3E1%29%7Bvar%20fight_image%3D%2F%28%5Cd%2B%29_%28%5Cd%2B%29_q.jpg%2F.exec%28document.getElementsByClassName%28%27fightres_image%27%29%5B1%5D.innerHTML%29%3Breturn%20fight_image%5B1%5D%3B%7Dif%28m%3D%2Fxw_controller%3DVegasSlots.%2B%3Ffriend_id%3D%28%5B0-9%5D%2B%29%2Fi.exec%28document.getElementById%28%27inner_page%27%29.innerHTML%29%29%7Breturn%20m%5B1%5D%3B%7Dif%28m%3D%2F%28%5B0-9%5D%2B%29_%28%5Cd%2B%29%5C_q.jpg%2F.exec%28document.getElementById%28%27inner_page%27%29.innerHTML%29%29%7Breturn%20m%5B1%5D%3B%7Dif%28%28m%3D%2Fuser%252522.%2A%3F%252522%28%5B0-9A-Za-z%25%5D%2B%29%252522%2F.exec%28document.getElementById%28%27mainDiv%27%29.innerHTML%29%29%7C%7C%28m%3D%2Fuser%2522.%2A%3F%2522%28%5B0-9A-Za-z%25%5D%2B%29%2522%2F.exec%28document.getElementById%28%27mainDiv%27%29.innerHTML%29%29%29%7Breturn%20atob%28m%5B1%5D.replace%28%2F%25253D%2Fg%2C%27%3D%27%29.replace%28%2F%253D%2Fg%2C%27%3D%27%29%29%3B%7D%7Dcatch%28err%29%7B%7Dreturn%20null%3B%7Dfunction%20get_id_from_fb%28%29%7Bfunction%20f%28expr%29%7Btry%7Breturn%2Frid%3D%28%5B0-9%5D%2B%29%2F.exec%28eval%28expr%29%29%5B1%5D%3B%7Dcatch%28e%29%7Breturn%20null%3B%7D%7Dfunction%20reportid%28expr%29%7Btry%7Breturn%2Fcid%3D%28%5B0-9%5D%2B%29%2F.exec%28eval%28expr%29%29%5B1%5D%3B%7Dcatch%28e%29%7Breturn%20null%3B%7D%7Dfunction%20newfb%28expr%29%7Btry%7Breturn%2F%28%5Cd%2B%29_%28%5Cd%2B%29_%28%5Cd%2B%29%5C_n.jpg%2F.exec%28eval%28expr%29%29%5B2%5D%3B%7Dcatch%28e%29%7Breturn%20null%3B%7D%7Dfunction%20timeline%28expr%29%7Btry%7Breturn%2F%22profile_owner%22%3A%22%28%5Cd%2B%29%22%2F.exec%28eval%28expr%29%29%5B1%5D%3B%7Dcatch%28e%29%7Breturn%20null%3B%7D%7Dfunction%20timeline2%28expr%29%7Btry%7Breturn%2F%22profile_id%22%3A%22%28%5Cd%2B%29%22%2F.exec%28eval%28expr%29%29%5B1%5D%3B%7Dcatch%28e%29%7Breturn%20null%3B%7D%7Dreturn%20timeline%28%22document.getElementById%28%27pagelet_timeline_main_column%27%29.getAttribute%28%27data-gt%27%29%22%29%7C%7Cf%28%22document.getElementById%28%27profile_action_report_block%27%29.innerHTML%22%29%7C%7Cf%28%22document.getElementById%28%27profileimage%27%29.parentNode.innerHTML%22%29%7C%7Cf%28%22document.getElementById%28%27profile_action_send_message%27%29.parentNode.innerHTML%22%29%7C%7Creportid%28%22document.getElementsByClassName%28%27actions%20secondary_actions%27%29%5B0%5D.innerHTML%22%29%7C%7Cnewfb%28%22document.getElementById%28%27profile_pic%27%29.src%22%29%7C%7Ctimeline2%28%22document.getElementsByClassName%28%27fbTimelineScrubber%27%29%5B0%5D.getAttribute%28%27data-gt%27%29%22%29%7C%7Cnull%3B%7Dvar%20http%3D%27http%3A%2F%2F%27%3Bif%28%2Fhttps%2F.test%28document.location%29%29%7Bhttp%3D%27https%3A%2F%2F%27%3B%7Dvar%20id%3Bif%28id%3Dget_id_from_game%28%29%29%7Btop.location.href%3Dhttp%2B%27www.facebook.com%2Fprofile.php%3Fid%3D%27%2Bid%3B%7Delse%20if%28id%3Dget_id_from_fb%28%29%29%7Btop.location.href%3Dhttp%2B%27apps.facebook.com%2Finthemafia%2Ftrack.php%3Fnext_controller%3Dstats%26next_action%3Dview%26next_params%3D%257B%2522user%2522%253A%2522%24ID%2522%257D%27.replace%28%27%24ID%27%2Cid%29%3B%7Delse%7Balert%28%27Could%20not%20find%20an%20id%21%5CnFor%20non-friends%20you%20can%20try%20attacking%20once%20and%20using%20Switch%20on%20the%20fight%20result%20screen.%5CnFor%20friends%20it%20should%20work%20on%20MW%20profile%20pages.%27%29%3B%7D%7D%7D%29%28%29" target="_top" class="navLink bigPadding" style="padding-left: 8px; padding-right: 8px;">Switch</a></li>';y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="http://mwscripts.com/happyplace" target="_blank" class="navLink bigPadding" style="padding-left: 10px; padding-right: 10px;">HappyPlace</a></li>';var x=document.getElementById("extra_toplinks_holder");var t=x.getElementsByTagName("a")[0];t.setAttribute(".submit();")