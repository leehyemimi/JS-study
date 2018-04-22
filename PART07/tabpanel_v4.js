function TabPanel(selector,effect){
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null;
    this.$selectTabContent = null;
    this.effect = "";
    this.$tabContentWidth = -1; //1.���г��� ũ�⸦ ���� ������Ƽ

	this.init(selector);
	this.initEvent();
	this.initEffect(effect);
	this.setSelectTabMenuItemAt(0,false); //4.setSelectTabMenuItemAt() animation�ż��� �߰�
}
//��� �ʱ�ȭ
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");
	this.$tabMenuItems = this.$tabMenu.children("li");
	this.$tabContents = this.$tabPanel.find(".tab-contents .content");
	this.$tabContentWidth = this.$tabPanel.find(".tab-contents").width(); //2. ���г��� �ʺ�  $tabContentWidth������Ƽ�� �����Ѵ�.
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
		//���� �ǳ��� ��Ȱ��ȭ
		if($hideContent){
			$hideContent.css({opacity:0})
		}
		//�ű� �ǳ��� Ȱ��ȭ
		$showContent.css({opacity:1});
		//����  �� ���� ������Ʈ
		this.$selectTabContent = $showContent;
	}else if(this.effect == "slide"){ //3. �����̵� ȿ���ֱ� (??????????)
		var currentIndex = -1; // �űԷ� ������ �Ǹ޴��� ���� �Ǹ޴����� �������� �������� ����ϱ� ���� ������ �Ǹ޴��� �ε������� ����
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

		//����  �� ���� ������Ʈ
		this.$selectTabContent = $showContent;

	}
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel","slide");
});

