package com.example.picontrol;

import android.support.v7.app.ActionBarActivity;
import android.view.KeyEvent;
import android.view.Window;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.os.Bundle;

public class MainActivity extends ActionBarActivity {
	
	private WebView myWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    	//Remove title bar
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        myWebView = (WebView) findViewById(R.id.webview);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.loadUrl("http://project1.hansott.be/overview.html");
        myWebView.setWebViewClient(new WebViewClients());
    }
    
    private class WebViewClients extends WebViewClient {
    	@Override
    	public boolean shouldOverrideUrlLoading(WebView webview, String url) {
    		webview.loadUrl(url);
    		return true;
    	}    	
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event){
    	if((keyCode == KeyEvent.KEYCODE_BACK) && myWebView.canGoBack()){
    		myWebView.goBack();
    		return true;
    	}
    	return super.onKeyDown(keyCode, event);
    }
    
}
