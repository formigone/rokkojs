package com.formigone.rokkojs.map.client;

import com.formigone.rokkojs.map.res.tiled.Resources;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.json.client.JSONNumber;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONParser;
import com.google.gwt.json.client.JSONString;
import com.google.gwt.json.client.JSONValue;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.RootPanel;

public class Main implements EntryPoint {

	@Override
	public void onModuleLoad() {
		Resources R = GWT.create(Resources.class);

		String json = "{\"name\":\"Rodrigo\"}";
		Label label = new Label(json);
		RootPanel.get().add(label);

		JSONValue val = JSONParser.parseStrict(json);
		JSONObject obj = val.isObject();

		JSONString name = obj.get("name").isString();
		label.setText(name.stringValue());

		Label map = new Label();
		map.getElement().getStyle().setProperty("whiteSpace", "pre");
		map.getElement().getStyle().setProperty("padding", "10px");
		map.getElement().getStyle().setProperty("border", "5px solid #ddd");
		map.getElement().getStyle().setProperty("background", "#111");
		map.getElement().getStyle().setProperty("color", "#fff");
		map.getElement().getStyle().setProperty("fontFamily", "monospace");
		map.getElement().getStyle().setProperty("fontSize", "18px");
		map.setText(R.getMap().getText());
		RootPanel.get().add(map);

		Label node = new Label();
		JSONValue jMap = JSONParser.parseStrict(R.getMap().getText());
		int height = new Double(jMap.isObject().get("width").isNumber().doubleValue()).intValue();
		node.setText("width: " + height);
		RootPanel.get().add(node);
	}
}
