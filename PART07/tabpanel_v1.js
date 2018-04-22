//step #02
function TabPanel(selector){ //1. ������� ���г� ����� ���� Ŭ������ ����
    this.$tabPanel = null; //1-1. ���гΰ� ����� DOM�� ���� ������Ƽ
    this.$tabMenu = null; //������Ƽ�� �Ǹ޴� ������ ���� ������Ƽ
    this.$tabMenuItems = null; //�Ǹ޴� �������� ���� ������Ƽ
    this.$selectTabMenuItem = null; // ������ �Ǹ޴� �������� ���� ������Ƽ

	this.init(selector); // 6.init/initEvent ȣ��
	this.initEvent();
	this.setSelectTabMenuItemAt(0); //7.setSelectTabMenuItemAt 0��°�� ����
}
//2. ��� �ʱ�ȭ / ���г� �������� ����� ���гΰ� �Ǹ޴�, �Ǹ޴� ��������  jQuery�� �̿��� ã�� ������Ƽ�� �����
TabPanel.prototype.init = function(selector){
	this.$tabPanel = $(selector);
	this.$tabMenu = this.$tabPanel.children(".tab-menu");

	this.$tabMenuItems = this.$tabMenu.children("li");
}

//5. �̺�Ʈ �ʱ�ȭ
TabPanel.prototype.initEvent = function(){
	var objThis = this;
	this.$tabMenuItems.on("click",function(e){
		//a�±� Ŭ���� �⺻ �ൿ ���
		e.preventDefault();
		//Ŭ���� �Ǹ޴� ������ Ȱ��ȭ
		objThis.setSelectTabMenuItem($(this));
	});
}

//3.�Ǹ޴� ������ ���� // �Ű����� $item���� ���� �Ǹ޴� �������� ���� �޴� ���������� ����
TabPanel.prototype.setSelectTabMenuItem = function($item){
	if(this.$selectTabMenuItem){
		this.$selectTabMenuItem.removeClass("select");
	}
	this.$selectTabMenuItem = $item;
	this.$selectTabMenuItem.addClass("select");
}

//4. index ��° �� �޴� ������ ����
TabPanel.prototype.setSelectTabMenuItemAt = function(index){
	this.setSelectTabMenuItem(this.$tabMenuItems.eq(index));
}

$(document).ready(function(){
	var tabPanel = new TabPanel(".tab-panel"); 
	tabPanel.setSelectTabMenuItemAt(1);
});

