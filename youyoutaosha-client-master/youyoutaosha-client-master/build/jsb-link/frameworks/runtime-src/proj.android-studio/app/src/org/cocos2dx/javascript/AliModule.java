package org.cocos2dx.javascript;

import java.util.Map;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;

import org.cocos2dx.javascript.utils.AuthResult;
import org.cocos2dx.javascript.utils.OrderInfoUtil2_0;
import org.cocos2dx.javascript.utils.PayResult;
import org.cocos2dx.javascript.utils.TToast;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;


import com.alipay.sdk.app.AuthTask;
import com.alipay.sdk.app.OpenAuthTask;
import com.alipay.sdk.app.PayTask;

public class AliModule {
    private static Context context = null;
    private static AppActivity app = null;
    /**
     * 用于支付宝支付业务的入参 app_id。
     */
    public static final String APPID = "2021004129627267"; // 2023年05月29日11:26:41 修改

    /**
     * 用于支付宝账户登录授权业务的入参 pid。
     */
    public static final String PID =   "2088641948841687"; // 2023年05月29日11:23:42 修改

    /**
     * 用于支付宝账户登录授权业务的入参 target_id。
     */
    public static final String TARGET_ID = "122321123";

    /**
     * pkcs8 格式的商户私钥。
     * <p>
     * 如下私钥，RSA2_PRIVATE 或者 RSA_PRIVATE 只需要填入一个，如果两个都设置了，本 Demo 将优先
     * 使用 RSA2_PRIVATE。RSA2_PRIVATE 可以保证商户交易在更加安全的环境下进行，建议商户使用
     * RSA2_PRIVATE。
     * <p>
     * 建议使用支付宝提供的公私钥生成工具生成和获取 RSA2_PRIVATE。®
     * 工具地址：https://doc.open.alipay.com/docs/doc.htm?treeId=291&articleId=106097&docType=1
     */
    private static final int SDK_PAY_FLAG = 1;
    public static final String RSA2_PRIVATE = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCCw1AfoWOp2bMhwWjXxasRSO+RtJkWlK5soE9OpiIhoLXJn3tUx+KLbuyMWWmS35Nay3M+crV9fN8VlnKExQprgXDOy4cVXKX1BJxsZQuR8f6R8AIzbRuI8CQKcC9RRte7L45MGJ/Fy5eWnL8+9aTHWz9R/MrVVhtUL0Q80l3LkBcUaEOE7S1MpJCU2FMzm7o6DpwazgQ/UvEROBpHs6wSjz+rpS9TQgaCYT/66wRtVlqjlVF/oXz9QzxgZ4TxHQq1j7AvaMtohVnEsh+N3lPW51BAlPuKFaeLhhg5CiVfuw6mWrUrZGjp5A4rYZUxinG8Qm5cPwz89ULQ4zGEaxMtAgMBAAECggEAYETc4zyVPEHrMInM3zZG2EXjIllcb5RsycpIOPX0oN9JlrPUP7mdHtw+SKG3KQty1+B66tnWphldv+3wR7EtF7LHU2fh/qckAzwu0Vqe5wbLTbPuWuAT6oApeInZPDQ0tTmwwHNMhXl7E8Y4wmhktOSHvJuo1OE844Cc805JAYj2MpOglbCQcBkkiUZ5NM3lvNr0kQL/TdIBGGcAlHwBiU1hoVehD//nr9aU0ZOtKFNwjiXO4C1S4CvA0P7GA81HUJPk3TBqlRMZ7jXv9c+z3yOtQOcewTgWlM1yghDGPYG8I/QOnE0Lm63juW7jEPj3i562H7pTH/UOfRUJMic8/QKBgQDT9KF1dMUA8YaRou/uQsVhgqE+GdJ7lJY0caqR280Fw4oYtaXPuidG+g9NVTEjU0LeAjFoTocPcObXVl5jBXTC209vsJCso+ljQzFI6ZqBmDMBfnrEc+TCcJLrT/wRp2ReE80S6CYVWt4kjzLan6VVi3pPEZ8btCxmJaTLBhvKswKBgQCd731FV2GeW7wgebcZzGV9NhAGcTaeH+YENl6260TliU9oSD8whuJvGQjeELcRkgbVRtr2aJ3qjO+YBM0PYQUyBRgjPn5ul1+ixfLsTSJ8jpSTqr/itj8zUZw2KTYaOTeFHT7+UmYP5SkHkKJD9Dd8QSIDvc0INY+KfItm8CYanwKBgCXHJ3QI8QgfBG42zW75Jbcgkl7AOXzfWfpU/CLtO1i4poeK8NfahR+oeEu/UHfMYlGxsF64CGifJfXhpgceNNZ6QmlU3iR3PqT7l/A3+tr4ZrbwdS9IvNBPQlCAvBvlawU9oEKrcAZEYO3BPD4tUEm0B4PKT0Kf1X4LXZj2KMPzAoGAQW4peOPFpoScwNuMFt0OIryWEQUwOnw+n/oibSe1KF8lja94tlL7VkmJ2e4U2eukdxFev30CB10SGenLRpbMPzfLEzbdzFVcIqRdirY+Flo/hZnU20jjkBA8ZlfWeTDBJp3CLjzW2bj3sZGjGAICRrD5NZGZctA1worsed39+0MCgYB0f05B1dJ8LLD0r+txyOv6qXA6uMCO3spDZCziLt6KdSGAul2n7TWxl0Lq2YbrIulYcBV88p4HVZGGBjkHXmvhB1DUv9x55LxzpMRl5cjRLeJOeyGyYLfOgXKscOoTVxcZoqNRYj+q7Bi936lWuhu8tIW3K2NAOx2fPzHrb1aW7Q=="; // 2023年05月29日11:47:10 修改
    public static final String RSA_PRIVATE = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCCw1AfoWOp2bMhwWjXxasRSO+RtJkWlK5soE9OpiIhoLXJn3tUx+KLbuyMWWmS35Nay3M+crV9fN8VlnKExQprgXDOy4cVXKX1BJxsZQuR8f6R8AIzbRuI8CQKcC9RRte7L45MGJ/Fy5eWnL8+9aTHWz9R/MrVVhtUL0Q80l3LkBcUaEOE7S1MpJCU2FMzm7o6DpwazgQ/UvEROBpHs6wSjz+rpS9TQgaCYT/66wRtVlqjlVF/oXz9QzxgZ4TxHQq1j7AvaMtohVnEsh+N3lPW51BAlPuKFaeLhhg5CiVfuw6mWrUrZGjp5A4rYZUxinG8Qm5cPwz89ULQ4zGEaxMtAgMBAAECggEAYETc4zyVPEHrMInM3zZG2EXjIllcb5RsycpIOPX0oN9JlrPUP7mdHtw+SKG3KQty1+B66tnWphldv+3wR7EtF7LHU2fh/qckAzwu0Vqe5wbLTbPuWuAT6oApeInZPDQ0tTmwwHNMhXl7E8Y4wmhktOSHvJuo1OE844Cc805JAYj2MpOglbCQcBkkiUZ5NM3lvNr0kQL/TdIBGGcAlHwBiU1hoVehD//nr9aU0ZOtKFNwjiXO4C1S4CvA0P7GA81HUJPk3TBqlRMZ7jXv9c+z3yOtQOcewTgWlM1yghDGPYG8I/QOnE0Lm63juW7jEPj3i562H7pTH/UOfRUJMic8/QKBgQDT9KF1dMUA8YaRou/uQsVhgqE+GdJ7lJY0caqR280Fw4oYtaXPuidG+g9NVTEjU0LeAjFoTocPcObXVl5jBXTC209vsJCso+ljQzFI6ZqBmDMBfnrEc+TCcJLrT/wRp2ReE80S6CYVWt4kjzLan6VVi3pPEZ8btCxmJaTLBhvKswKBgQCd731FV2GeW7wgebcZzGV9NhAGcTaeH+YENl6260TliU9oSD8whuJvGQjeELcRkgbVRtr2aJ3qjO+YBM0PYQUyBRgjPn5ul1+ixfLsTSJ8jpSTqr/itj8zUZw2KTYaOTeFHT7+UmYP5SkHkKJD9Dd8QSIDvc0INY+KfItm8CYanwKBgCXHJ3QI8QgfBG42zW75Jbcgkl7AOXzfWfpU/CLtO1i4poeK8NfahR+oeEu/UHfMYlGxsF64CGifJfXhpgceNNZ6QmlU3iR3PqT7l/A3+tr4ZrbwdS9IvNBPQlCAvBvlawU9oEKrcAZEYO3BPD4tUEm0B4PKT0Kf1X4LXZj2KMPzAoGAQW4peOPFpoScwNuMFt0OIryWEQUwOnw+n/oibSe1KF8lja94tlL7VkmJ2e4U2eukdxFev30CB10SGenLRpbMPzfLEzbdzFVcIqRdirY+Flo/hZnU20jjkBA8ZlfWeTDBJp3CLjzW2bj3sZGjGAICRrD5NZGZctA1worsed39+0MCgYB0f05B1dJ8LLD0r+txyOv6qXA6uMCO3spDZCziLt6KdSGAul2n7TWxl0Lq2YbrIulYcBV88p4HVZGGBjkHXmvhB1DUv9x55LxzpMRl5cjRLeJOeyGyYLfOgXKscOoTVxcZoqNRYj+q7Bi936lWuhu8tIW3K2NAOx2fPzHrb1aW7Q=="; // 2023年05月29日11:47:10 修改

