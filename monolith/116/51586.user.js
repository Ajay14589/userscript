﻿// ==UserScript==
// @name           3.7 低調2 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="低調2" href="http://s670.photobucket.com/albums/vv69/mark5419/0117/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,020.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif,043.gif,044.gif,045.gif,046.gif,047.gif,048.gif,049.gif,050.gif,051.gif,052.gif,053.gif,054.gif,055.gif,056.gif,057.gif,058.gif,059.gif,060.gif,061.gif,062.gif,063.gif,064.gif,065.gif,066.gif,067.gif,068.gif,069.gif,070.gif,081.gif,082.gif,083.gif,084.gif,085.gif,086.gif,089.gif,010.gif,011.gif,012.gif,013.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif</a>';

/* Smilies definition ends ====================== */

/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);