function TabPanel(selector,effect){
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null;
    this.$selectTabContent = null;
    this.effect = null; // 2. 문자열이 아닌 효과 객체가 담길것이므로 초깃값을 문자열 대신 null
    this.$tabContentWidth = -1;

	this.init(selector);
	this.initEvent();
	this.initEffect(effect);
	this.setSelectTabMenuItemAt(0,false);
}
//요소 초기화
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");
	this.$tabMenuItems = this.$tabMenu.children("li");
	this.$tabContents = this.$tabPanel.find(".tab-contents .content");
	this.$tabContentWidth = this.$tabPanel.find(".tab-contents").width();
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
		this.effect = TabPanel.normalEffect; //3. 문자열대신 TabPanel.normalEffect
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

	/*if(this.effect == "none" || animation==false){
		//this.normalEffect($hideContent,$showContent);
		TabPanel.normalEffect.effect({
			$hideContent:$hideContent,
			$showContent:$showContent
		});
	}else if(this.effect == "slide"){
		//this.slideEffect($hideContent,$showContent,showIndex);
		TabPanel.slideEffect.effect({
			$hideContent:$hideContent,
			$showContent:$showContent,
			showIndex:index,
			tabContentWidth:this.$tabContentWidth
		})

	}else if(this.effect == "fade"){ //페이드 효과 넣기
		//this.fadeEffect($hideContent,$showContent);
		TabPanel.fadeEffect.effect({
			$hideContent:$hideContent,
			$showContent:$showContent
		})
	}*/

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
			tabContentWidth:this.$tabContentWidth
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
			},500,"easeOutQuint");
		}

		//신규 탭내용 활성화
		params.$showContent.css({
			left:showStartLeft,
			opacity:0
		});
		params.$showContent.stop().animate({
			left:0,
			opacity:1
		},500,"easeOutQuint");
	}
}

//페이드 효과
TabPanel.fadeEffect = {
	effect : function(params){
		//현재 탭내용 비활성화
		if(params.$hideContent){
			params.$hideContent.stop().animate({
				opacity:0
			},500,"easeOutQuint");
		}
		//신규 탭내용 활성화
		params.$showContent.stop().animate({
			opacity:1
		},500,"easeOutQuint");
	}
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel",TabPanel.slideEffect);
});

