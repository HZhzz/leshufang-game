const {ccclass} = cc._decorator;

@ccclass
export default class auto_ticket_item extends cc.Component {
	ticket_item: cc.Node;
	ticket_prize_img: cc.Node;
	ticket_prize_icon: cc.Node;
	ticket_prize_name: cc.Node;
	ticket_prize_cost: cc.Node;
	ticket_prize_cost_title: cc.Node;
	ticket_prize_cost_num: cc.Node;
	ticket_prize_doec: cc.Node;
	ticket_prize_img_type: cc.Node;
	ticket_prize_canyu_lab: cc.Node;
	btn_canyu: cc.Node;
	lab_canyu: cc.Node;
	btn_quchu: cc.Node;
	lab_quchu: cc.Node;
	waitingNode: cc.Node;
	ticket_prize_time_title: cc.Node;
	ticket_prize_time: cc.Node;
	ticket_prize_pop_title: cc.Node;
	ticket_prize_pop: cc.Node;
	loadingNode: cc.Node;
	loadingLabel: cc.Node;
	resultNode: cc.Node;
	resultLabel: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/ticket_item.prefab"

    onLoad () {
		this.ticket_item = this.node
		this.ticket_prize_img = this.ticket_item.getChildByName("ticket_prize_img");
		this.ticket_prize_icon = this.ticket_item.getChildByName("ticket_prize_icon");
		this.ticket_prize_name = this.ticket_item.getChildByName("ticket_prize_name");
		this.ticket_prize_cost = this.ticket_item.getChildByName("ticket_prize_cost");
		this.ticket_prize_cost_title = this.ticket_prize_cost.getChildByName("ticket_prize_cost_title");
		this.ticket_prize_cost_num = this.ticket_prize_cost.getChildByName("ticket_prize_cost_num");
		this.ticket_prize_doec = this.ticket_item.getChildByName("ticket_prize_doec");
		this.ticket_prize_img_type = this.ticket_item.getChildByName("ticket_prize_img_type");
		this.ticket_prize_canyu_lab = this.ticket_prize_img_type.getChildByName("ticket_prize_canyu_lab");
		this.btn_canyu = this.ticket_item.getChildByName("btn_canyu");
		this.lab_canyu = this.btn_canyu.getChildByName("lab_canyu");
		this.btn_quchu = this.ticket_item.getChildByName("btn_quchu");
		this.lab_quchu = this.btn_quchu.getChildByName("lab_quchu");
		this.waitingNode = this.ticket_item.getChildByName("waitingNode");
		this.ticket_prize_time_title = this.waitingNode.getChildByName("ticket_prize_time_title");
		this.ticket_prize_time = this.waitingNode.getChildByName("ticket_prize_time");
		this.ticket_prize_pop_title = this.waitingNode.getChildByName("ticket_prize_pop_title");
		this.ticket_prize_pop = this.waitingNode.getChildByName("ticket_prize_pop");
		this.loadingNode = this.ticket_item.getChildByName("loadingNode");
		this.loadingLabel = this.loadingNode.getChildByName("loadingLabel");
		this.resultNode = this.ticket_item.getChildByName("resultNode");
		this.resultLabel = this.resultNode.getChildByName("resultLabel");

    }
}
