export class MyTools {

    static scaleToSize(node: cc.Node, size: cc.Size | cc.Node) {
        const sprite = node.getComponent(cc.Sprite);
        if (!sprite) {
            return;
        }
        sprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        node.scale = Math.min(size.width / node.width, size.height / node.height);
    }

    static printBtnEventStr(node: cc.Node) {
        let str = MyTools._createBtnEventStr(node);
        console.log(str);
    }

    static _createBtnEventStr(node: cc.Node, strData: { str: string, funcStr: string } = { str: '', funcStr: '' }) {
        if (node.getComponent(cc.Button) || node.getComponent(cc.Toggle)) {
            const functionName = 'on' + node.name.split('_').map(item => item[0].toUpperCase() + item.slice(1)).join('');
            strData.str += `this.onRegisterEvent(this.ui.${node.name}, this.${functionName});\n`;
            strData.funcStr += `${functionName}() {\n\n}\n\n`;
        }
        node.children.forEach((child) => {
            MyTools._createBtnEventStr(child, strData);
        });
        return strData.str + '\n}\n\n' + strData.funcStr;
    }
}