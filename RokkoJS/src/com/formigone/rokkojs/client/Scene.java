package com.formigone.rokkojs.client;

import com.google.gwt.core.client.GWT;

public class Scene {
	private Drawable drawable;
	private Renderer renderer;

	public void setDrawables(Drawable drawables) {
		this.drawable = drawables;
	}

	public void setRenderer(Renderer renderer) {
		this.renderer = renderer;
	}

	public void render() {
		GWT.log("Rendering scene");
		renderer.render(drawable);
	}
}
