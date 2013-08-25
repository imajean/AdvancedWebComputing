
<!-- saved from url=(0056)http://www.cursor-switch.com/widgets/11061/9236284514.js -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>var csw_images = new Array('33877.gif','33875.gif','33874.gif','33873.gif','33872.gif');
var csw_amount = 3;
var csw_interval = 3*15;
var csw_afterimage = 'yes';
var csw_blinking = 'no';
var csw_spreading = 'no';
var csw_design = 1;
var csw_base = "http://www.cursor-switch.com/images/";
var csw_debug = 0;

var csw_off = 0;
var csw_deleted = 0;
var csw_flakes = new Array();
var csw_flakes_id = new Array();
var csw_timers = new Array();
var csw_blink = new Array();
var csw_started = 0;
var csw_ltp = (document.layers) ? true:false;
var csw_docall = (document.all) ? true:false;
var csw_ns6=document.getElementById&amp;&amp;!document.all;
var csw_no = csw_amount*csw_images.length;
var csw_cur_no = 0;
var cur_flake = 0;
var csw_img_max = csw_images.length;

var csw_step = 0;
var csw_img = 0;

function csw_switch_on()
{
	document.getElementById('csw_switch_off').style.display = "none";	
	document.getElementById('csw_switch_on').style.display = "block";
}

function csw_switch_off()
{
	document.getElementById('csw_switch_on').style.display = "none";	
	document.getElementById('csw_switch_off').style.display = "block";
}

function csw_add_onload_event(fnc)
{
  if ( typeof window.addEventListener != "undefined" )
    window.addEventListener( "load", fnc, false );
  else if ( typeof window.attachEvent != "undefined" ) {
    window.attachEvent( "onload", fnc );
  }
  else {
    if ( window.onload != null ) {
      var oldOnload = window.onload;
      window.onload = function ( e ) {
        oldOnload( e );
        window[fnc]();
      };
    }
    else
      window.onload = fnc;
  }
}

function csw_start(sw)
{
	if(csw_deleted == 1) return;

	var i = 0;

	if(csw_started == 1)
	{
		if(sw == 1) csw_switch_off();
		csw_started = 0;
		
		if(csw_debug == 1)
		{
			for(i in csw_flakes)
			{
				parent.document.body.removeChild(csw_flakes[i]);
				delete csw_flakes[i];
			}
		}
		else
		{
			for(i in csw_flakes)
			{
				document.body.removeChild(csw_flakes[i]);
				delete csw_flakes[i];
			}
		}
		
		return;
	}

	csw_started = 1;
	if(sw == 1) csw_switch_on();

	csw_animate();	
}

var posX, posY, lastX, lastY;
lastX = 0;
lastY = 0;

function csw_track_pos(e)
{
	if(e)
	{
		if(csw_debug == 1)
		{
			//posX = (parseInt(e.clientX+10) + parseInt(parent.document.documentElement.scrollLeft));
			//posY = (parseInt(e.clientY) + parseInt(parent.document.documentElement.scrollTop));
			posX = parent.pageXOffset+e.clientX;
			posY = parent.pageYOffset+e.clientY;
		}
		else
		{
			posX = parseInt(e.pageX+10);
			posY = parseInt(e.pageY);
		}
	} 
	else
	{

		if(csw_debug == 1)
		{
			posX = (parseInt(event.clientX+10) + parseInt(parent.document.documentElement.scrollLeft));
			posY = (parseInt(event.clientY) + parseInt(parent.document.documentElement.scrollTop));
		}
		else
		{
			posX = (parseInt(event.clientX+10) + parseInt(document.documentElement.scrollLeft));
			posY = (parseInt(event.clientY) + parseInt(document.documentElement.scrollTop));
		}

	 }

	if (posX&gt;(lastX+csw_interval)||posX&lt;(lastX-csw_interval)||posY&gt;(lastY+csw_interval)||posY&lt;(lastY-csw_interval))
	{
		csw_place_flake(posX,posY);
		lastX = posX;
		lastY = posY;
	}
}

