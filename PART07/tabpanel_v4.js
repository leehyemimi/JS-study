function TabPanel(selector,effect){
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null;
    this.$selectTabContent = null;
    this.effect = "";
    this.$tabContentWidth = -1; //1.탭패널의 크기를 담을 프로퍼티

	this.init(selector);
	this.initEvent();
	this.initEffect(effect);
	this.setSelectTabMenuItemAt(0,false); //4.setSelectTabMenuItemAt() animation매서드 추가
}
//요소 초기화
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");
	this.$tabMenuItems = this.$tabMenu.children("li");
	this.$tabContents = this.$tabPanel.find(".tab-contents .content");
	this.$tabContentWidth = this.$tabPanel.find(".tab-contents").width(); //2. 탭패널의 너비를  $tabContentWidth프로퍼티에 저장한다.
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
		this.effect = "none";
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

	if(this.effect == "none" || animation==false){
		//현재 탭내용 비활성화
		if($hideContent){
			$hideContent.css({opacity:0})
		}
		//신규 탭내용 활성화
		$showContent.css({opacity:1});
		//선택  탭 내용 업데이트
		this.$selectTabContent = $showContent;
	}else if(this.effect == "slide"){ //3. 슬라이드 효과주기 (??????????)
		var currentIndex = -1; // 신규로 선택한 탭메뉴가 현재 탭메뉴보다 이전인지 다음인지 계산하기 위해 각각의 탭메뉴의 인덱스값을 구함
		if($hideContent){
			currentIndex = $hideContent.index();
		}
		// 이동방향 구하기
		var direction ="";
		if(currentIndex<index){
			direction = "next";
		}else{
			direction = "prev";
		}

		//이동위치 구하기
		//prev가 기본
		var hideEndLeft = 0;
		var showStartLeft = 0;

		if(direction=="next"){
			hideEndLeft = - this.$tabContentWidth;
			showStartLeft = this.$tabContentWidth;
		}else{
			hideEndLeft = this.$tabContentWidth;
			showStartLeft = -this.$tabContentWidth;
		}

		//현재 탭내용 비활성화
		if($hideContent){
			$hideContent.stop().animate({
				left:hideEndLeft,
				opacity:0
			},500,"easeOutQuint");
		}

		//신규 탭내용 활성화
		$showContent.css({
			left:showStartLeft,
			opacity:0
		});
		$showContent.stop().animate({
			left:0,
			opacity:1
		},500,"easeOutQuint");

		//선택  탭 내용 업데이트
		this.$selectTabContent = $showContent;

	}
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel","slide");
});

