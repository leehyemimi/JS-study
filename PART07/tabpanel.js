//step #02
function TabPanel(selector){ //1. 가장먼저 탭패널 기능을 담을 클래스를 만듬
    this.$tabPanel = null; //1-1. 탭패널과 연결된 DOM을 담을 프로퍼티
    this.$tabMenu = null; //프로퍼티와 탭메뉴 영역을 담을 프로퍼티
    this.$tabMenuItems = null; //탭메뉴 아이템을 담을 프로퍼티
    this.$selectTabMenuItem = null; // 선택한 탭메뉴 아이템을 담을 프로퍼티

	this.init(selector); // 6.init/initEvent 호출
	this.initEvent();
	this.setSelectTabMenuItemAt(0); //7.setSelectTabMenuItemAt 0번째로 셋팅
}
//2. 요소 초기화 / 탭패널 전역에서 사용할 탭패널과 탭메뉴, 탭메뉴 아이템을  jQuery를 이용해 찾아 프로퍼티에 담아줌
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");

	this.$tabMenuItems = this.$tabMenu.children("li");
}

//5. 이벤트 초기화
TabPanel.prototype.initEvent = function(){
	var objThis = this;
	this.$tabMenuItems.on("click",function(e){
		//a태그 클릭시 기본 행동 취소
		e.preventDefault();
		//클릭한 탭메뉴 아이템 활성화
		objThis.setSelectTabMenuItem($(this));
	});
}

//3.탭메뉴 아이템 선택 // 매개변수 $item으로 오는 탭메뉴 아이템을 선택 메뉴 아이템으로 만듬
TabPanel.prototype.setSelectTabMenuItem = function($item){
	if(this.$selectTabMenuItem){
		this.$selectTabMenuItem.removeClass("select");
	}
	this.$selectTabMenuItem = $item;
	this.$selectTabMenuItem.addClass("select");
}

//4. index 번째 탭 메뉴 아이템 선택
TabPanel.prototype.setSelectTabMenuItemAt = function(index){
	this.setSelectTabMenuItem(this.$tabMenuItems.eq(index));
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel"); 
	tabPanel.setSelectTabMenuItemAt(1);
});

