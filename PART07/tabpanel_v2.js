//step #02
function TabPanel(selector){
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null; //1.탭내용 목록 프로퍼티
    this.$selectTabContent = null;//선택한 탭내용 넣을 프로퍼티

	this.init(selector);
	this.initEvent();
	this.setSelectTabMenuItemAt(0);
}
// 요소 초기화
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");

	this.$tabMenuItems = this.$tabMenu.children("li");

	this.$tabContents = this.$tabPanel.find(".tab-contents .content");//2.탭내용 목록을 찾아 $tabContents에 담아줌
}

// 이벤트 초기화
TabPanel.prototype.initEvent = function(){
	var objThis = this;
	this.$tabMenuItems.on("click",function(e){
		//a태그 클릭시 기본 행동 취소
		e.preventDefault();
		//클릭한 탭메뉴 아이템 활성화
		objThis.setSelectTabMenuItem($(this));
	});
}

//3.탭 콘텐츠 초기화
TabPanel.prototype.initTabContents = function(){
	this.$tabContents.css({
		opacity:0}
	);
}

//탭메뉴 아이템 선택
TabPanel.prototype.setSelectTabMenuItem = function($item){
	if(this.$selectTabMenuItem){
		this.$selectTabMenuItem.removeClass("select");
	}
	this.$selectTabMenuItem = $item;
	this.$selectTabMenuItem.addClass("select");
	var newIndex = this.$tabMenuItems.index(this.$selectTabMenuItem); //5. 선택된 탭메뉴 인덱스 값을 매개변수 값으로
	this.showContentAt(newIndex);
}

// index 번째 탭 메뉴 아이템 선택
TabPanel.prototype.setSelectTabMenuItemAt = function(index){
	this.setSelectTabMenuItem(this.$tabMenuItems.eq(index));
}

//4. index에 맞는 탭내용 활성화
TabPanel.prototype.showContentAt = function(index){
	//1. 활성화/비활성화 탭내용 찾기
	var $hideContent = this.$selectTabContent;
	var $showContent = this.$tabContents.eq(index);

	//2. 현재 탭내용 비활성화
	if($hideContent){
		$hideContent.css({opacity:0})
	}

	//3. 신규 탭내용 활성화
	$showContent.css({opacity:1});

	//4. 선택  탭 내용 업데이트
	this.$selectTabContent = $showContent;
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel"); 
	tabPanel.setSelectTabMenuItemAt(1);
});

