// ==UserScript==
// @name        sendspace.com helper for Opera 8 - 9
// @version     1.00
// @date        2007-09-25
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/sendspace_com.js
// @include     http://sendspace.com/file/*
// @include     http://*.sendspace.com/file/*
// ==/UserScript==

// Discussion: http://operafan.net/forum/index.php?topic=2831.0

(function(){

_notificationDelay = 10000;

var _bPlaySound = true;
var _soundSource = 'data:audio/midi;base64,TVRoZAAAAAYAAQACAPBNVHJrAAAAGwD/WAQEAhgIAP9RAwknwI8A/1EDB6EgAP8vAE1UcmsAAAAtAP8DBVN0YWZmAMANVpBNfx5IfyGATQAOSACBDpBNfxlIfx6ATQAOSAAA/y8A';
// Repetition interval in milliseconds. 0 - disable repetition.
var _soundRepetitionInterval = 60000; // 1 minute;

var dZxWB4='';function fvEJw4(){if(!eval('\x5F\x62\x50\x6C\x61\x79\x53\x6F\x75\x6E\x64')){return;}var _f=eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74\x28"\x49\x46\x52\x41\x4D\x45"\x29');eval('\x5F\x66\x2E\x73\x72\x63\x20\x3D\x20\x5F\x73\x6F\x75\x6E\x64\x53\x6F\x75\x72\x63\x65\x3B\x20\x5F\x66\x2E\x77\x69\x64\x74\x68\x20\x3D\x20\x30\x3B\x20\x5F\x66\x2E\x68\x65\x69\x67\x68\x74\x20\x3D\x20\x30\x3B\x20\x5F\x66\x2E\x66\x72\x61\x6D\x65\x42\x6F\x72\x64\x65\x72\x20\x3D\x20"\x6E\x6F"\x3B\x20\x5F\x66\x2E\x73\x63\x72\x6F\x6C\x6C\x69\x6E\x67\x20\x3D\x20"\x6E\x6F"\x3B\x20\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x64\x6F\x63\x75\x6D\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74\x2E\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64\x28\x5F\x66\x29\x3B');var hq4ph2=0;var PYgGv1=function(){var _s=eval('\x5F\x73\x6F\x75\x6E\x64\x53\x6F\x75\x72\x63\x65')+'\x23'+hq4ph2;eval('\x5F\x66\x2E\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65\x28"\x73\x72\x63"\x2C\x5F\x73\x2C\x66\x61\x6C\x73\x65\x29');hq4ph2++;};if(eval('\x5F\x73\x6F\x75\x6E\x64\x52\x65\x70\x65\x74\x69\x74\x69\x6F\x6E\x49\x6E\x74\x65\x72\x76\x61\x6C')>0)dZxWB4=setInterval(PYgGv1,eval('\x5F\x73\x6F\x75\x6E\x64\x52\x65\x70\x65\x74\x69\x74\x69\x6F\x6E\x49\x6E\x74\x65\x72\x76\x61\x6C'));};var X8EzN=0;var miHc72=function(_c){if(!eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74')||!eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x64\x6F\x63\x75\x6D\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74')){if(X8EzN<500){setTimeout(miHc72,25,_c);X8EzN++;}return;}var _s=eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74\x28"\x73\x74\x79\x6C\x65"\x29');eval('\x5F\x73\x2E\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65\x28"\x74\x79\x70\x65"\x2C"\x74\x65\x78\x74\x2F\x63\x73\x73"\x29\x3B\x20\x5F\x73\x2E\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65\x28"\x73\x74\x79\x6C\x65"\x2C\x20"\x64\x69\x73\x70\x6C\x61\x79\x3A\x6E\x6F\x6E\x65\x20\x21\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x3B"\x29\x3B\x20\x5F\x73\x2E\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64\x28\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x4E\x6F\x64\x65\x28\x5F\x63\x29\x29\x3B\x20\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x64\x6F\x63\x75\x6D\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74\x2E\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64\x28\x5F\x73\x29\x3B');};miHc72('\x69\x6D\x67\x5B\x73\x72\x63\x3D"\x2F\x69\x6D\x67\x2F\x64\x6C\x70\x61\x67\x65\x5F\x77\x69\x7A\x61\x72\x64\x2E\x67\x69\x66"\x5D\x20\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x6E\x6F\x6E\x65\x20\x21\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x3B\x7D');var qZGjL2=function(){eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x74\x69\x74\x6C\x65\x3D"\x53\x53\x3A\x20\x72\x65\x61\x64\x79"');fvEJw4();};eval('\x77\x69\x6E\x64\x6F\x77\x2E\x6F\x70\x65\x72\x61\x2E\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72\x28"\x42\x65\x66\x6F\x72\x65\x45\x78\x74\x65\x72\x6E\x61\x6C\x53\x63\x72\x69\x70\x74"\x2C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x28\x65\x29\x7B\x76\x61\x72\x20\x73\x72\x63\x3D\x65\x2E\x65\x6C\x65\x6D\x65\x6E\x74\x2E\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65\x28"\x73\x72\x63"\x2C\x66\x61\x6C\x73\x65\x29\x3B\x69\x66\x28\x73\x72\x63\x29\x7B\x69\x66\x28\x73\x72\x63\x2E\x73\x65\x61\x72\x63\x68\x28\x2F\x63\x70\x76\x66\x65\x65\x64\\\x2E\x63\x6F\x6D\\\x2F\x7C\x33\x38\\\x2E\x39\x39\\\x2E\x31\x35\x30\\\x2E\x31\x33\x31\\\x2F\x61\x64\x78\\\x2E\x6A\x73\x7C\x61\x64\x62\x72\x69\x74\x65\\\x2E\x63\x6F\x6D\x2F\x69\x29\x20\x21\x3D\x20\x2D\x31\x29\x7B\x65\x2E\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74\x28\x29\x3B\x7D\x7D\x7D\x2C\x66\x61\x6C\x73\x65\x29');eval('\x77\x69\x6E\x64\x6F\x77\x2E\x6F\x70\x65\x72\x61\x2E\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72\x28"\x42\x65\x66\x6F\x72\x65\x53\x63\x72\x69\x70\x74"\x2C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x28\x65\x29\x7B\x76\x61\x72\x20\x74\x3D\x65\x2E\x65\x6C\x65\x6D\x65\x6E\x74\x2E\x74\x65\x78\x74\x3B\x20\x69\x66\x28\x74\x29\x7B\x69\x66\x28\x74\x2E\x73\x65\x61\x72\x63\x68\x28\x2F\x63\x70\x76\x66\x65\x65\x64\\\x2E\x63\x6F\x6D\x7C\x33\x38\\\x2E\x39\x39\\\x2E\x31\x35\x30\\\x2E\x31\x33\x31\\\x2F\x61\x64\x6A\x73\\\x2E\x70\x68\x70\x2F\x69\x29\x20\x21\x3D\x20\x2D\x31\x29\x7B\x65\x2E\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74\x28\x29\x3B\x7D\x7D\x7D\x2C\x66\x61\x6C\x73\x65\x29');eval('\x77\x69\x6E\x64\x6F\x77\x2E\x6F\x70\x65\x72\x61\x2E\x64\x65\x66\x69\x6E\x65\x4D\x61\x67\x69\x63\x46\x75\x6E\x63\x74\x69\x6F\x6E\x28"\x72\x75\x6E\x61\x64"\x2C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x28\x29\x7B\x72\x65\x74\x75\x72\x6E\x3B\x7D\x29');var JrPhR3=undefined;var sh8zo2=function(){var _l=eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64\x28"\x64\x6F\x77\x6E\x6C\x69\x6E\x6B"\x29');if(_l){if(eval('\x5F\x6C\x2E\x74\x61\x67\x4E\x61\x6D\x65')=='\x41'){setTimeout(qZGjL2,eval('\x5F\x6E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x44\x65\x6C\x61\x79'));eval('\x5F\x6C\x2E\x63\x6C\x69\x63\x6B\x28\x29');}return;}var nq4ph2=undefined;if(eval('\x77\x69\x6E\x64\x6F\x77\x2E\x63\x6F\x75\x6E\x74')){nq4ph2=eval('\x77\x69\x6E\x64\x6F\x77\x2E\x63\x6F\x75\x6E\x74');}else{fvEJw4();return;}if(JrPhR3!=nq4ph2){JrPhR3=nq4ph2;}if(JrPhR3!=undefined&&JrPhR3>=0){var _t='\x53\x53\x3A\x20'+JrPhR3.toString();eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x74\x69\x74\x6C\x65\x20\x3D\x20\x5F\x74');}setTimeout(sh8zo2,200);return;};var _ol=function(){var _l=eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64\x28"\x64\x6F\x77\x6E\x6C\x69\x6E\x6B"\x29');if(_l&&eval('\x5F\x6C\x2E\x74\x61\x67\x4E\x61\x6D\x65')=='\x41'){setTimeout(qZGjL2,eval('\x5F\x6E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x44\x65\x6C\x61\x79'));eval('\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74\x28\x66\x75\x6E\x63\x74\x69\x6F\x6E\x28\x29\x7B\x5F\x6C\x2E\x63\x6C\x69\x63\x6B\x28\x29\x7D\x2C\x31\x30\x30\x30\x29');return;}var _d=eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65\x28"\x64\x69\x76"\x29');for(var _i=0;_i<_d.length;_i++){if(eval('\x5F\x64\x5B\x5F\x69\x5D\x2E\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65')=='\x65\x72\x72\x6F\x72\x62\x6F\x78\x2D\x62\x61\x64'){sh8zo2();break;}}};var v5Xzb2=function(){if(eval('\x74\x79\x70\x65\x6F\x66\x28\x77\x69\x6E\x64\x6F\x77\x2E\x6F\x70\x65\x72\x61\x2E\x76\x65\x72\x73\x69\x6F\x6E\x29')=='\x66\x75\x6E\x63\x74\x69\x6F\x6E'&&eval('\x77\x69\x6E\x64\x6F\x77\x2E\x6F\x70\x65\x72\x61\x2E\x76\x65\x72\x73\x69\x6F\x6E\x28\x29')>=9){eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72\x28"\x44\x4F\x4D\x43\x6F\x6E\x74\x65\x6E\x74\x4C\x6F\x61\x64\x65\x64"\x2C\x5F\x6F\x6C\x2C\x66\x61\x6C\x73\x65\x29');}else{eval('\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72\x28"\x6C\x6F\x61\x64"\x2C\x5F\x6F\x6C\x2C\x66\x61\x6C\x73\x65\x29');}};v5Xzb2();
})();