const {ccclass} = cc._decorator;

@ccclass
export default class auto_bindPhone extends cc.Component {
	bindPhone: cc.Node;
	bg: cc.Node;
	btnBack: cc.Node;
	icon_nav_return: cc.Node;
	btnPhoneLogin: cc.Node;
	window_base: cc.Node;
	img_code: cc.Node;
	code_bg: cc.Node;
	text_code: cc.Node;
	TEXT_LABEL2: cc.Node;
	PLACEHOLDER_LABEL2: cc.Node;
	btn_getCode: cc.Node;
	labelGetCode: cc.Node;
	phone_bg: cc.Node;
	text_phone: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	img_sx: cc.Node;
	btn_bind: cc.Node;

	public static URL:string = "db://assets/resources/prefab/login/bindPhone.prefab"

    onLoad () {
		this.bindPhone = this.node
		this.bg = this.bindPhone.getChildByName("bg");
		this.btnBack = this.bindPhone.getChildByName("btnBack");
		this.icon_nav_return = this.btnBack.getChildByName("icon_nav_return");
		this.btnPhoneLogin = this.bindPhone.getChildByName("btnPhoneLogin");
		this.window_base = this.bindPhone.getChildByName("window_base");
		this.img_code = this.window_base.getChildByName("img_code");
		this.code_bg = this.img_code.getChildByName("code_bg");
		this.text_code = this.code_bg.getChildByName("text_code");
		this.TEXT_LABEL2 = this.text_code.getChildByName("TEXT_LABEL2");
		this.PLACEHOLDER_LABEL2 = this.text_code.getChildByName("PLACEHOLDER_LABEL2");
		this.btn_getCode = this.img_code.getChildByName("btn_getCode");
		this.labelGetCode = this.btn_getCode.getChildByName("labelGetCode");
		this.phone_bg = this.window_base.getChildByName("phone_bg");
		this.text_phone = this.phone_bg.getChildByName("text_phone");
		this.TEXT_LABEL = this.text_phone.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.text_phone.getChildByName("PLACEHOLDER_LABEL");
		this.img_sx = this.phone_bg.getChildByName("img_sx");
		this.btn_bind = this.bindPhone.getChildByName("btn_bind");

    }
}