function csw_place_flake(x, y)
{
	if(csw_started == 0)
		return;

	if(csw_debug == 1)
 		var new_x = csw_ns6? Math.min(x,parent.window.innerWidth-75) : csw_docall? Math.min(x,parent.document.body.clientWidth-55) : x;
	else
 		var new_x = csw_ns6? Math.min(x,window.innerWidth-75) : csw_docall? Math.min(x,document.body.clientWidth-55) : x;

		csw_cur_no++;
		csw_step++;

		if(csw_debug == 1)
		{
			if(csw_flakes[csw_step-csw_no] != undefined)
			{
				parent.document.body.removeChild(csw_flakes[csw_step-csw_no]);
				delete csw_flakes[csw_step-csw_no];
			}

			var flake = parent.document.createElement('img');
		}
		else
		{
			if(csw_flakes[csw_step-csw_no] != undefined)
			{
				document.body.removeChild(csw_flakes[csw_step-csw_no]);
				delete csw_flakes[csw_step-csw_no];
			}

			var flake = document.createElement('img');
		}

		flake.setAttribute('id', "csw_flake" + csw_step);
		flake.setAttribute('src', csw_base + csw_images[csw_img]);
		
		if(csw_debug == 1)
			parent.flake_append(flake);
		else
			document.body.appendChild(flake);
			
		flake.style.position = "absolute";
		flake.style.zIndex = 1000 + csw_step;
		flake.style.top = y+"px";
		flake.style.left = new_x+"px";
		csw_flakes[csw_step] = flake;
		//csw_flakes_id[csw_step] = "csw_flake" + csw_step;

		if(csw_img == csw_img_max-1)
			csw_img = 0;
		else
			csw_img++;

		if(csw_blinking == 'yes')
		{
			csw_blink[csw_step] = true;
			setTimeout("csw_f_blinking("+csw_step+")", 100);
		}

		if(csw_spreading == 'yes')
			csw_f_spreading(csw_step, y);
		if(csw_afterimage == 'yes')
			eval('t'+cur_flake+' = setTimeout("csw_fade_flake('+csw_step+')", 600);');
		else
			eval('t'+csw_step+' = setTimeout("csw_unplace_flake('+csw_step+')", 2000);');
}

function csw_f_spreading(step, y)
{
	if(csw_started == 0) return;

	if(csw_flakes[step] != undefined)
	{
		for (i = 0; i &lt;= 1; i += 0.01) {
			setTimeout("csw_spread("+step+", " + (1 - i) +", "+(y+100)+")", i * 1000);
		}

		setTimeout("csw_unplace_flake("+step+")", 1000);
	}
}

function csw_spread(step, opa, y)
{
	if(csw_flakes[step] != undefined)
	{
		var element = csw_flakes[step];

		element.style.top = (y-(opa*100))+"px";

		element.style.opacity = opa;
		element.style.MozOpacity = opa;
		element.style.KhtmlOpacity = opa;
		element.style.filter = 'alpha(opacity=' + (opa * 100) + ');';
	}
}

function csw_f_blinking(step)
{
	if(csw_started == 0) return;

	if(csw_flakes[step] != undefined)
	{
		if(csw_blink[step] == false)
		{
			csw_opa(step, 0.5);
			csw_blink[step] = true;
		}
		else
		{
			csw_opa(step, 1);
			csw_blink[step] = false;
		}

		setTimeout("csw_f_blinking("+step+")", 100);
	}
}

function csw_opa(step, opa)
{
	if(csw_flakes[step] != undefined)
	{
		var element = csw_flakes[step];

		element.style.opacity = opa;
		element.style.MozOpacity = opa;
		element.style.KhtmlOpacity = opa;
		element.style.filter = 'alpha(opacity=' + (opa * 100) + ');';
	}
}

function csw_fade_flake(step)
{
	if(csw_started == 0) return;

	if(csw_flakes[step] != undefined)
	{
		for (i = 0; i &lt;= 1; i += 0.01) {
			setTimeout("csw_opa("+step+", " + (1 - i) +")", i * 1000);
		}

		setTimeout("csw_unplace_flake("+step+")", 1000);
	}
}

function csw_unplace_flake(step)
{
		if(csw_started == 0) return;

		if(csw_debug == 1)
		{
			if(csw_flakes[step] != undefined)
			{
				parent.document.body.removeChild(csw_flakes[step]);
				delete csw_flakes[step];
			}
		}
		else
		{
			if(csw_flakes[step] != undefined)
			{
				document.body.removeChild(csw_flakes[step]);
				delete csw_flakes[step];
			}
		}
}

