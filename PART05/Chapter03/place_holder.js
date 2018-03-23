(function($) {
	var _style = {
		"position":"absolute",
		"top":"0px",
		"left":"0px",
		"padding":"0px 10px",
		"cursor":"text"
	}

	$.fn.placeHolder = function(){

		if(typeof String.prototype.trim !== 'function') {
			 String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, '');
			}
		}

		this.each(function(){
			var _el = $(this);
			//_for = _el.attr("id") ? _el.attr("id") : "";
			if(_el.val() == false){
				_el.wrapAll("<span style='position:relative; display:block;' class='placeholder'></span>");

				_el.parent("span").append("<em>"+_el.attr("placeholder")+"</em>");

				_style.width =  90+"%"//_el.outerWidth()-20+"px";
				_style.height = _el.outerHeight()+"px";
				_style.lineHeight = _el.outerHeight()+"px";

				var _str = _el.attr("holderStyle");
				var _sp1 = null;
				var _sp2 = null;
				var _extStyle = {};

				if(_str != undefined && _str.trim() != ""){
					_sp1 = _str.split(";");

					for(var i = 0; i < _sp1.length; i++){
						_sp2 = _sp1[i].split(":");

						if(_sp2[1] != undefined){
							_extStyle[_sp2[0].trim()] = _sp2[1].trim();
						}
					}
				}

				$.extend(_extStyle, _style)

				_el.next("em").css(_extStyle);

				// input에 커서 이동
				_el.next("em").on("click",function(){
					$(this).hide();
					$(this).prev("input").focus();
					$(this).prev("textarea").focus();
				});

				_el.on("focus",function(){
					$(this).next("em").hide();
				});

				// input에서 커서 벗어남
				_el.on("blur", function(){
					var _txt = $(this).val().trim();
					if(_txt == ""){
						_el.next("em").show();
					}
				})
			}
		});
	}
})(jQuery);

$(function(){
	$("input[placeholder]").placeHolder();
	$("textarea[placeholder]").placeHolder();
});