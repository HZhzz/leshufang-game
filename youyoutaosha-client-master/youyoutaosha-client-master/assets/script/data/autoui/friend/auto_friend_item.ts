const {ccclass} = cc._decorator;

@ccclass
export default class auto_friend_item extends cc.Component {
	friend_item: cc.Node;
	bg: cc.Node;
	mask: cc.Node;
	bg2: cc.Node;
	img_face: cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/friend_item.prefab"

    onLoad () {
		this.friend_item = this.node
		this.bg = this.friend_item.getChildByName("bg");
		this.mask = this.friend_item.getChildByName("mask");
		this.bg2 = this.mask.getChildByName("bg2");
		this.img_face = this.mask.getChildByName("img_face");

    }
}
