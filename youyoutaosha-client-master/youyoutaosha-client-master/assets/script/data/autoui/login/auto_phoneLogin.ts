const {ccclass} = cc._decorator;

@ccclass
export default class auto_phoneLogin extends cc.Component {
	phoneLogin: cc.Node;
	bg: cc.Node;
	btnBack: cc.Node;
	icon_nav_return: cc.Node;
	title: cc.Node;
	window_base: cc.Node;
	img_code: cc.Node;
	btn_pass: cc.Node;
	code_bg: cc.Node;
	text_code: cc.Node;
	TEXT_LABEL2: cc.Node;
	PLACEHOLDER_LABEL2: cc.Node;
	btn_getCode: cc.Node;
	labelGetCode: cc.Node;
	img_pass: cc.Node;
	btn_code: cc.Node;
	pass_bg: cc.Node;
	text_pass: cc.Node;
	TEXT_LABEL4: cc.Node;
	PLACEHOLDER_LABEL4: cc.Node;
	phone_bg: cc.Node;
	text_phone: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	img_sx: cc.Node;
	btn_login: cc.Node;

	public static URL:string = "db://assets/resources/prefab/login/phoneLogin.prefab"

    onLoad () {
		this.phoneLogin = this.node
		this.bg = this.phoneLogin.getChildByName("bg");
		this.btnBack = this.phoneLogin.getChildByName("btnBack");
		this.icon_nav_return = this.btnBack.getChildByName("icon_nav_return");
		this.title = this.phoneLogin.getChildByName("title");
		this.window_base = this.phoneLogin.getChildByName("window_base");
		this.img_code = this.window_base.getChildByName("img_code");
		this.btn_pass = this.img_code.getChildByName("btn_pass");
		this.code_bg = this.img_code.getChildByName("code_bg");
		this.text_code = this.code_bg.getChildByName("text_code");
		this.TEXT_LABEL2 = this.text_code.getChildByName("TEXT_LABEL2");
		this.PLACEHOLDER_LABEL2 = this.text_code.getChildByName("PLACEHOLDER_LABEL2");
		this.btn_getCode = this.img_code.getChildByName("btn_getCode");
		this.labelGetCode = this.btn_getCode.getChildByName("labelGetCode");
		this.img_pass = this.window_base.getChildByName("img_pass");
		this.btn_code = this.img_pass.getChildByName("btn_code");
		this.pass_bg = this.img_pass.getChildByName("pass_bg");
		this.text_pass = this.pass_bg.getChildByName("text_pass");
		this.TEXT_LABEL4 = this.text_pass.getChildByName("TEXT_LABEL4");
		this.PLACEHOLDER_LABEL4 = this.text_pass.getChildByName("PLACEHOLDER_LABEL4");
		this.phone_bg = this.window_base.getChildByName("phone_bg");
		this.text_phone = this.phone_bg.getChildByName("text_phone");
		this.TEXT_LABEL = this.text_phone.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.text_phone.getChildByName("PLACEHOLDER_LABEL");
		this.img_sx = this.phone_bg.getChildByName("img_sx");
		this.btn_login = this.phoneLogin.getChildByName("btn_login");

    }
}
