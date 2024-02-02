const {ccclass} = cc._decorator;

@ccclass
export default class auto_mine_world extends cc.Component {
	mine_world: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	world: cc.Node;
	bg: cc.Node;
	bg2: cc.Node;
	world_info: cc.Node;
	world_info_bg: cc.Node;
	layout: cc.Node;
	world_info_doudou: cc.Node;
	layout2: cc.Node;
	world_info_rmb: cc.Node;
	world_info_rmb_tile: cc.Node;
	btn_record: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	img_01: cc.Node;
	img_02: cc.Node;
	lab_map_zero: cc.Node;
	lab_map_middle: cc.Node;
	lab_map_top: cc.Node;
	lab_date_: cc.Node;
	line: cc.Node;
	pos1: cc.Node;
	pos2: cc.Node;
	layout3: cc.Node;
	lab_onedoupice: cc.Node;
	lab_weekup: cc.Node;
	lab_monthup: cc.Node;
	lab_jiup: cc.Node;
	lab_allup: cc.Node;
	lab_todayup: cc.Node;
	btn_more: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/mine_world.prefab"

    onLoad () {
		this.mine_world = this.node
		this.ScrollView = this.mine_world.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.world = this.content.getChildByName("world");
		this.bg = this.world.getChildByName("bg");
		this.bg2 = this.world.getChildByName("bg2");
		this.world_info = this.world.getChildByName("world_info");
		this.world_info_bg = this.world_info.getChildByName("world_info_bg");
		this.layout = this.world_info.getChildByName("layout");
		this.world_info_doudou = this.layout.getChildByName("world_info_doudou");
		this.layout2 = this.world_info.getChildByName("layout2");
		this.world_info_rmb = this.layout2.getChildByName("world_info_rmb");
		this.world_info_rmb_tile = this.world_info.getChildByName("world_info_rmb_tile");
		this.btn_record = this.world.getChildByName("btn_record");
		this.btn_close = this.world.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.img_01 = this.world.getChildByName("img_01");
		this.img_02 = this.world.getChildByName("img_02");
		this.lab_map_zero = this.img_02.getChildByName("lab_map_zero");
		this.lab_map_middle = this.img_02.getChildByName("lab_map_middle");
		this.lab_map_top = this.img_02.getChildByName("lab_map_top");
		this.lab_date_ = this.img_02.getChildByName("lab_date_");
		this.line = this.img_02.getChildByName("line");
		this.pos1 = this.line.getChildByName("pos1");
		this.pos2 = this.line.getChildByName("pos2");
		this.layout3 = this.img_02.getChildByName("layout3");
		this.lab_onedoupice = this.layout3.getChildByName("lab_onedoupice");
		this.lab_weekup = this.img_02.getChildByName("lab_weekup");
		this.lab_monthup = this.img_02.getChildByName("lab_monthup");
		this.lab_jiup = this.img_02.getChildByName("lab_jiup");
		this.lab_allup = this.img_02.getChildByName("lab_allup");
		this.lab_todayup = this.img_02.getChildByName("lab_todayup");
		this.btn_more = this.img_02.getChildByName("btn_more");

    }
}
