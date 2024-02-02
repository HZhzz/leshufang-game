const {ccclass} = cc._decorator;

@ccclass
export default class auto_text_input_pop extends cc.Component {
	text_input_pop: cc.Node;
	bg: cc.Node;
	bg2: cc.Node;
	title: cc.Node;
	textBg: cc.Node;
	EditBox: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	btn_ok: cc.Node;
	label_btn: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/text_input_pop.prefab"

    onLoad () {
		this.text_input_pop = this.node
		this.bg = this.text_input_pop.getChildByName("bg");
		this.bg2 = this.text_input_pop.getChildByName("bg2");
		this.title = this.bg2.getChildByName("title");
		this.textBg = this.bg2.getChildByName("textBg");
		this.EditBox = this.textBg.getChildByName("EditBox");
		this.TEXT_LABEL = this.EditBox.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.EditBox.getChildByName("PLACEHOLDER_LABEL");
		this.btn_ok = this.bg2.getChildByName("btn_ok");
		this.label_btn = this.btn_ok.getChildByName("label_btn");

    }
}
