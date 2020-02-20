jQuery(function(){
	initLightbox();
	initOpClose();
	initFBlocks();
	initFixedBlocks();
	initOpenClose();	
})
jQuery(window).load(function(){
	initModalForm();
})

function show_form_in_top()
{
	$(".form_test_close").css('display','block').css('z-index','2000');
	$("#OverLay").css("display","block");
	$("#adv_block").css("z-index","2000");
}
$(".form_test_close").click(function(){
		$(".form_test_close").css('display','none')
		 					 .css('z-index','1');
		$("#OverLay").css("display","none");
		$("#adv_block").css("z-index","3");
		return false;
	});
$("#OverLay").click(function(){
		$(".form_test_close").css('display','none')
		 					 .css('z-index','1');
		$("#OverLay").css("display","none");
		$("#adv_block").css("z-index","3");
		return false;
	});
function initModalForm(){
	//forms
	$('.open-form').each(function(){
		var link = $(this);
		link.attr('href', link.attr('rel').split(';')[0]);
		var w = parseInt(link.attr('rel').split(';')[1], 10);
		var h = parseInt(link.attr('rel').split(';')[2], 10);
		link.removeAttr('rel');
		
		link.fancybox({
			overlayColor:'#000',
			overlayOpacity: 0.9,			
			centerOnScroll:true,
			type: 'iframe',
			width: w,
			height: h,
			padding:0,
			autoScale: false
		})
	})
	//modal window on load
	$('.modal-holder').each(function(){
		var holder = $(this);
		var link = $('.modal-opener', holder);
		var from = getUrlAttr('from');
		
		link.fancybox({
			'overlayColor': '#000',
			'type': 'inline',
			'modal': true
		})
		
		if (from.length > 0) {
			link.trigger('click');
		}
	})
}

//navigation & button up
function initFixedBlocks(){
	$('.btn-top').each(function(){
		var btn = $(this);
		var target = $(btn.attr('href'));
		var offset = 250;
		if ($.browser.msie && $.browser.version < 7){
			btn.css({
				'position':'absolute'
			})
			$(window).scroll(function(){
				if ($(window).scrollTop() < target.offset().top + offset) btn.hide();
				else btn.show()
				btn.css({
					'top': $(window).scrollTop()
				})
			})
		}
		else {
			$(window).scroll(function(){
				if ($(window).scrollTop() < target.offset().top + offset) btn.hide();
				else btn.show()
			})
		}
		
		btn.click(function(){
			$('html, body').animate({
				'scrollTop': target.offset().top
			}, 1000)
			return false;
		})
	})
	
}

//lightboxes for images
function initOpClose() {
	$('ul.tabs').delegate('li:not(.current)', 'click', function() {
		$(this).addClass('current').siblings().removeClass('current').parents('div.section').find('div.box').hide().eq($(this).index()).fadeIn(200);
	});
}

function initFBlocks(){
	$('.curr').each(function(){
		var btn = $(this);
		var target = $(btn.attr('href'));
		var offset = 250;			
		btn.click(function(){
			$('html, body').animate({
				'scrollTop': target.offset().top
			}, 1000)
			return false;
		})
	})
	
}

function initLightbox(){
	$('.lightbox-opener').fancybox();
}

function initOpenClose(){
	var activeClass = 'c_faqActiv';
	var defaultClass = 'c_faq';
	var blocks = $('.c_faq, .c_faqActiv')
	blocks.each(function(){
		var block = $(this);
		block.removeClass(activeClass).addClass(defaultClass);
		
		block.openClose({
			linkSlide: '.c_f1', //if parent - slide on click or hover on parent block
			slideBlock: '.c_f2',
			openClass : 'c_faqActiv',
			openLinkClass: false,
			textOpen : false,
			textClose : false,
			duration: 300,
			event: 'click', //click or hover
			beforeOpen: function(){
				blocks.filter('.' + activeClass).each(function(){
					$(this).find('.c_f1').trigger('click');
				})
				block.removeClass(defaultClass)
			},
			beforeClose: false,
			afterOpen: false,
			afterClose: function(){
				block.addClass(defaultClass)
			}
		})
	})
}

