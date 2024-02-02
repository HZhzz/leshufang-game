const { ccclass, property } = cc._decorator;
declare function unescape(s: string): string;

@ccclass
export class Utils {



  public static lastChosenCard
  //获得查询字符串
  public static getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  /**参数说明：
   * 根据长度截取先使用字符串，超长部分追加…
   * str 对象字符串
   * len 目标字节长度
   * 返回值： 处理结果字符串
   */
  public static cutString(str, len, readd: string = "..") {
    let s: string = "";
    let arr: string[] = str.split('');
    for (let a = 0; a < len / 2; a++) {
      if (a < arr.length) {
        s += arr[a];
      }
    }
    if (s.length < str.length) {
      s += readd;
    }
    return s;

    // if (str.length * 2 <= len) {
    //   return str;
    // }
    // var strlen = 0;
    // var s = "";
    // for (var i = 0; i < str.length; i++) {
    //   s = s + str.charAt(i);
    //   if (str.charCodeAt(i) > 128) {
    //     strlen = strlen + 2;
    //     if (strlen >= len) {
    //       return s.substring(0, s.length - 1) + readd;
    //     }
    //   } else {
    //     strlen = strlen + 1;
    //     if (strlen >= len) {
    //       return s.substring(0, s.length - 2) + readd;
    //     }
    //   }
    // }
    // return s;
  }

