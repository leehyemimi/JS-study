(function($){
	$.fn.folderAccordionMenu=function(){
		this.each(function(index){
			var $this = $(this);
			var menu =  new FolerAccodionMenu($this);
			$this.data("folderAccordionMenu",menu);
		});
		return false;
	}

	$.fn.selectFolerAccordionMenu=function(mainIndex,subIndex,animation){
		this.each(function(index){
			var accordionMenu = $(this).data("accordionMenu");
			accordionMenu.selectMenu(mainIndex,subIndex,animation);
		});
		return false;
	}
})(jQuery);


function FolerAccodionMenu(selector){
	//내부에서 사용하는 변수는 반드시 생성자에 선언한 후 사용해주세요.
	this.$accodionMenu = null;
	this._$mainMenuItems = null;

	//선택 서브 메뉴아이템
	this._$selectMenuItem = null;

	this._init(selector);
	this._initSubMenuPanel();
	this._initEvent();
}

/* 이벤트초기화 */
FolerAccodionMenu.prototype._initEvent = function(){
	var objThis = this;
	this._$mainMenuItems.children(".main-title").click(function(e){
		var $item = $(this).parent();
		objThis.toggleSubMenuPanel($item);
	})

	this._$mainMenuItems.find(".sub li").click(function(e){
		objThis.selectSubMenuItem($(this));
	})
}
/* 서브메뉴 아이템 선택 */
FolerAccodionMenu.prototype.selectSubMenuItem = function($item){
	var $oldItem = this.$selectSubItem;
	if(this.$selectSubItem != null){
		this.$selectSubItem.removeClass("select");
	}

	this.$selectSubItem = $item;
	this.$selectSubItem.addClass("select");

	//선택 이벤트 발생
	this.dispatchOpenCloseEvent($oldItem,this.$selectSubItem);
}
/* 서브메뉴패널 열고 닫기 */
FolerAccodionMenu.prototype.toggleSubMenuPanel = function($item){
	var extension = $item.attr("data-extension");

	//서브가 없는 경우 취소
	if(extension == "empty"){
		return;
	}

	console.log("서브가 있는 경우에만 실행");
	if(extension == "open"){
		this.closeSubMenu($item);
	}else{
		this.openSubMenu($item);
	}
}

/* 요소초기화 */
FolerAccodionMenu.prototype._init = function(selector){
	this.$accodionMenu = $(selector);
	this._$mainMenuItems = this.$accodionMenu.children("li");
}

/* 폴더상태설정 */
FolerAccodionMenu.prototype.setFolderState=function($item,state){
	var $folder = $item.find(".main-title .folder");
	//기존 클래스를 모두제거
	$folder.removeClass();
	$folder.addClass("folder "+state);
}

/* 서브 패널 초기화 - 초기 시작 시 닫힌 상태로 만들기 */
FolerAccodionMenu.prototype._initSubMenuPanel = function(){
	var objThis = this;
	this._$mainMenuItems.each(function(index){
		var $item = $(this);
		var $subMenu = $item.find(".sub");

		//서브가 없는 경우
		if($subMenu.length === 0){
			$item.attr("data-extension","empty");
			objThis.setFolderState($item,"empty");
		}else{
			if($item.attr("data-extension") === "open"){
				//objThis.setFolderState($item,"open");
				objThis.openSubMenu($item,false);
			}else{
				//$item.attr("data-extension", "close");
				//objThis.setFolderState($item,"close");
				objThis.closeSubMenu($item,false);
			}
		}
	})
}

FolerAccodionMenu.prototype.openSubMenu = function($item,animation){
	if($item != null){
		$item.attr("data-extension", "open");
		var $subMenu = $item.find(".sub");

		if(animation === false){
			$subMenu.css({
				marginTop:0
			});
		}else{
			$subMenu.stop().animate({
				marginTop: 0
			},300);
		}

		//폴더 상태를 open상태로 만들기
		this.setFolderState($item,"open");
		
		//open 이벤트 발생
		this.dispatchOpenCloseEvent($item,"open");
	}
}

FolerAccodionMenu.prototype.closeSubMenu = function($item,animation){
	if($item != null){
		$item.attr("data-extension", "close");
		var $subMenu = $item.find(".sub");

		var $subMenuPanelHeight = -$subMenu.outerHeight(true);
		if(animation === false){
			$subMenu.css({
				marginTop:$subMenuPanelHeight
			});
		}else{
			$subMenu.stop().animate({
				marginTop:$subMenuPanelHeight
			},300);
		}

		//폴더 상태를 open상태로 만들기
		this.setFolderState($item,"close");

		//close 이벤트 발생
		this.dispatchOpenCloseEvent($item,"close");
	}
}

FolerAccodionMenu.prototype.dispatchOpenCloseEvent=function($oldItem,$newItem){
	var event = jQuery.Event("select");
	event.$oldItem = $oldItem;
	event.$newItem = $newItem;

	this.$accodionMenu.trigger(event);
}

FolerAccodionMenu.prototype.openSubMenuAt = function(index,animation){
	var $item = this._$mainMenuItems.eq(index);
	this.openSubMenu($item,animation);
}

FolerAccodionMenu.prototype.closeSubMenuAt = function(index,animation){
	var $item = this._$mainMenuItems.eq(index);
	this.closeSubMenuAt($item,animation);
}

/*
	메뉴선택 기능
	@mainIndex : 메인 메뉴아이템 index
	@subIndex : 서브 메뉴아이템 index
	@animation : 애니메이션 실행유무
*/

FolerAccodionMenu.prototype.selectMenu = function(mainIndex,subIndex,animation){
	//메인 메뉴아이템
	var $item = this._$mainMenuItems.eq(mainIndex);
	//서브 메뉴아이템
	var $subMenuItem =  $item.find(".sub li").eq(subIndex);
	//서브 메뉴아이템이 존재하는 경우에만 처리
	if($subMenuItem){
		//서브 메뉴 패널 열기
		this.openSubMenu($item,animation);

		//서브 메뉴아이템 선택
		this.selectSubMenuItem($subMenuItem);
	}
}