jQuery.fn.openClose = function(_opt){
	var _options = jQuery.extend({
		linkSlide: 'a.open-close', //if parent - slide on click or hover on parent block
		slideBlock: '.slide',
		openClass : 'active',
		openLinkClass: false,
		textOpen : false,
		textClose : false,
		duration: 300,
		event: 'click', //click or hover
		beforeOpen: false,
		beforeClose: false,
		afterOpen: false,
		afterClose: false
	}, _opt);
	var _enabledClass = 'slide-enabled';

	return this.each(function(){
		if (jQuery(this).hasClass(_enabledClass)) return;
		var _parentSlide = jQuery(this),
			_slideBlock = jQuery(_options.slideBlock, _parentSlide),
			_openClassS = _options.openClass,
			_textOpenS = _options.textOpen,
			_textCloseS = _options.textClose,
			_durationSlide = _options.duration,
			_openLinkClass = _options.openLinkClass,
			beforeOpen = _options.beforeOpen,
			beforeClose = _options.beforeClose,
			afterOpen = _options.afterOpen,
			afterClose = _options.afterClose,
			_t, _linkSlide;
			if (_options.linkSlide == 'parent') _linkSlide = _parentSlide
				else _linkSlide = jQuery(_options.linkSlide, _parentSlide);
		
		_parentSlide.addClass(_enabledClass);
		var _slideH = _slideBlock.height();
		if (!_parentSlide.is('.'+_openClassS)) {
			if (_options.event != 'click') _slideBlock.css({
				'display':'none',
				'height':0
			});
			else _slideBlock.hide();
		}

		//slide on click
		if (_options.event == 'click'){
			_linkSlide.click(function(){
				if (_parentSlide.is('.'+_openClassS)) {
					_parentSlide.trigger('closeStart');
					if (typeof(beforeClose) == 'function') beforeClose(_parentSlide, _linkSlide, _slideBlock);
					if (_openLinkClass) _linkSlide.removeClass(_openLinkClass);
					_slideBlock.slideUp(_durationSlide, function(){
						_parentSlide.removeClass(_openClassS);
						_parentSlide.trigger('closeEnd');
						if (typeof(afterClose) == 'function') afterClose(_parentSlide, _linkSlide, _slideBlock);
					});
					if (_textOpenS) jQuery(this).text(_textOpenS);
				} else {
					_parentSlide.trigger('openStart');
					if (typeof(beforeOpen) == 'function') beforeOpen(_parentSlide, _linkSlide, _slideBlock);
					if (_openLinkClass) _linkSlide.addClass(_openLinkClass);
					_parentSlide.addClass(_openClassS);
					_slideBlock.slideDown(_durationSlide, function(){
						_parentSlide.trigger('openEnd');
						if (typeof(afterOpen) == 'function') afterOpen(_parentSlide, _linkSlide, _slideBlock);
					});
					if (_textCloseS) jQuery(this).text(_textCloseS);
				}
				return false;
			});
		}

		//slide on hover
		else if (_options.event == 'hover'){
			_parentSlide.removeClass(_openClassS);
			var _t;
			_parentSlide.mouseleave(function(){
				if (_t) clearTimeout(_t);
				_t = setTimeout(function(){
					_parentSlide.trigger('closeStart');
					if (_openLinkClass) _linkSlide.removeClass(_openLinkClass);
					_slideBlock.stop().animate({
						'height':0
					}, _durationSlide, function(){
						_parentSlide.removeClass(_openClassS);
						_parentSlide.trigger('closeEnd')
					});
					if (_textOpenS) jQuery(this).text(_textOpenS);
				}, 100)
			}).mouseenter(function(){
				if (_t) clearTimeout(_t);
				_t = setTimeout(function(){
					_parentSlide.trigger('openStart');
					if (_openLinkClass) _linkSlide.addClass(_openLinkClass);
					_slideBlock.show().stop().animate({
						'height': _slideH
					}, _durationSlide, function(){
						_parentSlide.addClass(_openClassS);
						_parentSlide.trigger('openEnd')
					});
					if (_textCloseS) jQuery(this).text(_textCloseS);
				}, 100)
			});
		}
	});
}



eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(6($){$.1g.1w=6(o){o=$.1f({r:n,x:n,N:n,17:q,J:n,L:1a,16:n,y:q,u:12,H:3,B:0,k:1,K:n,I:n},o||{});8 G.R(6(){p b=q,A=o.y?"15":"w",P=o.y?"t":"s";p c=$(G),9=$("9",c),E=$("10",9),W=E.Y(),v=o.H;7(o.u){9.1h(E.D(W-v-1+1).V()).1d(E.D(0,v).V());o.B+=v}p f=$("10",9),l=f.Y(),4=o.B;c.5("1c","H");f.5({U:"T",1b:o.y?"S":"w"});9.5({19:"0",18:"0",Q:"13","1v-1s-1r":"S","z-14":"1"});c.5({U:"T",Q:"13","z-14":"2",w:"1q"});p g=o.y?t(f):s(f);p h=g*l;p j=g*v;f.5({s:f.s(),t:f.t()});9.5(P,h+"C").5(A,-(4*g));c.5(P,j+"C");7(o.r)$(o.r).O(6(){8 m(4-o.k)});7(o.x)$(o.x).O(6(){8 m(4+o.k)});7(o.N)$.R(o.N,6(i,a){$(a).O(6(){8 m(o.u?o.H+i:i)})});7(o.17&&c.11)c.11(6(e,d){8 d>0?m(4-o.k):m(4+o.k)});7(o.J)1p(6(){m(4+o.k)},o.J+o.L);6 M(){8 f.D(4).D(0,v)};6 m(a){7(!b){7(o.K)o.K.Z(G,M());7(o.u){7(a<=o.B-v-1){9.5(A,-((l-(v*2))*g)+"C");4=a==o.B-v-1?l-(v*2)-1:l-(v*2)-o.k}F 7(a>=l-v+1){9.5(A,-((v)*g)+"C");4=a==l-v+1?v+1:v+o.k}F 4=a}F{7(a<0||a>l-v)8;F 4=a}b=12;9.1o(A=="w"?{w:-(4*g)}:{15:-(4*g)},o.L,o.16,6(){7(o.I)o.I.Z(G,M());b=q});7(!o.u){$(o.r+","+o.x).1n("X");$((4-o.k<0&&o.r)||(4+o.k>l-v&&o.x)||[]).1m("X")}}8 q}})};6 5(a,b){8 1l($.5(a[0],b))||0};6 s(a){8 a[0].1k+5(a,\'1j\')+5(a,\'1i\')};6 t(a){8 a[0].1t+5(a,\'1u\')+5(a,\'1e\')}})(1x);',62,96,'||||curr|css|function|if|return|ul|||||||||||scroll|itemLength|go|null||var|false|btnPrev|width|height|circular||left|btnNext|vertical||animCss|start|px|slice|tLi|else|this|visible|afterEnd|auto|beforeStart|speed|vis|btnGo|click|sizeCss|position|each|none|hidden|overflow|clone|tl|disabled|size|call|li|mousewheel|true|relative|index|top|easing|mouseWheel|padding|margin|200|float|visibility|append|marginBottom|extend|fn|prepend|marginRight|marginLeft|offsetWidth|parseInt|addClass|removeClass|animate|setInterval|0px|type|style|offsetHeight|marginTop|list|jCarouselLite|jQuery'.split('|'),0,{}))

$(".nextCarousel, .prevCarousel").show();

$("div.carousel, div.sale_slider").jCarouselLite({
	btnNext: "div.nextCarousel",
	btnPrev: "div.prevCarousel",
	mouseWheel: false,
	visible: 1,
	auto: 9000,
	speed: 1000
});