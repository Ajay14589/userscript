// ==UserScript==
// @name           VReel Page Customizer
// @namespace      http://userscripts.org/users/81100
// @version        1.0.7
// @description    Customize page and share CSS files for VReel
// @homepage       http://beta.vreel.net/profile_2705.html
// @include        http://beta.vreel.net/*
// @include        http://vreel.net/board/*
// ==/UserScript==
//
//
//
//

(function() {

var	subwin_name = "user_css_win";
// check the sub window made by my script
var query = '//meta[@name="chemera"]';
var nodes = xpath(query);
if(nodes.length) {
	return;
}

function $(id) {
	return document.getElementById(id);
}

const	CSS_UNUSED_TYPE = 0;
const	CSS_URL_TYPE = 1;
const	CSS_CODE_TYPE = 2;
const	CSS_DISABLE_TYPE = 3;

const	SETTYPE_APPEND = 0;
const	SETTYPE_REPLACE = 1;

// Log output object
var	LOG = {
// logmode: false = no output, true = output log
	logmode: false,
	initialize: function() {
		this.logmode = GM_getValue("logmode", this.logmode);
	},
	setmode: function (mode) {
		this.logmode = mode;
		GM_setValue("logmode", mode);
	},
	output: function(log) {
		if(this.logmode == true) {
			GM_log(log);
		}
	},
	ChangeLogMode: function() {
		var	on_off = ["OFF","ON"];
		var	now, next;
		if(LOG.logmode == true) {
			now = 1;
			next = 0;
		} else {
			now = 0;
			next = 1;
		}
		var msg = "Current log mode is "+on_off[now]+". Set log mode "+on_off[next]+". OK?";
		var ret = window.confirm(msg);
		if(ret == true) {
			if(next == 1) {
				LOG.setmode(true);
			} else {
				LOG.setmode(false);
			}
		}
	}
}

// Sub window object
var	Sub_Win = {
	sub_win: '',
	url: '',

	open: function(url) {
LOG.output("Sub_Win: open");
		this.url = url;
		this.sub_win = window.open(url?url:'',subwin_name,"");
		if(!this.url) {
			with(this.sub_win.document) {
				open();
				write('<html><meta name="chemera" content="This window is created by script"><body>');
			}
		}
	},

	write: function(str) {
LOG.output("Sub_Win: write");
		if(this.sub_win == '') {
			return;
		}
		this.sub_win.document.write(str);
	},

	close: function() {
LOG.output("Sub_Win: close");
		if(this.sub_win == '') {
			return;
		}
		if(!this.url) {
			with(this.sub_win.document) {
				write("</body></html>");
				close();
			}
		}
	},

	window_close: function() {
LOG.output("Sub_Win: window_close");
		if(this.sub_win == '') {
			return;
		}
		this.sub_win.close();
	}
}

var Util = {
	// Triming left and right space
	Trim: function(str) {
		return str.replace( /^\s*/, "" ).replace( /\s*$/, "" );
	},

	// Triming right space
	Rtrim: function(str) {
		return str.replace( /\s*$/, "" );
	},

	// Triming left space
	Ltrim: function(str) {
		return str.replace( /^\s*/, "" );
	},

	// no operation
	NoOperation: function() {
	}
}

// window.location.href utility
var	Href = {
	indexOf: function(url) {
		return window.location.href.indexOf(url);
	},

	match: function(regexp) {
		return window.location.href.match(regexp);
	},

	equal: function(url) {
		return (window.location.href == url);
	}

}

// Drag and Drop object
var DnD = {
	startX:0,		// Starting mouse X position
	startY:0,		// Starting mouse Y position
	offsetLeft:0,		// Starting drag_obj left position
	offsetTop:0,		// Starting drag_obj top position
	click_obj: null,	// trigger object
	drag_obj: null,		// drag object
	callback: [],		// callback functions
	status: 0,		// drag status

// Initialize DnD object with click_obj and drag_obj.
// click_obj: a trigger object when the mouse button was clicked.
// drag_obj: the object which should be dragged.
// The parameter is allowed string and node object.
// If the parameter is string,it has to be the node ID.
	initialize: function(click_obj, drag_obj) {
		if( typeof click_obj == 'object') {
			this.click_obj = click_obj;
		} else if( typeof click_obj == 'string') {
			this.click_obj = $(click_obj);
		} else {
			return false;
		}
		if( typeof drag_obj == 'object') {
			this.drag_obj = drag_obj;
		} else if( typeof drag_obj == 'string') {
			this.drag_obj = $(drag_obj);
		} else {
			return false;
		}
		this.click_obj.addEventListener('mousedown', 
			function(e){
				DnD.start(e);
			}, 
			true);
		DnD.status = 0;
		document.addEventListener("mousemove", DnD.dragging, true);
		document.addEventListener("mouseup", DnD.stop, true);
	},

// Set a callback function.
// The callback function is called with click_obj and drag_obj parameter before the function phase finished.
	setCallback: function(stat, callback) {
		if( typeof callback == 'function') {
			var phase = ['start','dragging','stop'].indexOf(stat);
			if(phase >= 0) {
				this.callback[phase] = callback;
			}
		}
	},

// Drag start
	start: function(e) {
		DnD.startX = e.clientX;
		DnD.startY = e.clientY;
		DnD.offsetLeft  = DnD.drag_obj.offsetLeft;
		DnD.offsetTop   = DnD.drag_obj.offsetTop;
		e.preventDefault();
		DnD.click_obj.style.cursor = '-moz-grabbing';
		if(DnD.callback[0]) {
			DnD.callback[0](DnD.click_obj, DnD.drag_obj);
		}
		DnD.status = 1;
	},

// Dragging
	dragging: function(e) {
		if(DnD.status != 1) {
			return;
		}
		e.preventDefault();
		var x = DnD.offsetLeft + e.clientX - DnD.startX;
		var y = DnD.offsetTop + e.clientY - DnD.startY;
		DnD.drag_obj.style.left = x + "px";
		DnD.drag_obj.style.top = y + "px";
		if(DnD.callback[1]) {
			DnD.callback[1](DnD.click_obj, DnD.drag_obj);
		}
	},

// Drag stop
	stop: function(e) {
		if(DnD.status != 1) {
			return;
		}
		DnD.status = 0;
		DnD.click_obj.style.cursor = '-moz-grab';
		if(DnD.callback[2]) {
			DnD.callback[2](DnD.click_obj, DnD.drag_obj);
		}
	},

	finalize: function() {
		document.removeEventListener("mousemove", DnD.dragging, true);
		document.removeEventListener("mouseup", DnD.stop, true);
		this.status = 0;
		this.click_obj = null;
		this.drag_obj = null;
		for(var i = 0; i < this.callback.length; i++) this.callback[i] = null;
	}
};

function Customize() {
	this.element_key = new Array(10);
	this.element_value = new Array(10);
	this.xpath_key = new Array(10);
	this.xpath_value = new Array(10);
}
Customize.prototype = {
	page_id: 0,
	page_str: '',
	css_url_key: '',
	css_code_key: '',
	customize_type_key: '',
	element_customize_key: '',
	customize_type: 0,	// 0:unused, 1:URL, 2:CSS, 3:Disable
	element_customize: false,	// false:no, true:yes
	css_url: '',
	css_code: '',
	element_key: [],
	element_value: [],
	xpath_key: [],
	xpath_value: []
};

// Balloon(Tooltip)
var	Balloon = {
	parent: null,
	node: null,
	distX: 0,
	distY: 10,
	style: <><![CDATA[
		z-index: 200001;
		width: auto;
		height: auto;
		min-width: 100px;
		color: black;
		position:fixed;
		font-size:12px;
		background-color:#CCFFFF;
		border: 1px solid black;
		padding:4px;
		-moz-border-radius: 10px;
	]]></>+"",
	set_style: function(style) {
		if(!style) {
			this.style = style;
		}
	},
	create: function(e, parent, text, style) {
		if(typeof parent == 'string') {
			parent = $(parent);
		}
		if(typeof parent != 'object') {
			return;
		}
		var node = document.createElement('div');
		node.innerHTML = text;
		if(!style) {
			style = this.style;
		}
		node.setAttribute('style', style);
		parent.appendChild(node);
		var x = e.pageX - window.scrollX - node.offsetWidth/2;
		var y = e.pageY - window.scrollY + this.distY;
		node.style.left = x + "px";
		node.style.top = y + "px";

		this.parent = parent;
		this.node = node;
	},
	destroy: function() {
		if(this.parent) {
			this.parent.removeChild(this.node);
		}
		this.parent = null;
		this.node = null;

	},
}

// Language
var Lang = {
	default_lang: 'en',
	lang: 'en',
	set_lang: function(lang) {
		this.lang = lang;
	},
	initialize: function() {
		this.set_lang(navigator.language);
//		this.set_lang('en');	// for test
//		this.set_lang('fr');	// for test
	}
};

// Message
var Msg = {
	help: {
		en: "click: main site<br/>shift + click: mirror site",
		ja: "クリック: メインサイト<br/>shiftキーを押しながらクリック = ミラーサイト"
	},
	msg: function(target) {
		if(Msg[target]) {
			if(Msg[target][Lang.lang]) {
				return Msg[target][Lang.lang];
			} else {
				return Msg[target][Lang.default_lang];
			}
		} else {
			return '';
		}
	}
};

// Help
var Help = {
	site: {
		main: 'http://chemera.coolpage.biz/',
		mirror: 'http://www.chemera.byteact.com/',
	},
	page: {
		en: 'vreel_page_customizer.html#form',
		ja: 'vreel_page_customizer_j.html#form'
	},
	url: function(site) {
		if(this.site[site]) {
			if(this.page[Lang.lang]) {
				return this.site[site]+this.page[Lang.lang];
			} else {
				return this.site[site]+this.page[Lang.default_lang];
			}
		} else {
			return '';
		}
	},
	show: function(site) {
		if(Help.url(site)) {
			window.open(Help.url(site));
		}
	}
};

var	suffix = "_for_VReelPageCustomizer";
var Form = {
// properties
	margin_x: 20,	// 20 pixel
	margin_y: 20,	// 20 pixel
	x: 0,
	y: 0,
	current_mode: 0,	// 0:Normal, 1:Form opened
	all_or_this: 0,	// 0:all, 1:this
	current_option_no: 0,
	option_check: true,
	max_element_num: 10,
	system_style: '',
	user_css: '',
	current_css: '',
	current_all_or_this: 0,	// 0:all, 1:this
	customized: false,

	customize_type: 0,	// 0:Unused, 1:URL, 2:CSS, 3:Disable
	css_url: '',
	css_code: '',
	element_customize: '',

	custom: [],


// for the option
	option_value: [],
	enable_value: [],
	settype_value: [],
	ID_value: [],
	tagname_value: [],
	class_value: [],
	attr_name: [],
	attr_value: [],
	style_code_value: [],
	element_value: [],
	xpath_enable_value: [],
	xpath_value: [],

// IDs
	add_css_style_id: "gm_add_css_style" + suffix,
	base_id: "gm_base" + suffix,
	base_style_id: "gm_base_style" + suffix,
	div_id: "gm_div" + suffix,
	title_id: "gm_title" + suffix,
	command_id: "gm_command" + suffix,
	customize_type_id: "gm_customize_type" + suffix,
	reset_id: "gm_reset_button" + suffix,
	save_id: "gm_save_button" + suffix,
	quit_id: "gm_quit_button" + suffix,
	help_id: "gm_help_button" + suffix,
	preview_id: "gm_preview_button" + suffix,
	set_xpath_id: "gm_set_xpath_button" + suffix,
	clear_option_id: "gm_clear_option_button" + suffix,
	unusedtype_id: "gm_unusedtype_radio_button" + suffix,
	urltype_id: "gm_urltype_radio_button" + suffix,
	csstype_id: "gm_csstype_radio_button" + suffix,
	disabletype_id: "gm_disabletype_radio_button" + suffix,
	option_id: "gm_option_button" + suffix,
	div_unused_id: "gm_div_none" + suffix,
	div_url_id: "gm_div_url" + suffix,
	url_id: "gm_url" + suffix,
	div_css_id: "gm_div_css" + suffix,
	textarea_id: "gm_textarea" + suffix,
	div_disable_id: "gm_div_disable" + suffix,
	div_option_id: "gm_div_option" + suffix,
	div_option_no_id: "gm_div_option_no" + suffix,
	option_enable_id: "gm_option_enable" + suffix,
	span_settype_id: "gm_div_settype" + suffix,
	option_append_id: "gm_option_append" + suffix,
	option_replace_id: "gm_option_replace" + suffix,
	ID_id: "gm_option_ID" + suffix,
	tagname_id: "gm_option_tagname" + suffix,
	class_id: "gm_option_class" + suffix,
	attr_name_id: "gm_option_attr_name" + suffix,
	attr_val_id: "gm_option_attr_val" + suffix,
	style_id: "gm_option_style" + suffix,
	xpath_enable_id: "gm_xpath_enable" + suffix,
	xpath_id: "gm_xpath" + suffix,
	option_no_before: "gm_option_radio_",
	option_no_after: suffix,
	option_no_id: [],


// Classes
	label_class: "gm_label" + suffix,
	button_class: "gm_button" + suffix,
	radio_button_class: "gm_radio_button" + suffix,
	radio_label_class: "gm_radio_label" + suffix,
	check_box_class: "gm_check_box" + suffix,
	text_box_class: "gm_text_box" + suffix,
	option_tab_class: "gm_option_tab" + suffix,

// Names
	radio_customize_type: "$radio_customize_type" + suffix,
	radio_element: "$radio_element" + suffix,
	radio_set_type: "$radio_set_type" + suffix,


// Styles
	div_style_close: 'display:none;',
	div_style_open: 'display:block;',
	div_style_on: 'border-top:2px solid #000000;border-bottom:3px solid #DDDDDD;border-left:1px solid #000000;;border-right:2px solid #000000;background-color:#DDDDDD;',
	div_style_off: 'border-top:1px solid #000000;border-bottom:2px solid #888888;border-left:0;border-right:1px solid #000000;background-color:#888888;',
	style_readonly_on: 'background-color:#FFFFAA;',
	style_readonly_off: 'background-color:#FFFFFF;',

	style: <><![CDATA[
	#$base_id div { min-width:100px; }
	#$div_id { width:560px;z-index:200000;border: 6px ridge gray;position:fixed;background-color:#DDDDDD;font-weight: bold;text-align:left;color:#000000; }
	#$title_id { height:48px;font-weight:bold;text-align:center;padding-top:6px;color:#FFFFFF;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjAAAAABCAYAAADASJROAAADxklEQVRIiWXD51uVdRwH4F6XWmmlmZUZooBMZchGGYosBUU4bEHZe+912Bw2HDaHDSIbQRkiCkJlWmq5yizThuaf8OnF9/k9z3Ouc1/X/c67auEQf29vhMpN6pHYpB6JzfvYKGzeF4Ut+0U1orFFIxrvcz/QjKFa9EOtWHpAuFU7Dlu147CN1YnHNp14fKTLJvA/1qOf6CVSfbrdIAnbDZKwwyBZeJB+eihF6U7DVOw0TMVnRmwaf5cx1yQdu0zS8Tn3i8MZ1FT4pWkmNaO7zbKw2ywLX5lzLbL5e1jLHOyxzMHXVlTNKpda50HNOg97bYTqNvn0CN13tEDpfttCvoYdK4WGnRSa9lyHImg6FEFL9MCxYqXax0uoI9VxLIWOYyl0T4g6lUHXqQx6XH3ncupSAX2XChiIu1bCwLUSB93oITcZPUkNT1WpNHKvhpF7NYxZjxoYe9TA5DRbyz98hpp61ik1O1tPvYTmXg0w92qAhTdX0ggLSSMsJU2wlDTBykfUVw4rXzmsWb9mWPs1w8afHvFvoQHCowGtNJDaBrXBNqgNduy5dr59MNsB++AOOITQY+c7VR6/0EVDqWOoAo6hCpwI66bh1Cm8h+8cwfbCOaIXLpHcqD64RPXBVdQtup/G0JMxAzSWnoob5Luz8UNwjx+CRwI7DI+EYZxOFJ5JuqjUM3kEnskjOJtySalX6qhK77QxeKeNQZLOjkOSPg6fDNHMCfhkTsCX65c1SbOpf/aUMIcG5E4jIHcagWzeDALzZhCUz17mnyugwQWztJCGSOcQIp3DeekVYRG9UHxVaWjJPEJL5hFWKr6AsNIFhJdxyxcRXr6ICG5kxRKtFEZVXqMyGi1bRrRsGTFV3Orr/Fi2ZgWxNSuIq6XxtTdo3U1+Qj1NrF+lDTSpcU1pctMtfoqcXUeKfB2pzdyWDaS2bCBNNL31G6UZbd/SdprZ/h0/q4PbeRtZnbeRzc3p+p4q7iBHcQe54t13kdt9F3k9NL/nB9pLC/p+VFnYfw+F/fcgZQfuQzpwH0WD4g9QNPgAxUO0ZPgnpaUXf6YjwrKRhygbeYjyS9zRRygffYSK0ceoGH2MyjHR8SeoHH8CGTvxFLKJp6iapNWTvwinaM3Ur3Sa1s48Q+3MM9Sxl3/j18+yz1E/+xwNc7Txyu8qm67+QeepfP4F5PMv0LzwJ10Utiy+RMviS7Qusa/QuvQKbde4y3/x27kd1/+mK7Rz5R96g3bd/JevYFdfQ7H6Gt1r7Bt0r71Bzy1h7/p/Svs23qJv4y3+B1kVaAucXspFAAAAAElFTkSuQmCC");cursor:-moz-grab; }
	#$command_id { height:32px; font-weight: bold;text-align:center;color:#FFFFFF;background-color: transparent; }
	#$customize_type_id { height:24px; text-align:left;}
	#$reset_id { }
	#$save_id { }
	#$quit_id { }
	#$help_id { }
	.$button_class { color:buttontext;background-color:buttonface;height:24px;border:2px outset buttonface;margin:4px 4px 4px 40px;background-image:none;width:48px;}
	.$button_class:hover { cursor:pointer; }
	#$preview_id{width:60px;}
	.$label_class { font-size:11px;vertical-align:middle;height:40px;margin-left:4px; }
	.$radio_label_class { color: #000000; }
	.$radio_button_class { height:14px;width:14px;margin:4px 0px 0px 10px;vertical-align:bottom; }
	.$option_tab_class { height:20px;margin:0px;vertical-align:bottom;border:1px solid #000000;border-left:0;border-bottom:2px solid #888888;background-color:#888888;}
	.$check_box_class { height:14px;width:14px;margin:4px 0px 0px 10px;vertical-align:bottom; }
	.$text_box_class { margin-left:4px;margin-right:10px;height:16px;margin-top:4px;margin-bottom:4px;background-color:#FFFFFF;border:2px inset; }
	#$unusedtype_id { }
	#$urltype_id { }
	#$csstype_id { }
	#$disabletype_id { }
	#$option_id { }
	#$div_unused_id { height:24px;padding-top:4px;}
	#$div_url_id { }
	#$url_id { width:360px;text-align:left; }
	#$div_css_id {padding-top:4px;}
	#$textarea_id { width:99%;height:160px;color:#000000;background-color:#FFFFFF;border:2px inset; }
	#$div_disable_id { height:24px;padding-top:4px;}
	#$div_option_id { text-align:left;}
	#$div_option_no_id { font-size:11px;height:20px;text-align:left;padding-left:4px;vertical-align:middle;}
	#$span_settype_id { height:180px;text-align:left;padding-top:6px;padding-left:24px;vertical-align:middle;}
	#$option_enable_id { text-align:left;padding-left:4px;vertical-align:middle;}
	#$option_append_id { text-align:left;padding-left:4px;}
	#$option_replace_id { text-align:left;padding-left:4px;}
	#$ID_id { width:120px; }
	#$tagname_id {width:80px; }
	#$class_id {width:120px; }
	#$attr_name_id {width:100px; }
	#$attr_val_id {width:200px; }
	#$style_id {width:460px; }
	#$clear_option_id { color:buttontext;background-color:buttonface;height:24px;border:2px outset buttonface;margin:4px 4px 4px 4px;background-image:none;width:100px;}
	#$set_xpath_id { color:buttontext;background-color:buttonface;height:24px;border:2px outset buttonface;margin:4px 4px 4px 4px;background-image:none;width:80px;}
	#$xpath_enable_id { text-align:left;padding-left:4px;vertical-align:middle;}
	#$xpath_id {width:460px; background-color:#FFFFAA}
	#$div_id hr {margin-top: 0px;margin-bottom: 2px;}
	]]></>+"",

// Form HTML
	html: <><![CDATA[
	<div id="$div_id" style="display: none;">
	<div id="$title_id">Page customizer for VReel
	<div id="$command_id">
	<input id="$reset_id" type="button" class="$button_class" value="Reset" />
	<input id="$save_id" type="button" class="$button_class" value="Save" />
	<input id="$quit_id" type="button" class="$button_class" value="Quit" />
	<input id="$preview_id" type="button" class="$button_class" value="Preview" />
	<input id="$help_id" type="button" class="$button_class" value="Help" />
	</div>
	</div>
	<div id="$customize_type_id">
	<span class="$label_class">Customization Type:</span>
	<input id="$unusedtype_id" name="$radio_customize_type" type="radio" class="$radio_button_class" value="0" checked />
	<span class="$radio_label_class">Unused</span>
	<input id="$urltype_id" name="$radio_customize_type" type="radio" class="$radio_button_class" value="1" />
	<span class="$radio_label_class">URL</span>
	<input id="$csstype_id" name="$radio_customize_type" type="radio" class="$radio_button_class" value="2" />
	<span class="$radio_label_class">CSS code</span>
	<input id="$disabletype_id" name="$radio_customize_type" type="radio" class="$radio_button_class" value="3" />
	<span class="$radio_label_class">Disable </span>
	<input type="checkbox" class="$check_box_class" id="$option_id" ></input><span class="$label_class">Option</span>
	</div>
	<hr />
	<div id="$div_unused_id" style="display:block;">
	<span class="$label_class">No specification</span>
	</div>
	<div id="$div_url_id" style="display:none;">
	<span class="$label_class">Input URL of the CSS file:</span>
	<input id="$url_id" type="text" class="$text_box_class" value="" /><br />
	</div>
	<div id="$div_css_id" style="display:none;">
	<span class="$label_class">Input CSS code:</span>
	<textarea id="$textarea_id"></textarea>
	</div>
	<div id="$div_disable_id" style="display:none;">
	<span class="$label_class">Disable customizing</span>
	</div>
	<hr />
	<div id="$div_option_id" style="display:none;">
	<div id="$div_option_no_id">
	<span class="$label_class" style="vartical-align:bottom;height:20px;border-right:1px solid #000000;">Option No.: </span>
	<span class="$option_tab_class">
	<input id="$option_1_id" name="$radio_element" type="radio" class="$radio_button_class" value="1" checked />
	<span class="$radio_label_class">1</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_2_id" name="$radio_element" type="radio" class="$radio_button_class" value="2" />
	<span class="$radio_label_class">2</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_3_id" name="$radio_element" type="radio" class="$radio_button_class" value="3" />
	<span class="$radio_label_class">3</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_4_id" name="$radio_element" type="radio" class="$radio_button_class" value="4" />
	<span class="$radio_label_class">4</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_5_id" name="$radio_element" type="radio" class="$radio_button_class" value="5" />
	<span class="$radio_label_class">5</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_6_id" name="$radio_element" type="radio" class="$radio_button_class" value="6" />
	<span class="$radio_label_class">6</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_7_id" name="$radio_element" type="radio" class="$radio_button_class" value="7" />
	<span class="$radio_label_class">7</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_8_id" name="$radio_element" type="radio" class="$radio_button_class" value="8" />
	<span class="$radio_label_class">8</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_9_id" name="$radio_element" type="radio" class="$radio_button_class" value="9" />
	<span class="$radio_label_class">9</span>
	</span>
	<span class="$option_tab_class">
	<input id="$option_10_id" name="$radio_element" type="radio" class="$radio_button_class" value="10" />
	<span class="$radio_label_class">10</span>
	</span>
	</div>
	<hr />
	<input type="checkbox" class="$check_box_class" id="$option_enable_id" ></input><span class="$label_class">Enable this option </span>
	<span id="$span_settype_id">Set type:
	<input id="$option_append_id" name="$radio_set_type" type="radio" class="$radio_button_class" value="0" checked />
	<span class="$radio_label_class">Append</span>
	<input id="$option_replace_id" name="$radio_set_type" type="radio" class="$radio_button_class" value="1" />
	<span class="$radio_label_class">Replace</span>
	</span>
	<input id="$clear_option_id" type="button" class="$button_class" value="Clear Option" />
	<br />
	<span class="$label_class">Tag:</span>
	<input id="$tagname_id" type="text" class="$text_box_class" value="" />
	<span class="$label_class">ID:</span>
	<input id="$ID_id" type="text" class="$text_box_class" value="" />
	<span class="$label_class">Class:</span>
	<input id="$class_id" type="text" class="$text_box_class" value="" />
	<br />
	<span class="$label_class">Attribute:</span>
	<input id="$attr_name_id" type="text" class="$text_box_class" value="" />=
	<input id="$attr_val_id" type="text" class="$text_box_class" value="" />
	<input id="$set_xpath_id" type="button" class="$button_class" value="Set XPath" />
	<br />
	<span class="$label_class">Style Code:</span>
	<input id="$style_id" type="text" class="$text_box_class" value="" />
	<br />
	<input type="checkbox" class="$check_box_class" id="$xpath_enable_id" ></input>
	<span class="$label_class">XPath:</span>
	<input id="$xpath_id" type="text" class="$text_box_class" readonly value="" />
	<br />
	</div>
	</div>
	]]></>+"",

// functions
//// replace function replaces reserved word real value.
	replace: function(word) {
// ID specification(possibility of the plural elements in the style)
		word = word.replace(/\$base_id/g,this.base_id);
		word = word.replace(/\$div_id/g,this.div_id);
		word = word.replace(/\$title_id/g,this.title_id);
		word = word.replace(/\$command_id/g,this.command_id);
		word = word.replace(/\$customize_type_id/g,this.customize_type_id);
		word = word.replace(/\$reset_id/g,this.reset_id);
		word = word.replace(/\$save_id/g,this.save_id);
		word = word.replace(/\$quit_id/g,this.quit_id);
		word = word.replace(/\$help_id/g,this.help_id);
		word = word.replace(/\$preview_id/g,this.preview_id);
		word = word.replace(/\$clear_option_id/g,this.clear_option_id);
		word = word.replace(/\$set_xpath_id/g,this.set_xpath_id);
		word = word.replace(/\$unusedtype_id/g,this.unusedtype_id);
		word = word.replace(/\$urltype_id/g,this.urltype_id);
		word = word.replace(/\$csstype_id/g,this.csstype_id);
		word = word.replace(/\$disabletype_id/g,this.disabletype_id);
		word = word.replace(/\$option_id/g,this.option_id);
		word = word.replace(/\$div_unused_id/g,this.div_unused_id);
		word = word.replace(/\$div_url_id/g,this.div_url_id);
		word = word.replace(/\$url_id/g,this.url_id);
		word = word.replace(/\$div_css_id/g,this.div_css_id);
		word = word.replace(/\$textarea_id/g,this.textarea_id);
		word = word.replace(/\$div_disable_id/g,this.div_disable_id);
		word = word.replace(/\$div_option_id/g,this.div_option_id);
		word = word.replace(/\$div_option_no_id/g,this.div_option_no_id);
		word = word.replace(/\$option_enable_id/g,this.option_enable_id);
		word = word.replace(/\$span_settype_id/g,this.span_settype_id);
		word = word.replace(/\$option_append_id/g,this.option_append_id);
		word = word.replace(/\$option_replace_id/g,this.option_replace_id);
		word = word.replace(/\$ID_id/g,this.ID_id);
		word = word.replace(/\$tagname_id/g,this.tagname_id);
		word = word.replace(/\$class_id/g,this.class_id);
		word = word.replace(/\$attr_name_id/g,this.attr_name_id);
		word = word.replace(/\$attr_val_id/g,this.attr_val_id);
		word = word.replace(/\$style_id/g,this.style_id);
		word = word.replace(/\$xpath_enable_id/g,this.xpath_enable_id);
		word = word.replace(/\$xpath_id/g,this.xpath_id);
		for(i = 0; i < this.max_element_num; i++) {
			word = word.replace('$option_'+(i+1).toString()+'_id',this.option_no_id[i]);
		}
// Class specification(possibility of the plural elements)
		word = word.replace(/\$label_class/g,this.label_class);
		word = word.replace(/\$button_class/g,this.button_class);
		word = word.replace(/\$radio_button_class/g,this.radio_button_class);
		word = word.replace(/\$radio_label_class/g,this.radio_label_class);
		word = word.replace(/\$check_box_class/g,this.check_box_class);
		word = word.replace(/\$text_box_class/g,this.text_box_class);
		word = word.replace(/\$option_tab_class/g,this.option_tab_class);

// Name specification(possibility of the plural elements)
		word = word.replace(/\$radio_customize_type/g,this.radio_customize_type);
		word = word.replace(/\$radio_element/g,this.radio_element);
		word = word.replace(/\$radio_set_type/g,this.radio_set_type);
		return word;
	},

// key rules
// concatinate following items with "_"
//  (1) key_base
// following item is used if it is necessary
//  (2) customization type(css_url/css_code/customize_type/element_customize)
//  (3) this_page_id
//  (4) element_no
//  (5) xpath
// 
// [key rules for all ****** pages] use (1) and (2)
//  key_base + "_" + customization type
// [key rules for this ****** pages] use (1),(2) and (3)
//  key_base + "_" + customization type + "_" + this_page_id
// 
// for element customize
// [key rules for all ****** pages] use (1),(4) and (5)
//  key_base + "element_" + no
//  key_base + "element_" + no + "_" + "xpath"
// [key rules for this ****** pages] use (1),(3),(4) and (5)
//  key_base + "_" + this_page_id + "element_" + no
//  key_base + "_" + this_page_id + "element_" + no + "_" + "xpath"
// 

	make_key: function(all, key_base, this_page_id) {
		var	this_suffix = "";
		if(all == 1 && this_page_id) {
			this_suffix = '_' + this_page_id;
		}
		if(all == 1 && this_suffix == '') return;

		this.custom[all].css_url_key = key_base+"_css_url"+this_suffix;
		this.custom[all].css_code_key = key_base+"_css_code"+this_suffix;
		this.custom[all].customize_type_key = key_base+"_customize_type"+this_suffix;
		this.custom[all].element_customize_key = key_base+"_element_customize"+this_suffix;

// for option
		for(var i = 0; i < this.max_element_num; i++) {
// element
			this.custom[all].element_key[i] = key_base+this_suffix+"_element_"+i.toString();
			this.custom[all].element_value[i] = '';
// xpath
			this.custom[all].xpath_key[i] = this.custom[all].element_key[i]+"_xpath";
			this.custom[all].xpath_value[i] = '';
		}
	},

	initialize: function(page_id, page_str, this_page_id, this_page_str,
		key_base) {

LOG.output("Form.initialize");
LOG.output("page_id:"+page_id);
LOG.output("page_str:"+page_str);
LOG.output("this_page_id:"+this_page_id);
LOG.output("this_page_str:"+this_page_str);
LOG.output("key_base:"+key_base);

// clear option 
		this.custom = new Array(2);
		this.custom[0] = new Customize();
		this.custom[1] = new Customize();

		var i,j,k;
		for(i = 0; i < 2; i++) {
			for(var k = 0; k < this.max_element_num; k++) {
				this.custom[i].element_key[k] = '';
				this.custom[i].element_value[k] = '';
				this.custom[i].xpath_key[k] = '';
				this.custom[i].xpath_value[k] = '';
			}
			this.make_key(i, key_base, this_page_id);
		}

// 
// for all ****** pages
		this.custom[0].page_id = page_id;
		this.custom[0].page_str = page_str;

// for this ****** pages
		if(this_page_str) {
			this.custom[1].page_id = this_page_id;
			this.custom[1].page_str = this_page_str;
		}

		for(i = 0; i < this.max_element_num; i++) {
			this.option_no_id[i] = this.option_no_before+(i+1).toString()+this.option_no_after;
		}

		this.html = this.replace(this.html);
//LOG.output(this.html);
		this.style = this.replace(this.style);
//LOG.output(this.style);
	},

	addForm: function() {

		// create a new box for adding form
		var	div = document.createElement('div');
		div.id = this.base_id;
		div.innerHTML = this.html;
		var	style = document.createElement('style');
		style.id = this.base_style_id;
		style.innerHTML = this.style;

		// append above code in original page
		var body = document.getElementsByTagName("body");
		body[0].appendChild(style);
		body[0].appendChild(div);
		$(Form.reset_id).addEventListener("click",Form.Reset,false);
		$(Form.save_id).addEventListener("click",Form.Save,false);
		$(Form.quit_id).addEventListener("click",Form.Quit,false);
		$(Form.preview_id).addEventListener("click",Preview,false);
		$(Form.help_id).addEventListener("click", function(e){ Form.Help(e); },true);
		$(Form.help_id).addEventListener("mouseover",function(e){ Form.Help_Balloon(e, true);},true);
		$(Form.help_id).addEventListener("mouseout",function(e){ Form.Help_Balloon(e, false);},true);
		$(Form.set_xpath_id).addEventListener("click",SetXPath,false);
		$(Form.xpath_enable_id).addEventListener("click",XPathEnable,true);
		$(Form.clear_option_id).addEventListener("click",ClearOption,false);
		$(Form.unusedtype_id).addEventListener("click",UnusedType,false);
		$(Form.urltype_id).addEventListener("click",UrlType,false);
		$(Form.csstype_id).addEventListener("click",CssType,false);
		$(Form.disabletype_id).addEventListener("click",DisableType,false);
		$(Form.option_id).addEventListener("click",Option,false);
		for(i = 0; i < Form.max_element_num; i++) {
			$(Form.option_no_id[i]).addEventListener("change",ChangeOptionNo,false);
		}

		window.addEventListener("resize", Form.adjust_Form_Position,false);

	},

	delForm: function() {
		var node = $(this.base_id);
		if(node) {
			node.parentNode.removeChild(node);
		}
		node = $(this.base_style_id);
		if(node) {
			node.parentNode.removeChild(node);
		}
		window.removeEventListener("resize", Form.adjust_Form_Position,false);
	},

	outputValues: function() {
		LOG.output("all_or_this:"+this.all_or_this);
		var i, j;
		for(i = 0; i < 2;i++) {
			if(!this.custom[i].customize_type_key) {
				continue;
			}
			LOG.output("custom["+i+"].customize_type:"+this.custom[i].customize_type);
			LOG.output("custom["+i+"].element_customize:"+this.custom[i].element_customize);
			LOG.output("custom["+i+"].css_url:"+this.custom[i].css_url);
			LOG.output("custom["+i+"].css_code:"+this.custom[i].css_code);
			var k;
			for(k = 0; k < this.max_element_num; k++) {
				LOG.output("custom["+i+"].element_value["+k+"]:"+this.custom[i].element_value[k]);
				LOG.output("custom["+i+"].xpath_value["+k+"]:"+this.custom[i].xpath_value[k]);
			}
		}
	},

	outputKey: function() {
		var i, j;
		for(i = 0; i < 2;i++) {
			if(!this.custom[i].customize_type_key) {
				continue;
			}
			LOG.output("custom["+i+"].customize_type_key:"+this.custom[i].customize_type_key);
			LOG.output("custom["+i+"].element_customize_key:"+this.custom[i].element_customize_key);
			LOG.output("custom["+i+"].css_url_key:"+this.custom[i].css_url_key);
			LOG.output("custom["+i+"].css_code_key:"+this.custom[i].css_code_key);
			var k;
			for(k = 0; k < this.max_element_num; k++) {
				LOG.output("custom["+i+"].element_key["+k+"]:"+this.custom[i].element_key[k]);
				LOG.output("custom["+i+"].xpath_key["+k+"]:"+this.custom[i].xpath_key[k]);
			}
		}
	},

	getValue: function() {
LOG.output("Form.getValue");
		this.outputKey();
		var i, j;
		for(i = 0; i < 2;i++) {
			if(!this.custom[i].customize_type_key) {
				continue;
			}
			this.custom[i].customize_type = GM_getValue(this.custom[i].customize_type_key, this.custom[i].customize_type);
			this.custom[i].element_customize = GM_getValue(this.custom[i].element_customize_key, this.custom[i].element_customize);
			this.custom[i].css_url = GM_getValue(this.custom[i].css_url_key, this.custom[i].css_url);
			this.custom[i].css_code = GM_getValue(this.custom[i].css_code_key, this.custom[i].css_code);
			var	k;
			var	val;
			for(k = 0; k < this.max_element_num; k++) {
				this.custom[i].element_value[k] = GM_getValue(this.custom[i].element_key[k], "");
				this.custom[i].xpath_value[k] = GM_getValue(this.custom[i].xpath_key[k], "");
			}
		}
		this.outputValues();
	},

	setValue: function() {
LOG.output("Form.setValue");
		this.outputKey();
		var i, j;
		for(i = 0; i < 2;i++) {
			if(!this.custom[i].customize_type_key) {
				continue;
			}
			GM_setValue(this.custom[i].customize_type_key, this.custom[i].customize_type);
			GM_setValue(this.custom[i].element_customize_key, this.custom[i].element_customize);
			GM_setValue(this.custom[i].css_url_key, this.custom[i].css_url);
			GM_setValue(this.custom[i].css_code_key, this.custom[i].css_code);
			var	k;
			var	val;
			for(k = 0; k < this.max_element_num; k++) {
				if(this.custom[i].element_value[k]) {
					GM_setValue(this.custom[i].element_key[k], this.custom[i].element_value[k]);
				} else {
					GM_deleteValue(this.custom[i].element_key[k]);
				}
				if(this.custom[i].xpath_value[k]) {
					GM_setValue(this.custom[i].xpath_key[k], this.custom[i].xpath_value[k]);
				} else {
					GM_deleteValue(this.custom[i].xpath_key[k]);
				}
			}
		}
		this.outputValues();
	},

	getFormValue: function() {
LOG.output("Form.getFormValue");
		if($(this.urltype_id).checked) {
			this.customize_type = CSS_URL_TYPE;
		} else 
		if($(this.csstype_id).checked) {
			this.customize_type = CSS_CODE_TYPE;
		} else 
		if($(this.disabletype_id).checked) {
			this.customize_type = CSS_DISABLE_TYPE;
		} else {
			this.customize_type = CSS_UNUSED_TYPE;
		}
		this.element_customize = $(this.option_id).checked;
		this.css_url = Util.Trim($(this.url_id).value);
		this.css_code = Util.Trim($(this.textarea_id).value);
		this.outputValues();
	},

	getFormOptionValue: function(no) {
LOG.output("Form.getFormOptionValue("+no+")");
		this.enable_value[no] = $(this.option_enable_id).checked;
		if($(this.option_append_id).checked == true) {
			this.settype_value[no] = SETTYPE_APPEND;
		} else {
			this.settype_value[no] = SETTYPE_REPLACE;
		}
		this.ID_value[no] = $(this.ID_id).value;
		this.tagname_value[no] = $(this.tagname_id).value;
		this.class_value[no] = $(this.class_id).value;
		this.attr_name[no] = $(this.attr_name_id).value;
		this.attr_value[no] = $(this.attr_val_id).value;
		this.style_code_value[no] = $(this.style_id).value;

		var val = "enable="+this.enable_value[no]+" "+
			"settype="+this.settype_value[no]+" "+
			"ID="+this.ID_value[no]+" "+
			"tagname="+this.tagname_value[no]+" "+
			"class="+this.class_value[no]+" "+
			"attrname="+this.attr_name[no]+" "+
			"attrval="+this.attr_value[no]+" "+
			"style="+this.style_code_value[no];
LOG.output("val:"+val);
		this.element_value[no] = val;
		setOptionValueArray(no, val);
		if(checkElementValue(no) == false) {
			this.element_value[no] = "";
		}

		this.xpath_enable_value[no] = $(this.xpath_enable_id).checked;
LOG.output("xpath_enable_value["+no+"]:"+this.xpath_enable_value[no]);
		if(this.xpath_enable_value[no] == true) {
			this.xpath_value[no] = $(this.xpath_id).value;
		} else {
			this.xpath_value[no] = "";
		}
		setXpathValueArray(no, this.xpath_value[no]);
LOG.output("xpath_value["+no+"]:"+this.xpath_value[no]);
	},

	setFormOptionValue: function(no) {
LOG.output("Form.setFormOptionValue("+no+")");
		$(this.option_enable_id).checked = this.enable_value[no];
		$(this.ID_id).value = this.ID_value[no];
		if(this.settype_value[no] == SETTYPE_APPEND) {
			$(this.option_append_id).checked = true;
			$(this.option_replace_id).checked = false;
		} else {
			$(this.option_append_id).checked = false;
			$(this.option_replace_id).checked = true;
		}
		$(this.tagname_id).value = this.tagname_value[no];
		$(this.class_id).value = this.class_value[no];
		$(this.attr_name_id).value = this.attr_name[no];
		$(this.attr_val_id).value = this.attr_value[no];
		$(this.style_id).value = this.style_code_value[no];
		SetXPath();
		$(this.xpath_enable_id).checked = this.xpath_enable_value[no];
		if(this.xpath_enable_value[no] == true) {
			$(this.xpath_id).value = this.xpath_value[no];
		}
		XPathEnable();
		$(this.option_no_id[no]).parentNode.setAttribute('style',this.div_style_on);
	},

	checkFormValue: function() {
LOG.output("Form.checkFormValue");
		if(!$(this.urltype_id).checked &&
		   !$(this.csstype_id).checked &&
		   !$(this.disabletype_id).checked &&
		   !$(this.unusedtype_id).checked) {
			window.alert("Select Customization Type");
			return false;
		}
		if($(this.urltype_id).checked &&
		   Util.Trim($(this.url_id).value) == '') {
			window.alert("URL is not specified");
			return false;
		}
		if($(this.csstype_id).checked &&
		   Util.Trim($(this.textarea_id).value) == '') {
			window.alert("CSS code is not specified");
			return false;
		}
		return true;
	},

	checkFormOptionValue: function() {
LOG.output("Form.checkFormOptionValue");
		if($(this.option_enable_id).checked == false) {
		// do not check if option is disabled
			return true;
		}
		if($(this.option_append_id).checked == false &&
		   $(this.option_replace_id).checked == false) {
			window.alert("Set type is not selected");
			return false;
		}
//		if((Util.Trim($(this.ID_id).value) != '' ||
//		    Util.Trim($(this.tagname_id).value) != '' ||
//		    Util.Trim($(this.class_id).value) != '' ||
//		    Util.Trim($(this.attr_name_id).value) != '') &&
//		    Util.Trim($(this.style_id).value) == '') {
//			window.alert("Style Code is null");
//			return false;
//		}
		return true;
	},

	// Open form box
	openForm: function() {
		var div = $(this.div_id);
		var x = this.x;
		var y = this.y;
		div.setAttribute("style",Form.div_style_open+"top:"+y+"px;left:"+x+"px;");
		DnD.initialize(Form.title_id, div);
//		DnD.setCallback('dragging', Form.setPosition);
		DnD.setCallback('stop', Form.adjustPosition);
		this.current_mode = 1;
		this.adjust_Form_Position();
	},

	// Close form box
	closeForm: function(){
		var div = $(this.div_id);
		div.setAttribute("style", this.div_style_close);
		this.current_mode = 0;
		DnD.finalize();
	},

	// form opened?
	isFormOpened: function() {
		var div = $(this.div_id);
		if(!div) return false;
		var style = div.getAttribute("style");
		if(style.match(/display:(\s*)none;/)) {
			return false;
		} else {
			return true;
		}
	},

// Check current mode
	checkCurrentMode: function(mode,false_msg) {
		if(this.isFormOpened() == true) {
			this.current_mode = 1;
		} else {
			this.current_mode = 0;
		}
		if(this.current_mode == mode) {
			return true;
		} else {
			if(false_msg) {
				if(this.current_mode == 0) {
					window.alert("Form is not opened");
				} else {
					window.alert("Form is already opened");
				}
			}
			return false;
		}
	},

// callback function for dragging
	setPosition: function(click_obj, drag_obj) {
		Form.x = drag_obj.offsetLeft;
		Form.y = drag_obj.offsetTop;
	},

// callback function for drop
	adjustPosition: function(click_obj, drag_obj) {
		var	div = drag_obj;
		var	div_x = div.offsetLeft;
		var	div_y = div.offsetTop;
		var	win_height = window.innerHeight;
		var	win_width = window.innerWidth;
		var	div_height = div.offsetHeight;
		var	div_width = div.offsetWidth;
		var	margin_x = Form.margin_x;
		var	margin_y = Form.margin_y;
		var	adjust = 0;

		if(div_x + div_width + margin_x > win_width) {
			div_x = win_width - div_width - margin_x;
			adjust++;
		}
		if(div_x < margin_x) {
			div_x = margin_x;
			adjust++;
		}
		if(div_y + div_height + margin_y > win_height) {
			div_y = win_height - div_height - margin_y;
			adjust++;
		}
		if(div_y < margin_y) {
			div_y = margin_y;
			adjust++;
		}
		if(adjust) {
			div.style.left = div_x +"px";
			div.style.top = div_y +"px";
		}
		Form.x = div_x;
		Form.y = div_y;
		return;
	},

// Adjust Form Position
	adjust_Form_Position: function(){
		Form.moveForm(0, 0);
	},

// Move Form
	moveForm: function(dx, dy){
		var	win_height = window.innerHeight;
		var	win_width = window.innerWidth;
		var	x = this.x;
		var	y = this.y;
		var	div = $(this.div_id);
		var	div_height = div.offsetHeight;
		var	div_width = div.offsetWidth;
		var	margin_x = this.margin_x;
		var	margin_y = this.margin_y;

		x += dx;
		if(x + div_width + margin_x > win_width) {
			x = win_width - div_width - margin_x;
		}
		if(x < margin_x) {
			x = margin_x;
		}
		y += dy;
		if(y + div_height + margin_y > win_height) {
			y = win_height - div_height - margin_y;
		}
		if(y < margin_y) {
			y = margin_y;
		}
		this.x = x;
		this.y = y;
		if(this.current_mode == 1) {
			div.setAttribute("style",this.div_style_open+"top:"+y+"px;left:"+x+"px;");
		}
	},

// Reset Form
	Reset: function(){
//		Form.getValue();
		LoadCurrentConf();
		SetCurrentConf();
	},

// Save configration and CSS
	Save: function(){
		if(Form.checkFormOptionValue() == false) {
			return;
		}
		var ret = window.confirm('Save. Are you sure?');
		if(ret) {
			ret = Form.checkFormValue();
			if(ret) {
				Form.getFormValue();
				Form.getFormOptionValue(Form.current_option_no);
				StoreCurrentConf();
				Form.setValue();
				Form.closeForm();
				Form.delForm();
			}
		}
	},

// Help
	Help: function(e){
		if(Help.url('mirror') && e.shiftKey) {
			Help.show('mirror');
		} else {
			Help.show('main');
		}
	},

// Balloon of Help
	Help_Balloon: function(e, mode) {
		if(Help.url('mirror')) {
			if(mode == true) {
				Balloon.create(e, Form.div_id, Msg.msg('help'));
			} else {
				Balloon.destroy();
			}
		}

	},


// Quit configration and CSS without saving
	Quit: function(){
		var ret = window.confirm('Quit. Are you sure?');
		if(ret == true) {
//			Form.Reset();
//			Preview();
			Add_Preview_CSS(Form.current_css);
			Form.closeForm();
			Form.delForm();
		}
	}

}


// Main part
LOG.initialize();

Lang.initialize();

var	key_base = "";
var	css_url_key = "";
var	css_code_key = "";
var	customize_type_key = "";
var	this_css_url_key = "";
var	this_css_code_key = "";
var	this_customize_type_key = "";


var	login_id;

var	customizable_page = false;

var	page_id=0;	// 0:Profile
			// 1:Channel
			// 2:Community Group
			// 3:Community Groups(list pages)
			// 4:Watch
			// 5:Search result pages
			//10:Manage Movies(Update Information)
			//11:Manage Movies(My Videos)
			//12:Edit Profile(Account Settings)
			//13:My Profile(My Account)
			//14:friends
			//15:message
			//16:blocked users
			//17:subscriptions
			//18:Invite Friends
			//20:upload step 1/2 page
			//21:upload step 2/2 page
			//22:upload 3rd page(after upload)
			//97:top page
			//98:Other pages
			//99:Forum
var	page_str = "";
var	this_page_id="";
var	this_page_str ="";
var	p;

// for all user
// Profile pages
if(Href.indexOf('http://beta.vreel.net/profile_') >=0 ||
   Href.indexOf('http://beta.vreel.net/index.php?q=profile&id=') >=0) {
	key_base = "profile";
	page_id = 0;
	page_str = "all profile pages";
	p = Href.match(/profile_(\d*)\.html/);
	if(!p) {
		p = Href.match(/&id=(\d*).*/);
		if(!p) return;	// Maybe bug if return;
	}
// Individual user profile pages
	this_page_id = RegExp.$1;
	this_page_str = "this user profile pages(id="+ this_page_id + ")";


// Channel pages
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=channels') >=0) {
	key_base = "channel";
	page_id = 1;
	page_str = "all channel pages";
	p = Href.match(/&id=(\d*).*/);
	if(p) {
// Individual channel pages
		this_page_id = RegExp.$1;
		this_page_str = "this channel pages(id="+ this_page_id + ")";
	}


// Community group pages
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=community&a=show') >= 0) {
	key_base = "community_group";
	page_id = 2;
	customizable_page = true;
	page_str = "all community group pages";
	p = Href.match(/&id=(\d*).*/);
	if(!p) {
		return;	// Maybe bug if return;
	}
// Individual community group page
	this_page_id = RegExp.$1;
	this_page_str = "this community group pages(id="+ this_page_id + ")";


// Community groups list page
} else if(Href.equal('http://beta.vreel.net/index.php?q=community') ||
	  Href.indexOf('http://beta.vreel.net/index.php?q=community&page=') >= 0 ) {
	key_base = "community_list";
	page_id = 3;
	page_str = "community groups list pages";


// Video watch pages
} else if(Href.indexOf('http://beta.vreel.net/watch_') >=0) {
	key_base = "watch";
	page_id = 4;
	page_str = "watch pages";


// Search result pages
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=search') >= 0) {
	key_base = "search";
	page_id = 5;
	page_str = "search result pages";


// for login user
// Manage Movies(Update Information) page
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=mye2') >=0) {
	key_base = "mye2";
	page_id = 10;
	page_str = "Manage Movies(Update Information) page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// Manage Movies(My Videos) page
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=mye') >=0 ||
	  Href.equal('http://beta.vreel.net/?q=mye') ) {
	key_base = "mye";
	page_id = 11;
	page_str = "Manage Movies(My Videos) page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// Edit Profile(Account Settings) page
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=mya') >=0) {
	key_base = "mya";
	page_id = 12;
	page_str = "Edit Profile(Account Settings) page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// My profile page
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=my') >=0) {
	key_base = "my";
	page_id = 13;
	page_str = "my profile pages";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// My friends page
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=friends') >=0) {
	key_base = "friends";
	page_id = 14;
	page_str = "my friends page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// My message page
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=message') >=0) {
	key_base = "message";
	page_id = 15;
	page_str = "my message page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// blocked users
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=blocked') >=0) {
	key_base = "blocked";
	page_id = 16;
	page_str = "blocked users page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// subscriptions
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=subscribe2user') >=0) {
	key_base = "subscriptions";
	page_id = 17;
	page_str = "subscriptions page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// Invite Friends
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=invite') >=0) {
	key_base = "invite";
	page_id = 18;
	page_str = "Invite Friends page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// upload step 1/2 page(Input Video Information)
} else if(Href.equal('http://beta.vreel.net/index.php?q=upload')) {
	key_base = "upload";
	page_id = 20;
	page_str = "the upload step 1/2 page";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// After upload page(3rd page)
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=upload3') >= 0) {
	key_base = "upload3";
	page_id = 22;
	page_str = "uploading result page(3rd page)";

// Individual user profile pages
//	this_page_id = login_id;
	this_page_str = "this user's " + page_str;


// Forum thread
} else if(Href.indexOf('http://vreel.net/board/showthread.php') >= 0) {
	key_base = "thread";
	page_id = 99;
	page_str = "thread";

// Forum
} else if(Href.indexOf('http://vreel.net/board/') >= 0) {
	key_base = "forum";
	page_id = 99;
	page_str = "forum";

	p = Href.match(/forumdisplay\.php\?f=(\d*)/);
	if(p) {
// Individual furom
		this_page_id = RegExp.$1;
		this_page_str = "this forum(id="+this_page_id+")";

	} else if(Href.indexOf('/showthread.php') >= 0) {
// Thread
		this_page_id = "thread";
		this_page_str = "all thread";
	}


// Top page(including upload 2nd page,search result 1st page etc.)
} else if(Href.equal('http://beta.vreel.net/') ||
	  Href.equal('http://beta.vreel.net/index.php') ) {
	key_base = "top";
	page_id = 97;
	page_str = "the top page";
	p = $("search");
	if(p) {	// Search result 1st page
		key_base = "search";
		page_id = 5;
		page_str = "search result pages";
	} else {
		p = $("upload_submit");
		if(p) {	// upload step 2/2 page
			key_base = "upload2";
			page_id = 21;
			page_str = "the upload step 2/2 page";

		}
	}


// Other pages
} else if(Href.indexOf('http://beta.vreel.net/index.php?') >= 0 ) {
	key_base = "other";
	page_id = 98;
	page_str = "other";

	p = Href.match(/\?q=(.*)/);
	if(p) {
// Individual community group page
		this_page_id = RegExp.$1;
		this_page_str = "this "+ this_page_id + " pages";
	}


} else {
	return;
}

window.addEventListener("load",main,false);

function main() {
	login_id = Get_Login_Id();
	if(!this_page_id) {
		this_page_id = login_id;
	}
	Form.initialize(page_id, page_str, this_page_id, this_page_str, key_base),

//	if(customizable_page == true) {
		setUserCSS(GetUserCSS());
//	}

	Initialize();

	Get_CSS();	// Get CSS code from a server or local data

	Form.all_or_this = Form.current_all_or_this;
	Element_Type();
}

// Preview Page
function Preview(){
LOG.output("Preview");
	PreviewSub();
	if(Form.customize_type != CSS_DISABLE_TYPE) {
		Add_Preview_Element_Style();	// Add element style if not CSS_DISABLE_TYPE
	}
}

function PreviewSub() {
	var	css;
LOG.output("PreviewSub");
	Form.getFormValue();
	if(Form.customize_type == CSS_CODE_TYPE) {
		css = Form.css_code;
LOG.output("CSS_CODE_TYPE css:"+css);
		Add_Preview_CSS(css);
		return;
	} else if(Form.customize_type == CSS_URL_TYPE) {
LOG.output("CSS_URL_TYPE Form.css_url:"+Form.css_url);
		if(Form.css_url) {
			Get_Preview_CSS_by_GM_xmlhttpRequest(Form.css_url);
		} else {
			window.alert("URL is not entered");
		}
		return;
	} else if(Form.customize_type == CSS_DISABLE_TYPE) {
LOG.output("CSS_DISABLE_TYPE :");
		Add_Preview_CSS("");
		return;
	} else if(Form.customize_type == CSS_UNUSED_TYPE) {
LOG.output("CSS_UNUSED_TYPE :");
		css = Form.user_css;
		Add_Preview_CSS("");
		Set_System_CSS(css);
	} else {
		window.alert("This customization type is not supported");
		return;
	}
}


// Build XPath query string
function BuildXPath(tag_val, id_val, class_val, attr_name, attr_val){
	var	tag = '';
	var	query = '';
	var	count = 0;
	var	cond = new Array(3);

LOG.output("tag_val:"+tag_val);
	if(tag_val) {
		tag = tag_val;
	} else {
		tag = '*';
	}
LOG.output("id_val:"+id_val);
	if(id_val) {
		cond[count] = '@id="'+id_val+'"';
		count++;
	}
LOG.output("class_val:"+class_val);
	if(class_val) {
		cond[count] = '@class="'+class_val+'"';
		count++;
	}
LOG.output("attr_name:"+attr_name);
LOG.output("attr_val:"+attr_val);
	if(attr_name) {
		cond[count] = '@'+attr_name+'='+"'"+attr_val+"'";
		count++;
	}
	query = '//'+tag;
	if(count) {
		query = query + '[';
		for(var i = 0; i < count; i++) {
			query = query + cond[i];
			if(i+1 < count) {
				query = query + ' and ';
			}
		}
		query = query + ']';
	}
LOG.output("query:"+query);
	return query;
}

// Set XPath query condition
function SetXPath(){
	var	id_val = $(Form.ID_id).value;
	var	tag_val = $(Form.tagname_id).value;
	var	class_val = $(Form.class_id).value;
	var	attr_name = $(Form.attr_name_id).value;
	var	attr_val = $(Form.attr_val_id).value;
	var	query = '';

	query = BuildXPath(tag_val, id_val, class_val, attr_name, attr_val);
	$(Form.xpath_id).value = query;
}

// Clear Option
function ClearOption() {
	$(Form.option_enable_id).checked = false;
	$(Form.ID_id).value = '';
	$(Form.option_append_id).checked = true;
	$(Form.option_replace_id).checked = false;
	$(Form.xpath_enable_id).checked = false;
	$(Form.tagname_id).value = '';
	$(Form.class_id).value = '';
	$(Form.attr_name_id).value = '';
	$(Form.attr_val_id).value = '';
	$(Form.style_id).value = '';
	SetXPath();
}

// Open option box
function Option(){
	var	option_node = $(Form.option_id);
	var	div_option_node = $(Form.div_option_id);

	if(option_node.checked == true) {
		div_option_node.setAttribute('style',Form.div_style_open);
		Form.adjust_Form_Position();
	} else {
		div_option_node.setAttribute('style',Form.div_style_close);
	}
}

// Change Option No.
function ChangeOptionNo() {
	var i;
	var btn_node;
	var selected_option_no = 0;

	if(Form.option_check == false) {
		Form.option_check = true;
		return;
	}

	for(i = 0; i < Form.max_element_num; i++) {
		btn_node = $(Form.option_no_id[i]);
		if(btn_node.checked) {
			selected_option_no = i;
			break;
		}
	}
	if(Form.checkFormOptionValue() == false) {
		Form.option_check = false;
		btn_node = $(Form.option_no_id[Form.current_option_no]);
		btn_node.checked = true;
		return;
	}
	Form.getFormOptionValue(Form.current_option_no);
	Form.setFormOptionValue(selected_option_no);

	btn_node = $(Form.option_no_id[Form.current_option_no]);
	btn_node.parentNode.setAttribute('style',Form.div_style_off);

	Form.current_option_no = selected_option_no;
}

function UnusedType() {
	var	unused_node = $(Form.div_unused_id);
	var	url_node = $(Form.div_url_id);
	var	css_node = $(Form.div_css_id);
	var	disable_node = $(Form.div_disable_id);
	unused_node.setAttribute('style',Form.div_style_open);
	url_node.setAttribute('style',Form.div_style_close);
	css_node.setAttribute('style',Form.div_style_close);
	disable_node.setAttribute('style',Form.div_style_close);
}

function UrlType() {
	var	unused_node = $(Form.div_unused_id);
	var	url_node = $(Form.div_url_id);
	var	css_node = $(Form.div_css_id);
	var	disable_node = $(Form.div_disable_id);
	unused_node.setAttribute('style',Form.div_style_close);
	url_node.setAttribute('style',Form.div_style_open);
	css_node.setAttribute('style',Form.div_style_close);
	disable_node.setAttribute('style',Form.div_style_close);
}

function CssType() {
	var	unused_node = $(Form.div_unused_id);
	var	url_node = $(Form.div_url_id);
	var	css_node = $(Form.div_css_id);
	var	disable_node = $(Form.div_disable_id);
	unused_node.setAttribute('style',Form.div_style_close);
	url_node.setAttribute('style',Form.div_style_close);
	css_node.setAttribute('style',Form.div_style_open);
	disable_node.setAttribute('style',Form.div_style_close);
	Form.adjust_Form_Position();
}

function DisableType() {
	var	unused_node = $(Form.div_unused_id);
	var	url_node = $(Form.div_url_id);
	var	css_node = $(Form.div_css_id);
	var	disable_node = $(Form.div_disable_id);
	unused_node.setAttribute('style',Form.div_style_close);
	url_node.setAttribute('style',Form.div_style_close);
	css_node.setAttribute('style',Form.div_style_close);
	disable_node.setAttribute('style',Form.div_style_open);
}

function XPathEnable() {
	var	xpath_node = $(Form.xpath_id);
	var	xpath_enable_node = $(Form.xpath_enable_id);

	if(xpath_enable_node.checked == false) {
		xpath_node.setAttribute('readonly','');
		xpath_node.setAttribute('style',Form.style_readonly_on);
	} else {
		xpath_node.removeAttribute('readonly');
		xpath_node.setAttribute('style',Form.style_readonly_off);
	}
}

function checkElementValue(no) {
LOG.output("checkElementValue("+no+")");

	var	p;
	var	flag = false;
	if(Form.enable_value[no] == true) {
		flag = true;
	}
	if(Form.settype_value[no] != SETTYPE_APPEND) {
		flag = true;
	}
	if(Form.ID_value[no]) {
		flag = true;
	}
	if(Form.tagname_value[no]) {
		flag = true;
	}
	if(Form.class_value[no]) {
		flag = true;
	}
	if(Form.attr_name[no]) {
		flag = true;
	}
	if(Form.attr_value[no]) {
		flag = true;
	}
	if(Form.style_code_value[no]) {
		flag = true;
	}
	return flag;
}

function setOptionValueArray(no, val) {
LOG.output("setOptionValueArray("+no+")");

	var	p;
	p = val.match(/enable=(.*) settype=/);
	if(p) {
		Form.enable_value[no] = RegExp.$1;
	} else {
		Form.enable_value[no] = '';
	}
	if(Form.enable_value[no] == "true") {
		Form.enable_value[no] = true;
	} else {
		Form.enable_value[no] = false;
	}
	p = val.match(/ settype=(.*) ID=/);
	if(p) {
		Form.settype_value[no] = RegExp.$1;
	} else {
		Form.settype_value[no] = SETTYPE_APPEND;
	}
	p = val.match(/ ID=(.*) tagname=/);
	if(p) {
		Form.ID_value[no] = RegExp.$1;
	} else {
		Form.ID_value[no] = '';
	}
	p = val.match(/ tagname=(.*) class=/);
	if(p) {
		Form.tagname_value[no] = RegExp.$1;
	} else {
		Form.tagname_value[no] = '';
	}
	p = val.match(/ class=(.*) attrname=/);
	if(p) {
		Form.class_value[no] = RegExp.$1;
	} else {
		Form.class_value[no] = '';
	}
	p = val.match(/ attrname=(.*) attrval=/);
	if(p) {
		Form.attr_name[no] = RegExp.$1;
	} else {
		Form.attr_name[no] = '';
	}
	p = val.match(/ attrval=(.*) style=/);
	if(p) {
		Form.attr_value[no] = RegExp.$1;
	} else {
		Form.attr_value[no] = '';
	}
	p = val.match(/ style=(.*)/);
	if(p) {
		Form.style_code_value[no] = RegExp.$1;
	} else {
		Form.style_code_value[no] = '';
	}
}

function setXpathValueArray(no, val) {
	if(val) {
		Form.xpath_enable_value[no] = true;
		Form.xpath_value[no] = val;
	} else {
		Form.xpath_enable_value[no] = false;
		Form.xpath_value[no] = "";
	}
}


function setUserCSS(css) {
	Form.user_css = css;
	Form.current_css = css;
}


// Initialize
function	Initialize() {
	Form.getValue();

	GM_registerMenuCommand( "====== VReel Page Customizer  ======", Util.NoOperation);
	GM_registerMenuCommand( "Customize "+Form.custom[0].page_str, Configuration);
LOG.output("Form.custom[1].page_id: "+Form.custom[1].page_id);
	if(Form.custom[1].page_str != '') {	// page with ID
		GM_registerMenuCommand( "Customize "+Form.custom[1].page_str, ConfigurationWithID);
	}
	GM_registerMenuCommand( "Show Current CSS Code", ShowCurrentCSSCode);
	GM_registerMenuCommand( "Show Original CSS Code", ShowOriginalCSSCode);
	GM_registerMenuCommand( "View value list", ViewValueList);
	GM_registerMenuCommand( "Change log output mode for Page Customization for VReel", LOG.ChangeLogMode);

}

function Get_Login_Id() {
// login ID
	var	id = '';
	var	node = $("username");
LOG.output("node:"+node );
	if(node) {
		id = node.textContent;
	}
LOG.output("Get_Login_Id id:"+id );
	return id;
}


///////////////////// COMMON FUNTION /////////////////////
// Get result of HTTP request and add CSS
function get_css_result(res) {
	var css = res.responseText;
	var status = res.status;
LOG.output("HTTP status:"+status);
	if ( status != 200 ) {	// failed
		GM_log("Can't get CSS file (HTTP status="+status+")");
		return;
        }
        Add_CSS(css);
}

// Get result of HTTP request and add preview CSS
function get_preview_css_result(res) {
	var css = res.responseText;
	var status = res.status;
LOG.output("HTTP status:"+status);
	if ( status != 200 ) {	// failed
		window.alert("Can't get CSS file (HTTP status="+status+")");
		return;
        }
        Add_Preview_CSS(css);
}

function IsUserCSSUsed() {
	var css = GetUserCSS();
	if(!css) {
		return false;
	}
	return true;
}

function GetUserCSS() {

	var nodes = xpath('//head/style');
	if(nodes.length == 0) return '';
	var css = '';
	for(var i = 0; i < nodes.length; i++) {
		var pos = nodes[i].textContent.indexOf('GESTION DES SKINS');
		if(pos > 0) {
			css = nodes[i].textContent;
			Form.system_style = nodes[i];
			break;
		}
	}
	return (css);

}


//Add CSS code as last child node in head section
function Add_CSS(css) {
	Form.customized = false;
LOG.output("Add_CSS");
	var	old_node = $(Form.add_css_style_id);
	if(old_node) {
		old_node.innerHTML = css;
		Form.customized = true;
		Form.current_css = css;
		Set_System_CSS("");
		return;
	}
	var head = document.getElementsByTagName("head");
	if(head && head[0]) {
		var style = document.createElement('style');
		style.type = "text/css";
		style.innerHTML = css;
		style.setAttribute('id', Form.add_css_style_id);
		head[0].appendChild(style);
		Form.customized = true;
		Form.current_css = css;
		Set_System_CSS("");
	}
}

//Add CSS code in order to preview
function Add_Preview_CSS(css) {
LOG.output("Add_Preview_CSS");
LOG.output("css:"+css);

	Set_System_CSS("");
	var style = $(Form.add_css_style_id);
	if(style) {
		style.innerHTML = css;
		return;
	}
	var head = document.getElementsByTagName("head");
	if(head && head[0]) {
		var style = document.createElement('style');
		style.type = "text/css";
		style.innerHTML = css;
		style.setAttribute('id', Form.add_css_style_id);
		head[0].appendChild(style);
	}
}


function Set_System_CSS(css) {
LOG.output("Form.system_style:"+Form.system_style)
LOG.output("css:"+css)
	if(Form.system_style) {
		Form.system_style.innerHTML = css;
		return;
	}

	var nodes = xpath('//head/style');
	for(var i = 0; i < nodes.length; i++) {
		var pos = nodes[i].textContent.indexOf('GESTION DES SKINS');
		if(pos > 0) {
			Form.system_style = nodes[i];
			Form.system_style.innerHTML = css;
			break;
		}
	}
}

function Disable_Customization() {
//	if(customizable_page == true) {
		Set_System_CSS("");
//	}
}


function Check_Customize_Type(all) {
	if(Form.custom[all].customize_type == CSS_CODE_TYPE) {
		return CSS_CODE_TYPE;
	} else
	if(Form.custom[all].customize_type == CSS_URL_TYPE) {
		if(Form.custom[all].css_url) {
			return CSS_URL_TYPE;
		}
	}
	return CSS_UNUSED_TYPE;
}

function isDisableType(all) {
	if(Form.custom[all].customize_type == CSS_DISABLE_TYPE) {
		return true;
	}
	return false;
}

// Get CSS
function Get_CSS() {
	Form.current_all_or_this = 0;
	var	i, j;
	for(i = 1; i >=0; i--) {
		if(isDisableType(i)) {
			Form.current_all_or_this = i;
			Disable_Customization();
			return;
		}
	}
	var type;
	for(i = 1; i >= 0; i--) {
		type = Check_Customize_Type(i);
		if(type == CSS_CODE_TYPE) {
			Form.current_all_or_this = i;
			Get_CSS_by_GM_getValue(Form.custom[i].css_code);
			return;
		}
		if(type == CSS_URL_TYPE) {
			Form.current_all_or_this = i;
			Get_CSS_by_GM_xmlhttpRequest(Form.custom[i].css_url);
			return;
		}
	}
}

// Get CSS from web server
function Get_CSS_by_GM_xmlhttpRequest(url) {
	call_GM_xmlhttpRequest(url, get_css_result)
}

// Get CSS for preview from web server
function Get_Preview_CSS_by_GM_xmlhttpRequest(url) {
	call_GM_xmlhttpRequest(url, get_preview_css_result)
}

// call GM_xmlhttpRequest
function call_GM_xmlhttpRequest(url, result_func) {

	GM_xmlhttpRequest({
	  method:"GET",
	  url: url,
	  headers:{
	    "User-Agent":"Firefox",
	    "Accept":"text/*",
	    },
	  onload:result_func});
}

// Get CSS from Greasemonkey scriptvals
function Get_CSS_by_GM_getValue(css) {
        Add_CSS(css);
}

function Element_Type() {
	if(Form.customized == false) return;
	LoadCurrentConf();
	if(Form.customize_type != CSS_DISABLE_TYPE) {
		Add_Element_Style();	// Add element style if not CSS_DISABLE_TYPE
	}
}

// Set current configuration
function SetCurrentConf() {

	$(Form.title_id).firstChild.nodeValue = "Customize " + Form.page_str;
	if(Form.customize_type == CSS_URL_TYPE) {
		$(Form.urltype_id).checked = true;
		UrlType();
	} else
	if(Form.customize_type == CSS_CODE_TYPE) {
		$(Form.csstype_id).checked = true;
		CssType();
	} else
	if(Form.customize_type == CSS_DISABLE_TYPE) {
		$(Form.disabletype_id).checked = true;
		DisableType();
	} else {
		$(Form.unusedtype_id).checked = true;
		UnusedType();
	}
	$(Form.url_id).value = Form.css_url;
LOG.output("url: "+$(Form.url_id).value);
	$(Form.textarea_id).value = Form.css_code;
LOG.output("textarea: "+$(Form.textarea_id).value);
	if(Form.element_customize) {
		$(Form.option_id).checked = true;
	}
	Option();
	Form.setFormOptionValue(Form.current_option_no);
}

// Store current configuration to Customize object
function StoreCurrentConf() {
LOG.output("StoreCurrentConf");
	var	all = Form.all_or_this;

LOG.output("all:"+all);
//	Form.custom[all].page_str = Form.page_str;	// unnecessary
LOG.output("Form.customize_type:"+Form.customize_type);
LOG.output("Form.element_customize:"+Form.element_customize);
LOG.output("Form.css_url:"+Form.css_url);
LOG.output("Form.css_code:"+Form.css_code);
	Form.custom[all].customize_type = Form.customize_type;
	Form.custom[all].element_customize = Form.element_customize;
	Form.custom[all].css_url = Form.css_url;
	Form.custom[all].css_code = Form.css_code;

	for(var i = 0; i < Form.max_element_num; i++) {
LOG.output("Form.element_value["+i+"]:"+Form.element_value[i]);
LOG.output("Form.xpath_value["+i+"]:"+Form.xpath_value[i]);
		Form.custom[all].element_value[i] = Form.element_value[i];
		Form.custom[all].xpath_value[i] = Form.xpath_value[i];
	}
}

// Load current configuration from Customize object
function LoadCurrentConf() {
LOG.output("LoadCurrentConf");
	var	all = Form.all_or_this;

	Form.page_str = Form.custom[all].page_str;
	Form.customize_type = Form.custom[all].customize_type;
	Form.element_customize = Form.custom[all].element_customize;
	Form.css_url = Form.custom[all].css_url;
	Form.css_code = Form.custom[all].css_code;

	for(var i = 0; i < Form.max_element_num; i++) {
LOG.output("Form.custom["+all+"].element_value["+i+"]:"+Form.custom[all].element_value[i]);
LOG.output("Form.custom["+all+"].xpath_value["+i+"]:"+Form.custom[all].xpath_value[i]);
		Form.element_value[i] = Form.custom[all].element_value[i];
		setOptionValueArray(i, Form.element_value[i]);
		if(checkElementValue(i) == false) {
			Form.element_value[i] = "";
		}
		Form.xpath_value[i] = Form.custom[all].xpath_value[i];
		setXpathValueArray(i, Form.xpath_value[i]);
	}
}


// Configuration for all ****** pages
function Configuration() {
	if(!Form.checkCurrentMode(0, true)) return;
	Form.addForm();
	Form.all_or_this = 0;	// all ****** pages
	Form.option_check = false;
	LoadCurrentConf();
	SetCurrentConf();
	Form.option_check = true;
	Form.openForm();
}

// Configuration for this ****** pages
function ConfigurationWithID() {
	if(!Form.checkCurrentMode(0, true)) return;
	Form.addForm();
	Form.all_or_this = 1;	// this ****** pages
	Form.option_check = false;
	LoadCurrentConf();
	SetCurrentConf();
	Form.option_check = true;
	Form.openForm();
}

function ShowOriginalCSSCode() {
	var	css = Form.user_css;
	css = '<pre>'+css+'</pre>';
LOG.output("css:"+css);
	Sub_Win.open();
	Sub_Win.write(css);
	Sub_Win.close();
}

function ShowCurrentCSSCode() {
	var	css = Form.current_css;
	css = '<pre>'+css+'</pre>';
LOG.output("css:"+css);
	Sub_Win.open();
	Sub_Win.write(css);
	Sub_Win.close();
}

function ViewValueList() {
	var	keys = GM_listValues().sort();
	var	vals = keys.map(GM_getValue);

	var	str = "<style>body { background-color:#D0D0D0; } table,td {border:1px #808000 solid;border-collapse: collapse;empty-cells: show } .key {color: #007F00;} .val {color: #0000FF;} </style>";
	var	i;
	str = str + "<table>";
	for(i = 0; i < keys.length; i++) {
		str = str + "<tr>";
		str = str + "<td class='key'>" + keys[i] + "</td>";
//		str = str + " : ";
		str = str + "<td class='val'>" + vals[i] + "</td>";
//		str = str + "<br />";
		str = str + "</tr>";
		str = str + "\n";
	}
	str = str + "<tr/></table>";

	Sub_Win.open();
	Sub_Win.write(str);
	Sub_Win.close();
}

function xpath(query) {
	var results = document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = new Array();
	for(var i=0; i<results.snapshotLength; i++){
		nodes.push(results.snapshotItem(i));
	}
	return nodes;
}


function Add_Element_Style_Sub(no) {
	var	tag_val = Form.tagname_value[no];
	var	id_val = Form.ID_value[no];
	var	class_val = Form.class_value[no];
	var	attr_name = Form.attr_name[no];
	var	attr_val = Form.attr_value[no];
	var	style_code = Form.style_code_value[no];

	var query = BuildXPath(tag_val, id_val, class_val, attr_name, attr_val);
	var nodes = xpath(query);
LOG.output("nodes.length:"+nodes.length);
	var	val;
	for(var i=0; i < nodes.length; i++) {
		val = nodes[i].getAttribute('style');
LOG.output("nodes["+i+"].getAttribute('style'):"+val);
LOG.output("settype_value["+no+"]:"+Form.settype_value[no]);
		if(Form.settype_value[no] == SETTYPE_APPEND) {
			if(val) {
				val = val + style_code;
			} else {
				val = style_code;
			}
		} else {
			val = style_code;
		}
LOG.output("val:"+val);
		nodes[i].setAttribute('style', val);
LOG.output("nodes["+i+"].getAttribute('style'):"+nodes[i].getAttribute('style'));
	}
}

function Add_Element_Style() {
	var	i;

	for(i = 0; i < Form.max_element_num; i++) {
		if(Form.enable_value[i]) {
			Add_Element_Style_Sub(i);
		}
	}
}

function Add_Preview_Element_Style() {
	var	i;

	for(i = 0; i < Form.max_element_num; i++) {
		Form.getFormOptionValue(i);
		if(Form.enable_value[i]) {
			Add_Element_Style_Sub(i);
		}
	}
}

})();

