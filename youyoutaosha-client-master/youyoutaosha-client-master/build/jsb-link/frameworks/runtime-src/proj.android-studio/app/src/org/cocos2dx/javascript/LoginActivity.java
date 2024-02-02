package org.cocos2dx.javascript;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Toast;


import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;

import cn.leshufang.cocos.R;

public class LoginActivity extends Activity {
    private String tag = "LoginActivity";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initLoginView();
    }

    /**
     * 跳转到主页面
     */
    private void goToMainActivity() {
        Intent intent = new Intent(LoginActivity.this, AppActivity.class);
        startActivity(intent);
        this.finish();
    }

    protected void setYszcView() {

        setContentView(R.layout.yszc_layer);
        Button close = findViewById(R.id.yszc_close);
        close.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                initLoginView();
            }
        });
    }

    protected void setYhxyView() {

        setContentView(R.layout.yhxy_layer);
        Button close = findViewById(R.id.yhxy_close);
        close.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                initLoginView();
            }
        });
    }

    private Boolean inCheck = false;

    protected void initLoginView() {
        try {
            SharedPreferences preferences = getSharedPreferences("data", MODE_PRIVATE);
            String value = preferences.getString("skip", null);
            if (value != null) {
                goToMainActivity();
                return;
            }

        } catch (Exception e)// 捕获异常，如果要捕获Json数据异常，写catch(JSONException e)
        {


        }
        setContentView(R.layout.login_layer);
        Button yhxy = findViewById(R.id.yhxy);
        signYhxyClick(yhxy);
        Button yszc = findViewById(R.id.yszc);
        signYszcClick(yszc);
        Button enter = findViewById(R.id.enter_game);
        signEnterGameClick(enter);
    }


    protected void signEnterGameClick(Button btn) {
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onClickEnterGame();
            }
        });
    }

    /**
     * 点击进入游戏
     */
    protected void onClickEnterGame() {
        CheckBox cb = findViewById(R.id.checkBox);
        if (cb.isChecked()) {
            //跳转到游戏场景
            @SuppressLint("WrongConstant") SharedPreferences sharedPreferences = getSharedPreferences("data", MODE_PRIVATE);//xml
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString("skip", "ok");
            boolean bol = editor.commit();
            goToMainActivity();
        } else {
            Toast.makeText(this, "请阅读《用户协议》和《隐私策略》后勾选同意", Toast.LENGTH_SHORT).show();
        }
    }

    protected void signYhxyClick(Button yhxy) {
        yhxy.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stringLog("点击用户协议按钮");
                setYhxyView();
            }
        });
    }

    protected void signYszcClick(Button yszc) {
        yszc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stringLog("点击隐私政策按钮");
                setYszcView();
            }
        });
    }

    protected void stringLog(String log) {
        Log.e(tag, log);
    }
}
