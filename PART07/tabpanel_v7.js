function TabPanel(selector,effect){
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null;
    this.$selectTabContent = null;
    this.effect = null; // 2. ���ڿ��� �ƴ� ȿ�� ��ü�� �����̹Ƿ� �ʱ갪�� ���ڿ� ��� null
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
		this.effect = TabPanel.normalEffect; //3. ���ڿ���� TabPanel.normalEffect
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

	}else if(this.effect == "fade"){ //���̵� ȿ�� �ֱ�
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
	//����  �� ���� ������Ʈ
	this.$selectTabContent = $showContent;
}

//�ִϸ��̼� ���� �Ϲ� ȿ��
TabPanel.normalEffect = {
	effect : function(params){
		//���� �ǳ��� ��Ȱ��ȭ
		if(params.$hideContent){
			params.$hideContent.css({opacity:0})
		}
		//�ű� �ǳ��� Ȱ��ȭ
		params.$showContent.css({opacity:1}); //1. �ߺ��ڵ� ����
	}
}

//�����̵� ȿ��
TabPanel.slideEffect = {
	effect : function(params){
		var currentIndex = -1;
		if(params.$hideContent){
			currentIndex = params.$hideContent.index();
		}
		// �̵����� ���ϱ�
		var direction ="";
		if(currentIndex<params.showIndex){
			direction = "next";
		}else{
			direction = "prev";
		}

		//�̵���ġ ���ϱ�
		//prev�� �⺻
		var hideEndLeft = 0;
		var showStartLeft = 0;

		if(direction=="next"){
			hideEndLeft = - params.tabContentWidth;
			showStartLeft = params.tabContentWidth;
		}else{
			hideEndLeft = params.tabContentWidth;
			showStartLeft = - params.tabContentWidth;
		}

		//���� �ǳ��� ��Ȱ��ȭ
		if(params.$hideContent){
			params.$hideContent.stop().animate({
				left:hideEndLeft,
				opacity:0
			},500,"easeOutQuint");
		}

		//�ű� �ǳ��� Ȱ��ȭ
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

//���̵� ȿ��
TabPanel.fadeEffect = {
	effect : function(params){
		//���� �ǳ��� ��Ȱ��ȭ
		if(params.$hideContent){
			params.$hideContent.stop().animate({
				opacity:0
			},500,"easeOutQuint");
		}
		//�ű� �ǳ��� Ȱ��ȭ
		params.$showContent.stop().animate({
			opacity:1
		},500,"easeOutQuint");
	}
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel",TabPanel.slideEffect);
});