  // 对Date的扩展，将 Date 转化为指定格式的String   
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
  // 例子：   
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
  //Utils.getFormateDate(new Date(data["time_add"] * 1000), "yyyy-M-d h:m:s");
  public static getFormateDate(data: Date, formate: string): string {
    var o = {
      "M+": data.getMonth() + 1,                 //月份   
      "d+": data.getDate(),                    //日   
      "h+": data.getHours(),                   //小时   
      "m+": data.getMinutes(),                 //分   
      "s+": data.getSeconds(),                 //秒   
      "q+": Math.floor((data.getMonth() + 3) / 3), //季度   
      "S": data.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(formate))
      formate = formate.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(formate))
        formate = formate.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return formate;
  }

  public static getDays(lastdata) {
    var data = new Date()
    var d = data.getDate()
    if (lastdata != d) {
      return false
    }
    return true
  }

  /**
 * 格式化秒
 * @param int  value 总秒数
 * @return string result 格式化后的字符串
 */
  public static formatSeconds(value: number) {
    var theTime = value;// 需要转换的时间秒 
    var theTime1 = 0;// 分 
    var theTime2 = 0;// 小时 
    var theTime3 = 0;// 天
    if (theTime > 60) {
      theTime1 = Math.floor(theTime / 60);
      theTime = theTime % 60;
      if (theTime1 > 60) {
        theTime2 = Math.floor(theTime1 / 60);
        theTime1 = theTime1 % 60;
        if (theTime2 > 24) {
          //大于24小时
          theTime3 = Math.floor(theTime2 / 24);
          theTime2 = theTime2 % 24;
        }
      }
    }
    var result = '';
    if (theTime > 0) {
      result = "" + theTime + "秒";
    }
    if (theTime1 > 0) {
      result = "" + theTime1 + "分" + result;
    }
    if (theTime2 > 0) {
      result = "" + theTime2 + "小时" + result;
    }
    if (theTime3 > 0) {
      result = "" + theTime3 + "天" + result;
    }
    return result;
  }
  static ksort(o) {
    let sorted = {},
      keys = Object.keys(o);
    keys.sort();
    keys.forEach((key) => {
      sorted[key] = o[key];
    })
    return sorted;
  }
  //连接对象
  public static obj_contact(obj) {
    obj = this.ksort(obj);
    var s = "";
    for (var k in obj) {
      let v = obj[k];
      if (s.length == 0) {
        s += "?" + k + "=" + v;
      } else {
        s += "&" + k + "=" + v;
      }
    }
    return s;
  }

  public static tableKeys(obj) {
    var tmp = [];
    for (var key in obj) {
      tmp.push(key)
    }
    return tmp;
  }
  //clone对象
  public static cloneobj(obj) {
    var a = JSON.stringify(obj)
    return JSON.parse(a)
  }

  public static getCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if (cookieName == arr[0]) {
        return arr[1];
      }
    }
    return "";
  }

  public static delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = Utils.getCookie(name);
    console.log('____删除cookie:', cval)
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
  }

  //拼接对象
  public static mergeobj(obj1, obj2) {
    if (obj1 == null) {
      var a = JSON.stringify(obj2);
      return JSON.parse(a);
    }
    var a = JSON.stringify(obj2);
    var obj2 = JSON.parse(a);
    for (var k in obj1) {
      var d = obj2[k];
      if (d != null) {
        obj1[k] = d;
      }
    }

    for (var k in obj2) {
      obj1[k] = obj2[k];
    }
  }

  public static convertShow(value: any, decimal = 2) {
    if (!value) value = 0;
    try {
      if (typeof (value) != "string") {
        value = value.toString();
      }
      let arr = value.split('.');
      if (arr.length == 2 && arr[1].length > 4 && arr[0] == "0") {
        value = "" + arr[0] + "." + arr[1];
        return value;
      }
    } catch (error) {

    }
    if (typeof (value) == "string" && value.indexOf('.') != -1) {
      try {
        value = parseFloat(value);
      } catch (error) {

      }
    } else {
      try {
        value = parseInt(value);
      } catch (error) {

      }
    }
    const BASE = 10000;
    const SIZES = ["", "万", "亿", "兆", "京", "垓", "秭", "穣", "沟", "涧", "正", "载", "极", "恒河沙", "阿僧祇", "那由他", "不可思议", "无量大数"];
    let i = undefined;
    let str = "";
    if (isNaN(value)) {
      throw new Error("The input parameter is not a number.");
    }

    if (typeof decimal !== "number" || decimal < 0) {
      throw new Error("The 'decimal' parameter should be a non-negative number.");
    }
    if (value < BASE) {
      str = value;
    } else {
      i = Math.floor(Math.log(value) / Math.log(BASE));
      let sizeStr: string = SIZES[i] || "∞";
      str = `${((value / Math.pow(BASE, i))).toFixed(decimal)}${sizeStr}`;
    }
    return str;
  }

  //随机
  public static rand(a: number, b: number): number {
    var diff: number = b - a - 1;
    var r: number = Math.random() * diff;
    return Math.round(r) + a;
  }

  public static setAttribute(element: any, getmethod: string, name: string) {
    element.setAttribute(getmethod, name);
    return element;
  }
  public static addcss(element: any, getmethod: string, name: string) {
    element.style[getmethod] = name
    return element;
  }

  //游戏game服务器
  public static getGameHost(): string {
    var port = 8080
    var ip = "127.0.0.1"
    return "http://" + ip + ':' + port
  }

  public static getScreenShotImagePath() {
    var fullPath = jsb.fileUtils.getWritablePath() + 'result_share.png'; //拿到可写路径，将图片保存在本地，可以在ios端或者java端读取该文件
    // if(cc.sys.os == cc.sys.OS_ANDROID){
    //     fullPath = '/sdcard/result_share.png';
    // }
    if (jsb.fileUtils.isFileExist(fullPath)) {
      jsb.fileUtils.removeFile(fullPath);
    }
    return fullPath;
  }

  public static screenWebShot() {
    // 确保在浏览器中
    if (cc.sys.isBrowser) {
      // 监听director绘制完成的事件
      cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
        // 获取base64截图
        const canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
        const base64 = canvas.toDataURL();

        var divImage = document.getElementById("divImage");//获取DIV
        var shareImage: HTMLImageElement = document.getElementById("shareImage") as HTMLImageElement;//获取Image标签
        shareImage.setAttribute("crossOrigin", 'Anonymous')
        shareImage.src = base64
        divImage.style.display = "block";//显示DIV
      })
    }
  }

  public static captureScreen(node, fn) {
    let width = Math.floor(node.width);
    let height = Math.floor(node.height);
    if (!cc.sys.isNative) {
      this.screenWebShot()
      return;
    }
    console.log(width);
    if (CC_JSB) {
      let fullPath = this.getScreenShotImagePath();
      let cameraNode = new cc.Node();
      cameraNode.parent = node.parent;
      let camera = cameraNode.addComponent(cc.Camera);
      camera.cullingMask = 0xffffffff;
      let texture = new cc.RenderTexture();
      let gl = cc.game._renderContext;
      texture.initWithSize(width, height, gl.STENCIL_INDEX8);
      camera.targetTexture = texture;
      camera.render(node);
      let data = texture.readPixels();
      //以下代码将截图后默认倒置的图片回正
      let picData = new Uint8Array(width * height * 4);
      let rowBytes = width * 4;
      for (let row = 0; row < height; row++) {
        let srow = height - 1 - row;
        let start = Math.floor(srow * width * 4);
        let reStart = row * width * 4;
        // save the piexls data
        for (let i = 0; i < rowBytes; i++) {
          picData[reStart + i] = data[start + i];
        }
      }
      //保存图片
      jsb.saveImageData(picData, width, height, fullPath);
      console.log("截图成功，图片保存在 ====>", fullPath);

      node.parent.removeChild(camera);
      if (fn) fn(fullPath);
    }
  }

  public static getCaption(obj) {
    var index = obj.lastIndexOf("\-");
    obj = obj.substring(index + 1, obj.length);
    return obj;
  }

  public static getViewChairId(myChairId: number, chairId: number, chaircount: number) {
    return (chairId + chaircount - myChairId) % chaircount + 1;
  }

  public static getMaJiangChairId(myChairId: number, chairId: number, chaircount: number) {
    var vcid = Utils.getViewChairId(myChairId, chairId, chaircount);
    switch (chaircount) {
      case 2:
        if (vcid == 2) {
          return 3;
        } else {
          return 1;
        }
      case 3:
        if (vcid == 2) {
          return 2;
        } else if (vcid == 3) {
          return 4;
        } else {
          return 1;
        }
      case 4:
        return vcid;
    }
  }

  public static startsWith(source: string, str: string, ignoreCase: boolean = false): boolean {
    if (!source)
      return false;
    else if (source.length < str.length)
      return false;
    else {
      source = source.substring(0, str.length);
      if (!ignoreCase)
        return source == str;
      else
        return source.toLowerCase() == str.toLowerCase();
    }
  }

  public static endsWith(source: string, str: string, ignoreCase: boolean = false): boolean {
    if (!source)
      return false;
    else if (source.length < str.length)
      return false;
    else {
      source = source.substring(source.length - str.length);
      if (!ignoreCase)
        return source == str;
      else
        return source.toLowerCase() == str.toLowerCase();
    }
  }

  public static trim(targetString: string): string {
    return Utils.trimLeft(Utils.trimRight(targetString));
  }

  public static checkPsw(psw) {
    var str = psw;
    if (str == null || str.length < 8 || str.length > 20) {
      return false;
    }
    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg1.test(str)) {
      return false;
    }
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  private static EARTH_RADIUS = 6378.137;
  private static rad(d) {
    return d * Math.PI / 180.0;
  }

  public static GetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = Utils.rad(lat1);
    var radLat2 = Utils.rad(lat2);
    var a = radLat1 - radLat2;
    var b = Utils.rad(lng1) - Utils.rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * Utils.EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return Math.floor(s * 1000);
  }

  public static trimRight(targetString: string): string {
    var tempChar: string = "";
    for (var i: number = targetString.length - 1; i >= 0; i--) {
      tempChar = targetString.charAt(i);
      if (tempChar != " " && tempChar != "\n" && tempChar != "\r") {
        break;
      }
    }
    return targetString.substring(0, i + 1);
  }

  public static trimLeft(targetString: string): string {
    var tempChar: string = "";
    for (var i: number = 0; i < targetString.length; i++) {
      tempChar = targetString.charAt(i);
      if (tempChar != " " && tempChar != "\n" && tempChar != "\r") {
        break;
      }
    }
    return targetString.substr(i);
  }

  public static timestampToDateString(timestamp) {
    var now = new Date(timestamp * 1000);
    var year = now.getFullYear();
    var month:any = now.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date :any= now.getDate();
    if (date < 10) date = "0" + date;
    var hour:any = now.getHours();
    if (hour < 10) hour = "0" + hour;
    var minute:any = now.getMinutes();
    if (minute < 10) minute = "0" + minute;
    var second:any = now.getSeconds();
    if (second < 10) second = "0" + second;
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;

  }

  public static base64encode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
  }

  public static base64edecode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    var base64DecodeChars = new Array(
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
      -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c1 == -1);
      if (c1 == -1)
        break;

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c2 == -1);
      if (c2 == -1)
        break;

      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if (c3 == 61)
          return out;
        c3 = base64DecodeChars[c3];
      } while (i < len && c3 == -1);
      if (c3 == -1)
        break;

      out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if (c4 == 61)
          return out;
        c4 = base64DecodeChars[c4];
      } while (i < len && c4 == -1);
      if (c4 == -1)
        break;
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
  }
}
