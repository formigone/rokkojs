package com.formigone.rokkojs.client;

import com.google.gwt.core.client.GWT;

public class Renderer2D implements Renderer {

	@Override
	public void render(Drawable drawable) {
		GWT.log("Rendering with my Renderer2D");
	}

}
