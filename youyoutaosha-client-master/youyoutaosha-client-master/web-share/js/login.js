var api = "http://api.leshufang.cn:9080/api";									//端链接外网地址
var appid = "wx70b97672e0ff14b5";								//微信公众平台appid
var local = "http://ccc.leshufang.cn/share/";		//阿里云iddex.html链接
var fir = "https://fir.xcxwo.com/xdkjs6";							//分发平台下载链接
var fir_ios = "https://fir.xcxwo.com/xdkjs6";

$(function () {
	// 点击下载
	$('#download').click(function () {
		onClick();
	})

	let isLogin = false;
	function onClick() {
		var isWeChat = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
		if (isWeChat) {
			if (!isLogin) {
				alert("请点击右下角的“使用完整服务”并进行授权后下载");
				return;
			}
		} else {
			console.log("当前不在微信中打开");
		}

		var u = navigator.userAgent;
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		if (isiOS) {
			window.location.href = fir
		} else {
			window.location.href = fir_ios
		}
	}

	var shangjiid = getQueryString('shangjiid');
	if (shangjiid) {
		setCookie("shangjiid", shangjiid, 1);
		// localStorage.setItem("shangjiid", shangjiid);
	} else {

		shangjiid = getCookie('shangjiid');
		if (!shangjiid) {
			return
		}
	}
	var code = getQueryString('code');
	if (code) {
		toLogin(code, shangjiid);
	} else {
		var isWeChat = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
		if (isWeChat) {
			console.log("当前在微信中打开");
			getCode()
		} else {
			console.log("当前不在微信中打开");
		}
	}

	function getQueryString(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return decodeURIComponent(r[2]);
		};
		return null;
	}

	// 获取url
	function getCode() {
		console.log("获取url")
		location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${local}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
	}


	function toLogin(code, shangjiid) {
		// layer.load(1, {
		// 	shade: [0.3, '#000'] //0.1透明度的白色背景
		// });
		$.ajax({
			cache: true,
			type: "GET",
			url: api + "/hall/h5login",
			data: {
				'code': code,
				'sjuid': shangjiid
			},
			success: function (res) {
				// layer.closeAll('loading');
				if (res.errcode == 0) {
					localStorage.removeItem("shangjiid")
				} else {
					// layer.msg(res.errmsg, {
					// 	time: 1000,
					// });
				}
				isLogin = true;
				return false;
			},
			error: function () {
				// layer.closeAll('loading');
				// layer.msg("连接超时", {
				// 	time: 1000,
				// });
				return false;
			}

		});
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	// 获取Cookie，从Cookie中获取变量值
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}


})