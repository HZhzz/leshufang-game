const {ccclass} = cc._decorator;

@ccclass
export default class auto_big_rich_updata extends cc.Component {
	big_rich_updata: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	rich: cc.Node;
	big_rich_list: cc.Node;
	updata_title: cc.Node;
	btn_helper: cc.Node;
	updata_useinfo: cc.Node;
	updata_useinfo_kuang: cc.Node;
	updata_useinfo_img: cc.Node;
	updata_useinfo_name: cc.Node;
	updata_useinfo_doudou: cc.Node;
	updata_useinfo_updata: cc.Node;
	img_user_icon: cc.Node;
	img_user_icon_lab: cc.Node;
	zhiya_node: cc.Node;
	zhiya_icon: cc.Node;
	edit_zhiya: cc.Node;
	BACKGROUND_SPRITE: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	contact_information: cc.Node;
	contact_title: cc.Node;
	contact_doc: cc.Node;
	contact_wx: cc.Node;
	icon_wx: cc.Node;
	edit_wx: cc.Node;
	contact_qq: cc.Node;
	icon_qq: cc.Node;
	edit_qq: cc.Node;
	btn_zhiya: cc.Node;
	img_zhiya: cc.Node;
	lab_img_zhiya: cc.Node;
	lab_zhiya: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/big_rich_updata.prefab"

    onLoad () {
		this.big_rich_updata = this.node
		this.ScrollView = this.big_rich_updata.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.rich = this.content.getChildByName("rich");
		this.big_rich_list = this.rich.getChildByName("big_rich_list");
		this.updata_title = this.big_rich_list.getChildByName("updata_title");
		this.btn_helper = this.big_rich_list.getChildByName("btn_helper");
		this.updata_useinfo = this.big_rich_list.getChildByName("updata_useinfo");
		this.updata_useinfo_kuang = this.updata_useinfo.getChildByName("updata_useinfo_kuang");
		this.updata_useinfo_img = this.updata_useinfo_kuang.getChildByName("updata_useinfo_img");
		this.updata_useinfo_name = this.updata_useinfo.getChildByName("updata_useinfo_name");
		this.updata_useinfo_doudou = this.updata_useinfo.getChildByName("updata_useinfo_doudou");
		this.updata_useinfo_updata = this.updata_useinfo.getChildByName("updata_useinfo_updata");
		this.img_user_icon = this.updata_useinfo_updata.getChildByName("img_user_icon");
		this.img_user_icon_lab = this.updata_useinfo_updata.getChildByName("img_user_icon_lab");
		this.zhiya_node = this.updata_useinfo_updata.getChildByName("zhiya_node");
		this.zhiya_icon = this.zhiya_node.getChildByName("zhiya_icon");
		this.edit_zhiya = this.zhiya_node.getChildByName("edit_zhiya");
		this.BACKGROUND_SPRITE = this.edit_zhiya.getChildByName("BACKGROUND_SPRITE");
		this.TEXT_LABEL = this.edit_zhiya.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.edit_zhiya.getChildByName("PLACEHOLDER_LABEL");
		this.contact_information = this.big_rich_list.getChildByName("contact_information");
		this.contact_title = this.contact_information.getChildByName("contact_title");
		this.contact_doc = this.contact_information.getChildByName("contact_doc");
		this.contact_wx = this.contact_information.getChildByName("contact_wx");
		this.icon_wx = this.contact_wx.getChildByName("icon_wx");
		this.edit_wx = this.contact_wx.getChildByName("edit_wx");
		this.contact_qq = this.contact_information.getChildByName("contact_qq");
		this.icon_qq = this.contact_qq.getChildByName("icon_qq");
		this.edit_qq = this.contact_qq.getChildByName("edit_qq");
		this.btn_zhiya = this.big_rich_list.getChildByName("btn_zhiya");
		this.img_zhiya = this.btn_zhiya.getChildByName("img_zhiya");
		this.lab_img_zhiya = this.img_zhiya.getChildByName("lab_img_zhiya");
		this.lab_zhiya = this.btn_zhiya.getChildByName("lab_zhiya");
		this.btn_close = this.rich.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");

    }
}
