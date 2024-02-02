
package cn.leshufang.cocos.wxapi;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Dialog;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.okhttp3.Call;
import org.cocos2dx.okhttp3.Callback;
import org.cocos2dx.okhttp3.MediaType;
import org.cocos2dx.okhttp3.OkHttpClient;
import org.cocos2dx.okhttp3.Request;
import org.cocos2dx.okhttp3.Response;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;


public class WXEntryActivity extends Activity implements IWXAPIEventHandler {

	private static final String WX_APP_ID = "wx68e9f4db7e8baa53";
	private static final String WX_APP_SECRET = "56d457f6e66d894e0d8056f8b2a6b496";
//	095ea6d8a478f9a64e0aa047d4f2702e
//	85efc58c6388d6d65406708f6f3f7370

	public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
	private static final String TAG = "WXEntryActivityLog";

	private String openid;
	private String accessToken;
	private Dialog mDialog;
	private Handler myHandler;
	private static final int WX_LOGIN = 0;
	@Override
	protected void onCreate( Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

//        mDialog=WebDialogUtils.createWebDialog(this,"登录中");
		//判断是否已经注册到微信
		AppActivity.mWXapi.handleIntent(getIntent(), this);
		myHandler = new Handler() {
			public void handleMessage(Message msg) {
				switch (msg.what) {
					case WXEntryActivity.WX_LOGIN:

						break;
				}
				super.handleMessage(msg);
			}
		};
	}

	// 微信发送请求到第三方应用时，会回调到该方法
	@Override
	public void onReq(BaseReq baseReq) {
		Log.d(TAG, "onReq: ");
	}

	// 第三方应用发送到微信的请求处理后的响应结果，会回调到该方法
	//app发送消息给微信，处理返回消息的回调
	@Override
	public void onResp(BaseResp baseResp) {
		Log.d(TAG, "onResp: " + baseResp.errStr);
		Log.d(TAG, "onResp: 错误码" + baseResp.errCode);
		Log.d(TAG, "onResp: type" + baseResp.getType());
		//ERR_OK = 0(用户同意) ERR_AUTH_DENIED = -4（用户拒绝授权） ERR_USER_CANCEL = -2（用户取消）
		if (baseResp.getType()==1) {
			switch (baseResp.errCode) {
				case BaseResp.ErrCode.ERR_AUTH_DENIED:
					Toast.makeText(this, "用户拒绝授权登录", Toast.LENGTH_SHORT).show();
					mDialog.dismiss();
					this.finish();
					break;
				case BaseResp.ErrCode.ERR_USER_CANCEL:
					Toast.makeText(this, "用户取消授权登录", Toast.LENGTH_SHORT).show();
					mDialog.dismiss();
					this.finish();
					break;
				case BaseResp.ErrCode.ERR_OK:
					//用户同意授权。
					final String wx_code = ((SendAuth.Resp) baseResp).code;
					Log.d(TAG, "code:=================== " + wx_code);
					String code = "wxLoginCallback( '";
					code += wx_code;
					code += "');";
					AppActivity.runJsCode(code);
					this.finish();
					break;
			}
		}else if(baseResp.getType()==2) {
			switch (baseResp.errCode) {
				case BaseResp.ErrCode.ERR_OK:
					//分享成功
					this.finish();
					break;
				case BaseResp.ErrCode.ERR_USER_CANCEL:
					//分享取消
					this.finish();
					break;
				case BaseResp.ErrCode.ERR_AUTH_DENIED:
					//分享拒绝
					this.finish();
					break;
			}
		}
	}

