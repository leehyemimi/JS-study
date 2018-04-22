//step #02
function TabPanel(selector){
    this.$tabPanel = null;
    this.$tabMenu = null;
    this.$tabMenuItems = null;
    this.$selectTabMenuItem = null;

    this.$tabContents = null; //1.�ǳ��� ��� ������Ƽ
    this.$selectTabContent = null;//������ �ǳ��� ���� ������Ƽ

	this.init(selector);
	this.initEvent();
	this.setSelectTabMenuItemAt(0);
}
// ��� �ʱ�ȭ
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");

	this.$tabMenuItems = this.$tabMenu.children("li");

	this.$tabContents = this.$tabPanel.find(".tab-contents .content");//2.�ǳ��� ����� ã�� $tabContents�� �����
}

// �̺�Ʈ �ʱ�ȭ
TabPanel.prototype.initEvent = function(){
	var objThis = this;
	this.$tabMenuItems.on("click",function(e){
		//a�±� Ŭ���� �⺻ �ൿ ���
		e.preventDefault();
		//Ŭ���� �Ǹ޴� ������ Ȱ��ȭ
		objThis.setSelectTabMenuItem($(this));
	});
}

//3.�� ������ �ʱ�ȭ
TabPanel.prototype.initTabContents = function(){
	this.$tabContents.css({
		opacity:0}
	);
}

//�Ǹ޴� ������ ����
TabPanel.prototype.setSelectTabMenuItem = function($item){
	if(this.$selectTabMenuItem){
		this.$selectTabMenuItem.removeClass("select");
	}
	this.$selectTabMenuItem = $item;
	this.$selectTabMenuItem.addClass("select");
	var newIndex = this.$tabMenuItems.index(this.$selectTabMenuItem); //5. ���õ� �Ǹ޴� �ε��� ���� �Ű����� ������
	this.showContentAt(newIndex);
}

// index ��° �� �޴� ������ ����
TabPanel.prototype.setSelectTabMenuItemAt = function(index){
	this.setSelectTabMenuItem(this.$tabMenuItems.eq(index));
}

//4. index�� �´� �ǳ��� Ȱ��ȭ
TabPanel.prototype.showContentAt = function(index){
	//1. Ȱ��ȭ/��Ȱ��ȭ �ǳ��� ã��
	var $hideContent = this.$selectTabContent;
	var $showContent = this.$tabContents.eq(index);

	//2. ���� �ǳ��� ��Ȱ��ȭ
	if($hideContent){
		$hideContent.css({opacity:0})
	}

	//3. �ű� �ǳ��� Ȱ��ȭ
	$showContent.css({opacity:1});

	//4. ����  �� ���� ������Ʈ
	this.$selectTabContent = $showContent;
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel"); 
	tabPanel.setSelectTabMenuItemAt(1);
});

