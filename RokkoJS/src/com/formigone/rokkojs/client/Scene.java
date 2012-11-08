package com.formigone.rokkojs.client;

import com.google.gwt.core.client.GWT;

public class Scene {
	private Drawable drawables;
	private Renderer renderer;

	public void setDrawables(Drawable drawables) {
		this.drawables = drawables;
	}

	public void setRenderer(Renderer renderer) {
		this.renderer = renderer;
	}

	public void render() {
		GWT.log("Rendering scene");
	}
}
