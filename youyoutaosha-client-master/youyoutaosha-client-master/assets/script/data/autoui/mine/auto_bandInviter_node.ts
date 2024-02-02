const {ccclass} = cc._decorator;

@ccclass
export default class auto_bandInviter_node extends cc.Component {
	bandID: cc.Node;
	big_rich_pop_backgunrd: cc.Node;
	big_rich_pop_info: cc.Node;
	big_rich_pop_name: cc.Node;
	big_rich_pop_wx: cc.Node;
	EditBox: cc.Node;
	BACKGROUND_SPRITE: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	btn_copywx: cc.Node;
	btn_copywx_lab: cc.Node;
	btn_close_pop: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/bandInviter_node.prefab"

    onLoad () {
		this.bandID = this.node
		this.big_rich_pop_backgunrd = this.bandID.getChildByName("big_rich_pop_backgunrd");
		this.big_rich_pop_info = this.bandID.getChildByName("big_rich_pop_info");
		this.big_rich_pop_name = this.big_rich_pop_info.getChildByName("big_rich_pop_name");
		this.big_rich_pop_wx = this.big_rich_pop_info.getChildByName("big_rich_pop_wx");
		this.EditBox = this.big_rich_pop_wx.getChildByName("EditBox");
		this.BACKGROUND_SPRITE = this.EditBox.getChildByName("BACKGROUND_SPRITE");
		this.TEXT_LABEL = this.EditBox.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.EditBox.getChildByName("PLACEHOLDER_LABEL");
		this.btn_copywx = this.big_rich_pop_info.getChildByName("btn_copywx");
		this.btn_copywx_lab = this.btn_copywx.getChildByName("btn_copywx_lab");
		this.btn_close_pop = this.big_rich_pop_info.getChildByName("btn_close_pop");

    }
}