    private static final int SDK_AUTH_FLAG = 2;
    final static OpenAuthTask.Callback openAuthCallback = new OpenAuthTask.Callback() {
        @Override
        public void onResult(int resultCode, String memo, Bundle bundle) {
            if (resultCode == OpenAuthTask.OK) {
                Log.d("TAG", "onResult() returned: " + bundleToString(bundle));
                showToast(String.format("业务成功，结果码: %s\n结果信息: %s\n结果数据: %s", resultCode, memo, bundleToString(bundle)));

                //  Log.e(bundleToString(bundle), "rewardVideoAd bar click");
            } else {
                showToast(String.format("业务失败，结果码: %s\n结果信息: %s\n结果数据: %s", resultCode, memo, bundleToString(bundle)));
            }

        }
    };

    public static void showToast(String msg) {
        TToast.show(AliModule.app, msg);
    }

    private static String bundleToString(Bundle bundle) {
        if (bundle == null) {
            return "null";
        }
        final StringBuilder sb = new StringBuilder();
        for (String key : bundle.keySet()) {
            sb.append(key).append("=>").append(bundle.get(key)).append("\n");
        }
        return sb.toString();
    }

    public static void setContext(Context context) {
        AliModule.context = context;
        AliModule.app = (AppActivity) context;
    }