function csw_animate() 
{
	if(csw_started == 0)
		return;

	if(csw_debug == 1)
	{
		if (csw_ltp) {
			parent.document.captureEvents(Event.MOUSEMOVE);
			parent.document.onMouseMove = csw_track_pos;
		} else {
			parent.document.onmousemove = csw_track_pos;
		}
	}
	else
	{
		if (csw_ltp) {
			document.captureEvents(Event.MOUSEMOVE);
			document.onMouseMove = csw_track_pos;
		} else {
			document.onmousemove = csw_track_pos;
		}
	}
}

if (csw_off == 0) csw_add_onload_event(function () { if(csw_started == 0) { csw_start(1);}});
document.write("<div style="\&quot;width:" 160px;="" text-align:="" center;="" line-height:="" 100%;="" margin:="" 0="" auto;\"="">  	<div id="\&quot;csw_switch_on\&quot;" style="\&quot;display:none;\&quot;"> 		<div style="\&quot;background:" url(http:="" www.cursor-switch.com="" ui="" images="" widget="" 1_on.png)="" no-repeat;="" width:="" 160px;="" height:="" 100px;="" overflow:="" hidden\"=""> 			<img src="./cursor_files/-" border="\&quot;0\&quot;" width="\&quot;160\&quot;" height="\&quot;85\&quot;" usemap="\&quot;#switch\&quot;"> 			<map name="\&quot;switch\&quot;"> 			<area href="http://www.cursor-switch.com/%22javascript:csw_start(1);/%22" coords="\&quot;45,25,113,77\&quot;" alt="\&quot;スイッチOFF\&quot;"> 			<area href="http://www.cursor-switch.com/%22http://www.cursor-switch.com//%22" coords="\&quot;0,0,160,24\&quot;" alt="\&quot;カーソル•スイッチOFF\&quot;" target="\&quot;_blank\&quot;"> 			</map> 			<div style="\&quot;line-height:" 100%;="" text-align:="" center;\"=""><a target="\&quot;_blank\&quot;" href="http://www.cursor-switch.com/%22http://www.cursor-switch.com/widget/11061/%22" style="\&quot;color:" #666;="" font-size:="" 10px;="" text-decoration:="" none;="" border:="" line-height:="" 100%\"="" title="\&quot;Cute" navin\"="">Cute Navin</a></div> 		</div> 	</div>  	<div id="\&quot;csw_switch_off\&quot;"> 		<div style="\&quot;background:" url(http:="" www.cursor-switch.com="" ui="" images="" widget="" 1_off.png)="" no-repeat;="" width:="" 160px;="" height:="" 100px\"=""> 			<img src="./cursor_files/-" border="\&quot;0\&quot;" width="\&quot;160\&quot;" height="\&quot;85\&quot;" usemap="\&quot;#switch\&quot;"> 			<map name="\&quot;switch\&quot;"> 			<area href="http://www.cursor-switch.com/%22javascript:csw_start(1);/%22" coords="\&quot;45,25,113,77\&quot;" alt="\&quot;スイッチON\&quot;"> 			<area href="http://www.cursor-switch.com/%22http://www.cursor-switch.com//%22" coords="\&quot;0,0,160,24\&quot;" alt="\&quot;カーソル•スイッチ\&quot;" target="\&quot;_blank\&quot;"> 			</map> 			<div style="\&quot;line-height:" 100%;="" text-align:="" center;\"=""><a target="\&quot;_blank\&quot;" href="http://www.cursor-switch.com/%22http://www.cursor-switch.com/widget/11061/%22" style="\&quot;color:" #666;="" font-size:="" 10px;="" text-decoration:="" none;="" border:="" line-height:="" 100%\"="" title="\&quot;Cute" navin\"="">Cute Navin</a></div> 		</div> 	</div> 	 </div> ");<div id="window-resizer-tooltip"><a href="http://www.cursor-switch.com/widgets/11061/9236284514.js#" title="Edit settings" style="background-image: url(chrome-extension://kkelicaakdanhinjdeammmilcgefonfh/images/icon_19.png);"></a><span class="tooltipTitle">Window size: </span><span class="tooltipWidth" id="winWidth"></span> x <span class="tooltipHeight" id="winHeight"></span><br><span class="tooltipTitle">Viewport size: </span><span class="tooltipWidth" id="vpWidth"></span> x <span class="tooltipHeight" id="vpHeight"></span></div></body></html>