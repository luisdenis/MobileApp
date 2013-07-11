package com.blve.movilnet.trivia;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

public class TriviaMainActivity extends DroidGap {

	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //super.setIntegerProperty("splashscreen", R.drawable.ic_launcher);
        super.loadUrl("file:///android_asset/www/index.html",10000000);
    }
	

}
