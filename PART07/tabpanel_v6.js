function TabPanel(selector,effect){
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null;
    this.$selectTabContent = null;
    this.effect = "";
    this.$tabContentWidth = -1;

	this.init(selector);
	this.initEvent();
	this.initEffect(effect);
	this.setSelectTabMenuItemAt(0,false);
}
//��� �ʱ�ȭ
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");
	this.$tabMenuItems = this.$tabMenu.children("li");
	this.$tabContents = this.$tabPanel.find(".tab-contents .content");
	this.$tabContentWidth = this.$tabPanel.find(".tab-contents").width();
}

//�̺�Ʈ �ʱ�ȭ
TabPanel.prototype.initEvent = function(){
	var objThis = this;
	this.$tabMenuItems.on("click",function(e){
		//a�±� Ŭ���� �⺻ �ൿ ���
		e.preventDefault();
		//Ŭ���� �Ǹ޴� ������ Ȱ��ȭ
		objThis.setSelectTabMenuItem($(this));
	});
}
	
//ȿ���ʱ�ȭ
TabPanel.prototype.initEffect= function(effect){
	this.effect = effect;
	//�⺻�� ����
	if(this.effect==null){
		this.effect = "none";
	}
}

//3.�� ������ �ʱ�ȭ
TabPanel.prototype.initTabContents = function(){
	this.$tabContents.css({
		opacity:0}
	);
}

//�Ǹ޴� ������ ����
TabPanel.prototype.setSelectTabMenuItem = function($item,animation){
	if(this.$selectTabMenuItem){
		this.$selectTabMenuItem.removeClass("select");
	}
	this.$selectTabMenuItem = $item;
	this.$selectTabMenuItem.addClass("select");
	var newIndex = this.$tabMenuItems.index(this.$selectTabMenuItem);
	this.showContentAt(newIndex,animation);
}

// index ��° �� �޴� ������ ����
TabPanel.prototype.setSelectTabMenuItemAt = function(index,animation){
	this.setSelectTabMenuItem(this.$tabMenuItems.eq(index),animation);
}

//index�� �´� �ǳ��� Ȱ��ȭ
TabPanel.prototype.showContentAt = function(index,animation){
	//Ȱ��ȭ/��Ȱ��ȭ �ǳ��� ã��
	var $hideContent = this.$selectTabContent;
	var $showContent = this.$tabContents.eq(index);

	if(this.effect == "none" || animation==false){
		this.normalEffect($hideContent,$showContent);
	}else if(this.effect == "slide"){
		this.slideEffect($hideContent,$showContent,index);
	}else if(this.effect == "fade"){ //���̵� ȿ�� �ֱ�
		this.fadeEffect($hideContent,$showContent);
	}
	//����  �� ���� ������Ʈ
	this.$selectTabContent = $showContent;
}

//�ִϸ��̼� ���� �Ϲ� ȿ��
TabPanel.prototype.normalEffect = function($hideContent,$showContent){
	//���� �ǳ��� ��Ȱ��ȭ
	if($hideContent){
		$hideContent.css({opacity:0})
	}
	//�ű� �ǳ��� Ȱ��ȭ
	$showContent.css({opacity:1}); //1. �ߺ��ڵ� ����
}

//�����̵� ȿ��
TabPanel.prototype.slideEffect = function($hideContent,$showContent,index) {
	var currentIndex = -1;
	if($hideContent){
		currentIndex = $hideContent.index();
	}
	// �̵����� ���ϱ�
	var direction ="";
	if(currentIndex<index){
		direction = "next";
	}else{
		direction = "prev";
	}

	//�̵���ġ ���ϱ�
	//prev�� �⺻
	var hideEndLeft = 0;
	var showStartLeft = 0;

	if(direction=="next"){
		hideEndLeft = - this.$tabContentWidth;
		showStartLeft = this.$tabContentWidth;
	}else{
		hideEndLeft = this.$tabContentWidth;
		showStartLeft = -this.$tabContentWidth;
	}

	//���� �ǳ��� ��Ȱ��ȭ
	if($hideContent){
		$hideContent.stop().animate({
			left:hideEndLeft,
			opacity:0
		},500,"easeOutQuint");
	}

	//�ű� �ǳ��� Ȱ��ȭ
	$showContent.css({
		left:showStartLeft,
		opacity:0
	});
	$showContent.stop().animate({
		left:0,
		opacity:1
	},500,"easeOutQuint");
}

//���̵� ȿ��
TabPanel.prototype.fadeEffect = function($hideContent,$showContent) {
	//���� �ǳ��� ��Ȱ��ȭ
	if($hideContent){
		$hideContent.stop().animate({
			opacity:0
		},500,"easeOutQuint");
	}
	//�ű� �ǳ��� Ȱ��ȭ
	$showContent.stop().animate({
		opacity:1
	},500,"easeOutQuint");

}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel","fade");
});

