(function($){
	$.fn.$tabPanel = function(options){
		this.each(function(index){
			var tabPanel = new TabPanel(this,options);
		})

		return false;
	}

	$.fn.selectTabPanel = function(tabIndex,animation){
		this.each(function(index){
			var tabPanel = $(this).data("tabPanel");
			if(tabPanel){
				tabPanel.setSelectTabMenuItemAt(tabIndex,animation);
			}
		})
	}
})(jQuery);

$(document).ready(function(){
	$(".tab-panel").$tabPanel({
		effect:TabPanel.slideEffect,
		startIndex:2
	})

	$(".tab-panel").selectTabPanel(4);
});

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
	this.initOptions(options); // 3. ����
	this.setSelectTabMenuItemAt(this.options.startIndex,false);//4. �ɼǰ����� N��° Ȱ��ȭ

}
//��� �ʱ�ȭ
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");
	this.$tabMenuItems = this.$tabMenu.children("li");
	this.$tabContents = this.$tabPanel.find(".tab-contents .content");
	this.$tabContentWidth = this.$tabPanel.find(".tab-contents").width();
}

//�ɼ��߰� 3.
TabPanel.prototype.initOptions = function(options){
	this.options = jQuery.extend({},TabPanel.defaultOptions,options);
	this.effect = this.options.effect;
}

// �⺻ �ɼǰ� 4.
TabPanel.defaultOptions ={
	startIndex :0,
	easing:"easeOutQuint",
	duration:500,
	effect:TabPanel.slideEffect
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
		this.effect = TabPanel.normalEffect;
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
			},params.duration,params.easing);
		}

		//�ű� �ǳ��� Ȱ��ȭ
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

//���̵� ȿ��
TabPanel.fadeEffect = {
	effect : function(params){
		//���� �ǳ��� ��Ȱ��ȭ
		if(params.$hideContent){
			params.$hideContent.stop().animate({
				opacity:0
			},params.duration,params.easing);
		}
		//�ű� �ǳ��� Ȱ��ȭ
		params.$showContent.stop().animate({
			opacity:1
		},params.duration,params.easing);
	}
}


