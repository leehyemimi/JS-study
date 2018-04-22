function TabPanel(selector,options){ //1.
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null;
    this.$selectTabContent = null;

    this.effect = null;
    this.$tabContentWidth = -1;

	this.options = null; //2.

	this.init(selector);
	this.initEvent();

	//this.initEffect(effect);
	this.initOptions(options); // 3. 변경
	this.setSelectTabMenuItemAt(this.options.startIndex,false);//4. 옵션값으로 N번째 활성화

}
//요소 초기화
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");
	this.$tabMenuItems = this.$tabMenu.children("li");
	this.$tabContents = this.$tabPanel.find(".tab-contents .content");
	this.$tabContentWidth = this.$tabPanel.find(".tab-contents").width();
}

//옵션추가 3.
TabPanel.prototype.initOptions = function(options){
	this.options = jQuery.extend({},TabPanel.defaultOptions,options);
	this.effect = this.options.effect;
}

// 기본 옵션값 4.
TabPanel.defaultOptions ={
	startIndex :0,
	easing:"easeOutQuint",
	duration:500,
	effect:TabPanel.slideEffect
}

//이벤트 초기화
TabPanel.prototype.initEvent = function(){
	var objThis = this;
	this.$tabMenuItems.on("click",function(e){
		//a태그 클릭시 기본 행동 취소
		e.preventDefault();
		//클릭한 탭메뉴 아이템 활성화
		objThis.setSelectTabMenuItem($(this));
	});
}
	
//효과초기화
TabPanel.prototype.initEffect= function(effect){
	this.effect = effect;
	//기본값 설정
	if(this.effect==null){
		this.effect = TabPanel.normalEffect;
	}
}

//3.탭 콘텐츠 초기화
TabPanel.prototype.initTabContents = function(){
	this.$tabContents.css({
		opacity:0}
	);
}

//탭메뉴 아이템 선택
TabPanel.prototype.setSelectTabMenuItem = function($item,animation){
	if(this.$selectTabMenuItem){
		this.$selectTabMenuItem.removeClass("select");
	}
	this.$selectTabMenuItem = $item;
	this.$selectTabMenuItem.addClass("select");
	var newIndex = this.$tabMenuItems.index(this.$selectTabMenuItem);
	this.showContentAt(newIndex,animation);
}

// index 번째 탭 메뉴 아이템 선택
TabPanel.prototype.setSelectTabMenuItemAt = function(index,animation){
	this.setSelectTabMenuItem(this.$tabMenuItems.eq(index),animation);
}

//index에 맞는 탭내용 활성화
TabPanel.prototype.showContentAt = function(index,animation){
	//활성화/비활성화 탭내용 찾기
	var $hideContent = this.$selectTabContent;
	var $showContent = this.$tabContents.eq(index);

	if(animation == false){
		TabPanel.normalEffect.effect({
			$hideContent:$hideContent,
			$showContent:$showContent
		});
	}else{
		this.effect.effect({
			$hideContent:$hideContent,
			$showContent:$showContent,
			showIndex:index,
			tabContentWidth:this.$tabContentWidth,
			duration:this.options.duration,
			easing:this.options.easing
		})
	}
	//선택  탭 내용 업데이트
	this.$selectTabContent = $showContent;
}

//애니메이션 없는 일반 효과
TabPanel.normalEffect = {
	effect : function(params){
		//현재 탭내용 비활성화
		if(params.$hideContent){
			params.$hideContent.css({opacity:0})
		}
		//신규 탭내용 활성화
		params.$showContent.css({opacity:1}); //1. 중복코드 없앰
	}
}

//슬라이드 효과
TabPanel.slideEffect = {
	effect : function(params){
		var currentIndex = -1;
		if(params.$hideContent){
			currentIndex = params.$hideContent.index();
		}
		// 이동방향 구하기
		var direction ="";
		if(currentIndex<params.showIndex){
			direction = "next";
		}else{
			direction = "prev";
		}

		//이동위치 구하기
		//prev가 기본
		var hideEndLeft = 0;
		var showStartLeft = 0;

		if(direction=="next"){
			hideEndLeft = - params.tabContentWidth;
			showStartLeft = params.tabContentWidth;
		}else{
			hideEndLeft = params.tabContentWidth;
			showStartLeft = - params.tabContentWidth;
		}

		//현재 탭내용 비활성화
		if(params.$hideContent){
			params.$hideContent.stop().animate({
				left:hideEndLeft,
				opacity:0
			},params.duration,params.easing);
		}

		//신규 탭내용 활성화
		params.$showContent.css({
			left:showStartLeft,
			opacity:0
		});
		params.$showContent.stop().animate({
			left:0,
			opacity:1
		},params.duration,params.easing);
	}
}

//페이드 효과
TabPanel.fadeEffect = {
	effect : function(params){
		//현재 탭내용 비활성화
		if(params.$hideContent){
			params.$hideContent.stop().animate({
				opacity:0
			},params.duration,params.easing);
		}
		//신규 탭내용 활성화
		params.$showContent.stop().animate({
			opacity:1
		},params.duration,params.easing);
	}
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel",{
		startIndex:2,
		effect:TabPanel.fadeEffect,
		duration:500
	});
});