	//获取access_token
	private void getAccessToken(String code) {

		//这个接口需用get请求
		String path = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + WX_APP_ID + "&secret="
				+ WX_APP_SECRET + "&code=" + code + "&grant_type=authorization_code";

		OkHttpClient client = new OkHttpClient();
		final Request request = new Request.Builder()
				.url(path)
				.build();
		Call call = client.newCall(request);
		call.enqueue(new Callback() {
			@Override
			public void onFailure(Call call, IOException e) {
				Log.d(TAG, "onFailure: 失败");
				mDialog.dismiss();
				finish();
			}

			@Override
			public void onResponse(Call call, Response response) throws IOException {
				final String result = response.body().string();
				Log.d(TAG, "请求微信服务器成功: " + result);

				try {
					JSONObject jsonObject = new JSONObject(result);
					openid = jsonObject.getString("openid");
					accessToken = jsonObject.getString("access_token");
//                    UserEntity.setUserWxID(openid);
				} catch (JSONException e) {
					e.printStackTrace();
				}

//                httpWxLogin = new HttpWxLogin(openid);
//                httpWxLogin.setReturnHttpResult(new ReturnHttpResult() {
//                    @Override
//                    public void clickReturnHttpResult(String result) {
//                        Log.d(TAG, "clickReturnHttpResult:从服务器获取的数据： " + result);
//                        if (MyApplication.isWxRegister) {
//
//                            Message message = new Message();
//                            message.obj = result;
//                            WXHandler.sendMessage(message);
//                        } else {
//                            new Thread(new Runnable() {
//                                @Override
//                                public void run() {
//                                    bindWX();
//                                }
//                            }).start();
//                        }
//                    }
//                });
				new Thread(new Runnable() {
					@Override
					public void run() {
//                        httpWxLogin.saveLoginWx();
					}
				}).start();
				getUserInfo();

			}
		});
	}



	//检查微信登录
	public void checkWXLogin(String result) {
		try {
			JSONObject jsonObject = new JSONObject(result);
			String code = jsonObject.getString("code");
			if (code.equals("1")) {

				Toast.makeText(this, "该微信号已经注册过", Toast.LENGTH_SHORT).show();
				JSONObject dataJsonObject = jsonObject.getJSONObject("data");

//                UserEntity.setUserID(dataJsonObject.getString("id"));
//                UserEntity.setUserName(dataJsonObject.getString("name"));
//                UserEntity.setUserPassword(dataJsonObject.getString("password"));
//                UserEntity.setUserCity(dataJsonObject.getString("city"));
//                UserEntity.setUserImg(URL.SERVER_PATH + dataJsonObject.getString("userimg"));
//                UserEntity.setUserPhone(dataJsonObject.getString("phone"));
//                UserEntity.setUserWxID(dataJsonObject.getString("wxid"));
//                UserEntity.setMerchantCaId(dataJsonObject.getString("merchantCaId"));

				//该微信号已经注册过
				mDialog.dismiss();
//                startActivity(new Intent(WXEntryActivity.this, HomeActivity.class));
				finish();
			} else {
				//该微信号未被注册过,也可在设置中绑定微信号
//                UserEntity.setUserWxID(openid);
				Toast.makeText(this, "此微信号尚未进行注册，请先注册之后再进行登录", Toast.LENGTH_SHORT).show();
				mDialog.dismiss();
				finish();
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	//获取用户信息
	private void getUserInfo() {
		String path = "https://api.weixin.qq.com/sns/userinfo?access_token=" + accessToken + "&openid=" + openid;
		OkHttpClient client = new OkHttpClient();
		Request request = new Request.Builder()
				.url(path)
				.build();
		Call call = client.newCall(request);
		call.enqueue(new Callback() {
			@Override
			public void onFailure(Call call, IOException e) {
				Log.d(TAG, "onFailure: userinfo" + e.getMessage());
			}

			@Override
			public void onResponse(Call call, Response response) throws IOException {
				Log.d(TAG, "onResponse: userinfo" + response.body().string());
			}
		});
	}

	@SuppressLint("HandlerLeak")
	Handler WXHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			super.handleMessage(msg);
			String result = (String) msg.obj;
			checkWXLogin(result);
		}
	};

}