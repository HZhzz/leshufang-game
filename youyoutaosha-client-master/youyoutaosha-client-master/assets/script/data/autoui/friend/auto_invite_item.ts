const {ccclass} = cc._decorator;

@ccclass
export default class auto_invite_item extends cc.Component {
	invite_item: cc.Node;
	bg: cc.Node;
	invite_time: cc.Node;
	layoutOne: cc.Node;
	invite_one: cc.Node;
	invite_one_icon1: cc.Node;
	layoutTwo: cc.Node;
	invite_two: cc.Node;
	invite_one_icon2: cc.Node;
	layoutAltogether: cc.Node;
	invite_altogether: cc.Node;
	invite_one_icon3: cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/invite_item.prefab"

    onLoad () {
		this.invite_item = this.node
		this.bg = this.invite_item.getChildByName("bg");
		this.invite_time = this.invite_item.getChildByName("invite_time");
		this.layoutOne = this.invite_item.getChildByName("layoutOne");
		this.invite_one = this.layoutOne.getChildByName("invite_one");
		this.invite_one_icon1 = this.layoutOne.getChildByName("invite_one_icon1");
		this.layoutTwo = this.invite_item.getChildByName("layoutTwo");
		this.invite_two = this.layoutTwo.getChildByName("invite_two");
		this.invite_one_icon2 = this.layoutTwo.getChildByName("invite_one_icon2");
		this.layoutAltogether = this.invite_item.getChildByName("layoutAltogether");
		this.invite_altogether = this.layoutAltogether.getChildByName("invite_altogether");
		this.invite_one_icon3 = this.layoutAltogether.getChildByName("invite_one_icon3");

    }
}
