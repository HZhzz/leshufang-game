const {ccclass} = cc._decorator;

@ccclass
export default class auto_setPassword extends cc.Component {
	setPassword: cc.Node;
	bg: cc.Node;
	btnBack: cc.Node;
	icon_nav_return: cc.Node;
	layout: cc.Node;
	title: cc.Node;
	phone_bg: cc.Node;
	text_phone: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	img_sx: cc.Node;
	label_phone: cc.Node;
	line: cc.Node;
	code_bg: cc.Node;
	text_code: cc.Node;
	TEXT_LABEL2: cc.Node;
	PLACEHOLDER_LABEL2: cc.Node;
	btn_getCode: cc.Node;
	labelGetCode: cc.Node;
	pass_bg: cc.Node;
	text_pass: cc.Node;
	TEXT_LABEL4: cc.Node;
	PLACEHOLDER_LABEL4: cc.Node;
	pass2_bg: cc.Node;
	text_pass2: cc.Node;
	TEXT_LABEL42: cc.Node;
	PLACEHOLDER_LABEL42: cc.Node;
	btn_register: cc.Node;

	public static URL:string = "db://assets/resources/prefab/login/setPassword.prefab"

    onLoad () {
		this.setPassword = this.node
		this.bg = this.setPassword.getChildByName("bg");
		this.btnBack = this.setPassword.getChildByName("btnBack");
		this.icon_nav_return = this.btnBack.getChildByName("icon_nav_return");
		this.layout = this.setPassword.getChildByName("layout");
		this.title = this.layout.getChildByName("title");
		this.phone_bg = this.layout.getChildByName("phone_bg");
		this.text_phone = this.phone_bg.getChildByName("text_phone");
		this.TEXT_LABEL = this.text_phone.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.text_phone.getChildByName("PLACEHOLDER_LABEL");
		this.img_sx = this.phone_bg.getChildByName("img_sx");
		this.label_phone = this.phone_bg.getChildByName("label_phone");
		this.line = this.layout.getChildByName("line");
		this.code_bg = this.line.getChildByName("code_bg");
		this.text_code = this.code_bg.getChildByName("text_code");
		this.TEXT_LABEL2 = this.text_code.getChildByName("TEXT_LABEL2");
		this.PLACEHOLDER_LABEL2 = this.text_code.getChildByName("PLACEHOLDER_LABEL2");
		this.btn_getCode = this.line.getChildByName("btn_getCode");
		this.labelGetCode = this.btn_getCode.getChildByName("labelGetCode");
		this.pass_bg = this.layout.getChildByName("pass_bg");
		this.text_pass = this.pass_bg.getChildByName("text_pass");
		this.TEXT_LABEL4 = this.text_pass.getChildByName("TEXT_LABEL4");
		this.PLACEHOLDER_LABEL4 = this.text_pass.getChildByName("PLACEHOLDER_LABEL4");
		this.pass2_bg = this.layout.getChildByName("pass2_bg");
		this.text_pass2 = this.pass2_bg.getChildByName("text_pass2");
		this.TEXT_LABEL42 = this.text_pass2.getChildByName("TEXT_LABEL42");
		this.PLACEHOLDER_LABEL42 = this.text_pass2.getChildByName("PLACEHOLDER_LABEL42");
		this.btn_register = this.setPassword.getChildByName("btn_register");

    }
}
