package com.javacodegeeks.android.lbs;


import java.io.IOException;
import java.text.DecimalFormat;
import java.text.NumberFormat;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class ProxAlertActivity extends Activity {
	
	
	private static final long MINIMUM_DISTANCECHANGE_FOR_UPDATE = 0; // in Meters
	private static final long MINIMUM_TIME_BETWEEN_UPDATE = 10000; // in Milliseconds
	
	private boolean inArea = false;
	private boolean outArea = false;
	
	private static final String POINT_LATITUDE_KEY = "POINT_LATITUDE_KEY";
	private static final String POINT_LONGITUDE_KEY = "POINT_LONGITUDE_KEY";
	
	
	private static final NumberFormat nf = new DecimalFormat("##.########");
	
	private LocationManager locationManager;
	
	private EditText latitudeEditText;
	private EditText longitudeEditText;
	private Button findCoordinatesButton;
	private Button savePointButton;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        locationManager.requestLocationUpdates(
                		LocationManager.GPS_PROVIDER, 
                		MINIMUM_TIME_BETWEEN_UPDATE, 
                		MINIMUM_DISTANCECHANGE_FOR_UPDATE,
                		new MyLocationListener()
        );
        
        latitudeEditText = (EditText) findViewById(R.id.point_latitude);
        longitudeEditText = (EditText) findViewById(R.id.point_longitude);
        findCoordinatesButton = (Button) findViewById(R.id.find_coordinates_button);
        savePointButton = (Button) findViewById(R.id.save_point_button);
        
        findCoordinatesButton.setOnClickListener(new OnClickListener() {			
			@Override
			public void onClick(View v) {
				populateCoordinatesFromLastKnownLocation();
			}
		});
        
        savePointButton.setOnClickListener(new OnClickListener() {			
			@Override
			public void onClick(View v) {
				saveProximityAlertPoint();
			}
		});
        //postData();
       
    }
    
    private void saveProximityAlertPoint() {
    	Location location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
    	if (location==null) {
    		Toast.makeText(this, "No last known location. Aborting...", Toast.LENGTH_LONG).show();
    		return;
    	}
    	saveCoordinatesInPreferences((float)location.getLatitude(), (float)location.getLongitude());
	}

	private void populateCoordinatesFromLastKnownLocation() {
    	Location location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
    	if (location!=null) {
    		latitudeEditText.setText(nf.format(location.getLatitude()));
    		longitudeEditText.setText(nf.format(location.getLongitude()));
    	}
    }
    
    private void saveCoordinatesInPreferences(float latitude, float longitude) {
    	SharedPreferences prefs = this.getSharedPreferences(getClass().getSimpleName(), Context.MODE_PRIVATE);
    	SharedPreferences.Editor prefsEditor = prefs.edit();
    	prefsEditor.putFloat(POINT_LATITUDE_KEY, latitude);
    	prefsEditor.putFloat(POINT_LONGITUDE_KEY, longitude);
    	prefsEditor.commit();
    	Toast.makeText(ProxAlertActivity.this, 
				"Coördinates have been saved: lat: " + latitude + "long: " + longitude , Toast.LENGTH_LONG).show();
    }
    
    private Location retrievelocationFromPreferences() {
    	SharedPreferences prefs = this.getSharedPreferences(getClass().getSimpleName(), Context.MODE_PRIVATE);
    	Location location = new Location("POINT_LOCATION");
    	location.setLatitude(prefs.getFloat(POINT_LATITUDE_KEY, 0));
    	location.setLongitude(prefs.getFloat(POINT_LONGITUDE_KEY, 0));
    	return location;
    }
    
    public class MyLocationListener implements LocationListener {
    	public void onLocationChanged(Location location) {
    		Location pointLocation = retrievelocationFromPreferences();
    		float distance = location.distanceTo(pointLocation);
    		Toast.makeText(ProxAlertActivity.this, 
    				"Distance from Point:"+distance, Toast.LENGTH_LONG).show();
    		
    	  	if(distance < 4 && !inArea){
    	  		inArea = true;
    	  		outArea = false;
    	   		
    	   		    DefaultHttpClient httpClient = new DefaultHttpClient();
    	   		    HttpGet httpGet = new HttpGet("http://192.168.0.163:8080/pins/allon");
    	   		    HttpResponse httpResponse = null;
					try {
						httpResponse = httpClient.execute(httpGet);
	    	   		    HttpEntity httpEntity = httpResponse.getEntity();

					} catch (ClientProtocolException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}	
					return;
    	  	}
    	  	else if(distance > 4 && !outArea){
    	  		inArea = false;
    	  		outArea = true;
    	   		
	   		    DefaultHttpClient httpClient = new DefaultHttpClient();
	   		    HttpGet httpGet = new HttpGet("http://192.168.0.163:8080/pins/alloff");
	   		    HttpResponse httpResponse = null;
				try {
					httpResponse = httpClient.execute(httpGet);
    	   		    HttpEntity httpEntity = httpResponse.getEntity();

				} catch (ClientProtocolException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	   		   	  		
    	  	}
    	  	
    	}
    	public void onStatusChanged(String s, int i, Bundle b) {			
    	}
    	public void onProviderDisabled(String s) {
    	}
    	public void onProviderEnabled(String s) {			
    	}
    }
}