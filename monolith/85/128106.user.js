// ==UserScript==
// @name           Cleaner HN
// @namespace      http://isaacbythewood.com/
// @description    A cleaner hacker news UI based on https://github.com/Primigenus/Cleaner-Hacker-News.
// @include        http://news.ycombinator.com/*
// @include        https://news.ycombinator.com/*
// @version        1.0.0
// ==/UserScript==

// -----------------------------------------------------------------------------
// Append our new and improved styles

var style = document.createElement('style');

style.innerHTML = " \
    body { \
        margin: 0; \
        background-image: url(http://subtlepatterns.com/patterns/groovepaper.png); \
    } \
 \
    body > center > table { \
        width: 100%; \
        background-color: transparent; \
    } \
 \
    body > center > table > tbody > tr:first-child > td { \
        background-image: -webkit-linear-gradient(top, #f60, #f70); \
        border-bottom: solid 1px #f60; \
        box-shadow: 0 2px rgba(0,0,0,.1); \
    } \
 \
    body > center > table > tbody > tr:first-child > td > table { \
        padding: 10px; \
        margin: 0 auto; \
        width: 960px; \
    } \
 \
    body > center > table > tbody > tr:first-child > td > table > tbody > tr > td:first-child { \
        padding-right: 10px; \
    } \
 \
    .pagetop { \
        font-family: 'Lucida Grande', 'Segoe UI', Arial, Helvetica, sans-serif; \
        font-size: 14px; \
    } \
 \
    a { \
        font-weight: bold; \
    } \
 \
    a:hover { \
        text-decoration: underline; \
    } \
 \
    body > center > table > tbody > tr:nth-child(3) > td { \
        padding: 20px 0; \
    } \
 \
    body > center > table > tbody > tr:nth-child(3) > td > table { \
        width: 960px; \
        margin: 0 auto; \
    } \
 \
    .title { \
        color: #ccc; \
        font-family: 'Lucida Grande', 'Segoe UI', Arial, Helvetica, sans-serif; \
        font-size: 12px; \
    } \
 \
    body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr:first-child > td:nth-child(2).title > a { \
        font-size: 18px; \
    } \
 \
    .subtext { \
        height: 15px; \
        font-family: 'Lucida Grande', 'Segoe UI', Arial, Helvetica, sans-serif; \
        vertical-align: top; \
    } \
 \
    td, .comment, .default, .comhead, .yclinks, .dead { \
        font-family: 'Lucida Grande', 'Segoe UI', Arial, Helvetica, sans-serif; \
    } \
 \
    body > center > table > tbody > tr:nth-child(3) > td > form { \
        width: 960px; \
        margin: 0 auto; \
    } \
 \
    td > center > table { \
        width: 940px; \
        background-color: white; \
        border: solid 1px #000; \
    } \
 \
    td > center > table td { \
        padding: 10px; \
    } \
 \
    body > center > table > tbody > tr > td > table { \
        width: 960px; \
        margin: 0 auto; \
    } \
 \
    .comment u, .comment u a, .comment u a:visited, .comment + p u, .comment + p u a, .comment + p u a:visited { \
        text-decoration: none ; \
        color: #777; \
    } \
 \
    .comment p, .comment + p { \
        margin: 8px 0 0 0; \
        line-height: 16px; \
    } \
";

document.body.appendChild(style);

// -----------------------------------------------------------------------------
