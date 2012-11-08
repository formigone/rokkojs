package com.formigone.rokkojs.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.event.dom.client.KeyDownEvent;
import com.google.gwt.event.dom.client.KeyDownHandler;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;
import com.google.gwt.user.client.ui.RootPanel;

public class Main implements EntryPoint {

	private Movable2D square;
	private Renderer2D renderer;
	private Scene scene;

	public void onModuleLoad() {
		square = new Square(50, 50);
		renderer = new Renderer2D(800, 300);
		scene = new Scene();
		scene.setRenderer(renderer);
		scene.setMovables(square);

		RootPanel.get().add(this.renderer.getCanvasElement());

		RootPanel.get().addDomHandler(new KeyDownHandler(){

			@Override
			public void onKeyDown(KeyDownEvent event) {
				square.setKeyPressed(event.getNativeKeyCode());
			}
			
		}, KeyDownEvent.getType());
		
		RootPanel.get().addDomHandler(new KeyUpHandler(){

			@Override
			public void onKeyUp(KeyUpEvent event) {
				square.setKeyReleased(event.getNativeKeyCode());
			}
			
		}, KeyUpEvent.getType());
		
		scene.render();
	}
}
