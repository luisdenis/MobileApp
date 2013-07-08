/**
 * 
 * Phonegap share plugin for Android
 * Kevin Schaul 2011
 *
 */

package com.schaul.plugins.share;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.util.Log;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;



public class Share extends Plugin {

	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		try {
	       
			JSONObject jo = args.getJSONObject(0);
			
			if(jo.getString("sms").equals("false")){
			doSendIntent(jo.getString("subject"), jo.getString("text"));
			}else{
				sendSMS(jo.getString("text"));
			} 
			
			return new PluginResult(PluginResult.Status.OK);
		} catch (JSONException e) {
			return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
		}
	}
	
	private void doSendIntent(String subject, String text) {
		Intent sendIntent = new Intent(Intent.ACTION_VIEW);
        sendIntent.putExtra("sms_body", ""+text); 
        sendIntent.setType("vnd.android-dir/mms-sms");
        this.ctx.startActivity(sendIntent);	   
	}
	
	private void sendSMS(String message) {
		Intent sendIntent = new Intent(Intent.ACTION_VIEW);
        sendIntent.putExtra("sms_body", "Minuto a minuto de Beisbol Movilnet: "+message); 
        sendIntent.setType("vnd.android-dir/mms-sms");
        this.ctx.startActivity(sendIntent);	   
	}

	
	
	
	
}