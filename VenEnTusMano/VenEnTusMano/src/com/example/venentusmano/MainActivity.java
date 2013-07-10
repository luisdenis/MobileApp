package com.example.venentusmano;

import org.apache.cordova.DroidGap;

import com.m2as.movilnet.beisbol.informativa.R;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

public class MainActivity extends DroidGap {
	/** Called when the activity is first created. */
	  @Override
	    public void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        super.setIntegerProperty("splashscreen", R.drawable.logo_promo);
	        super.loadUrl("file:///android_asset/www/index.html",10000000);
	    }

}
