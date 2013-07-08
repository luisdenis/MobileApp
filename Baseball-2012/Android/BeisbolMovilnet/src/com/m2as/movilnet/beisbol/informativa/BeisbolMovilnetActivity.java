package com.m2as.movilnet.beisbol.informativa;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.DroidGap;

public class BeisbolMovilnetActivity extends DroidGap {
    /** Called when the activity is first created. */
	  @Override
	    public void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        super.setIntegerProperty("splashscreen", R.drawable.logo_promo);
	        super.loadUrl("file:///android_asset/www/index.html",10000000);
	    }
}