    public static void runJsCode(final String code) {
        // 一定要在 GL 线程中执行
        app.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString(code);
            }
        });
    }


    @SuppressLint("HandlerLeak")
    public static Handler mHandler = new Handler() {
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case SDK_PAY_FLAG: {
                    Log.e("TAG", "handleMessage:==========> ");
                    @SuppressWarnings("unchecked")
                    PayResult payResult = new PayResult((Map<String, String>) msg.obj);
                    /**
                     * 对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
                     */
                    String resultInfo = payResult.getResult();// 同步返回需要验证的信息
                    String resultStatus = payResult.getResultStatus();
                    // 判断resultStatus 为9000则代表支付成功
                    if (TextUtils.equals(resultStatus, "9000")) {
                        // 该笔订单是否真实支付成功，需要依赖服务端的异步通知。
//      showAlert(PayDemoActivity.this, getString(R.string.pay_success) + payResult);
                        String code = "wx_paySuccess(0)";
                        runJsCode(code);
                    } else {
                        // 该笔订单真实的支付结果，需要依赖服务端的异步通知。
                        Log.e("TAG", "handleMessage: " + payResult + msg + resultInfo);
                        String code = "wx_paySuccess(1)";
                        runJsCode(code);
                    }
                    break;
                }

                case SDK_AUTH_FLAG: {
                    @SuppressWarnings("unchecked")

                    AuthResult authResult = new AuthResult((Map<String, String>) msg.obj, true);
                    String resultStatus = authResult.getResultStatus();
                    if (TextUtils.equals(resultStatus, "9000") && TextUtils.equals(authResult.getResultCode(), "200")) {
                        Log.e("TAG", "authResult: " + authResult);
                        String code = "AliCallback(true, '";
                        code += authResult.getAuthCode();
                        code += "');";
                        runJsCode(code);

                    } else {
                        // 其他状态值则为授权失败
                        String code = "AliCallback(false, '";
                        code += "shibai";
                        code += "');";
                        runJsCode(code);
                        // showToast(String.format("授权失败"));
                    }
                    break;
                }
                default:
                    break;
            }
        }
    };

    public static void openAuthScheme() {
        if (TextUtils.isEmpty(APPID) || (TextUtils.isEmpty(RSA2_PRIVATE) && TextUtils.isEmpty(RSA_PRIVATE))) {
            //showToast(String.format(R.string.error_missing_appid_rsa_private));
            showToast(String.format("授权失败"));
            return;
        }

        boolean rsa2 = (RSA2_PRIVATE.length() > 0);
        Map<String, String> authInfoMap = OrderInfoUtil2_0.buildAuthInfoMap(PID, APPID, TARGET_ID, rsa2);
        String info = OrderInfoUtil2_0.buildOrderParam(authInfoMap);

        String privateKey = rsa2 ? RSA2_PRIVATE : RSA_PRIVATE;
        String sign = OrderInfoUtil2_0.getSign(authInfoMap, privateKey, rsa2);
        final String authInfo = info + "&" + sign;
        Runnable authRunnable = new Runnable() {

            @Override
            public void run() {
                // 构造AuthTask 对象
                AuthTask authTask = new AuthTask(app);
                // 调用授权接口，获取授权结果
                Map<String, String> result = authTask.authV2(authInfo, true);

                Message msg = new Message();
                msg.what = SDK_AUTH_FLAG;
                msg.obj = result;
                mHandler.sendMessage(msg);
            }
        };

        // 必须异步调用
        Thread authThread = new Thread(authRunnable);
        authThread.start();
    }

    //支付
    public static void alipay(final String info) {
        Log.e("TAG", "alipay======> " + info);

        final String orderInfo = info;   // 订单信息
        Runnable payRunnable = new Runnable() {
            @Override
            public void run() {
                PayTask alipay = new PayTask(app);
                Map<String, String> result = alipay.payV2(orderInfo, true);
                Message msg = new Message();
                msg.what = SDK_PAY_FLAG;
                msg.obj = result;
                mHandler.sendMessage(msg);
            }
        };
        // 必须异步调用
        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

}
