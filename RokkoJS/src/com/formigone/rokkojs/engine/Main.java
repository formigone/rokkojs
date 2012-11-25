package com.formigone.rokkojs.engine;

import com.google.gwt.canvas.client.Canvas;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.ui.RootPanel;

public class Main implements EntryPoint {

	private Scene scene;
	private Renderer renderer;
	private SampleDrawable entity;

	@Override
	public void onModuleLoad() {
		
		Canvas canvas = Canvas.createIfSupported();
		canvas.setCoordinateSpaceWidth(1600 / 2);
		canvas.setCoordinateSpaceHeight(900 / 2);
		
		entity = new SampleDrawable();

		renderer = new Renderer2D(canvas);
		scene = new Scene(renderer);
		scene.setFps(2);
		scene.addDrawable(entity);

		RootPanel.get().add(canvas);
		
		scene.run();
	}
}
