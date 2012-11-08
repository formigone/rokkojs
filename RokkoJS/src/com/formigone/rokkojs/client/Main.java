package com.formigone.rokkojs.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.ui.RootPanel;

public class Main implements EntryPoint {

	private Drawable2D square;
	private Renderer2D renderer;
	private Scene scene;

	public void onModuleLoad() {
		square = new Square(50, 50);
		renderer = new Renderer2D(800, 300);
		scene = new Scene();
		scene.setRenderer(renderer);
		scene.setDrawables(square);

		RootPanel.get().add(this.renderer.getCanvasElement());
		
		scene.render();
	}
}
