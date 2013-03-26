package com.formigone.rokkojs.map.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONParser;
import com.google.gwt.json.client.JSONString;
import com.google.gwt.json.client.JSONValue;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.RootPanel;

public class Main implements EntryPoint {

	@Override
	public void onModuleLoad() {
		String json = "{\"name\":\"Rodrigo\"}";
		Label label = new Label(json);
		RootPanel.get().add(label);

		JSONValue val = JSONParser.parseStrict(json);
		JSONObject obj = val.isObject();

		JSONString name = obj.get("name").isString();
		label.setText(name.stringValue());
	}
}
