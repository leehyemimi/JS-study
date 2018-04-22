//step #02
function TabPanel(selector,effect){//1.effect 매개변수 추가
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null;
    this.$selectTabContent = null;
    this.effect = ""; //2. 외부에서 넘어온 효과이름을 저장하기 위해서 프로퍼티를 만듬

	this.init(selector);
	this.initEvent();
	this.initEffect(effect);//4.외부에서 넘어온 값으로 initEffect()호출
	this.setSelectTabMenuItemAt(0);
}
// 요소 초기화
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");
	this.$tabMenuItems = this.$tabMenu.children("li");
	this.$tabContents = this.$tabPanel.find(".tab-contents .content");
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
	
//3. 효과초기화
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

//index에 맞는 탭내용 활성화
TabPanel.prototype.showContentAt = function(index){
	//활성화/비활성화 탭내용 찾기
	var $hideContent = this.$selectTabContent;
	var $showContent = this.$tabContents.eq(index);

	if(this.effect == "none"){ // 5. 탭메뉴를 생성할 때 탭내용 활성화 효과를 "none"으로 선택
		//현재 탭내용 비활성화
		if($hideContent){
			$hideContent.css({opacity:0})
		}

		//신규 탭내용 활성화
		$showContent.css({opacity:1});

		//선택  탭 내용 업데이트
		this.$selectTabContent = $showContent;
	}
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel","none");
});

