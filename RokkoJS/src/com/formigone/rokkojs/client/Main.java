package com.formigone.rokkojs.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.event.dom.client.KeyDownEvent;
import com.google.gwt.event.dom.client.KeyDownHandler;
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

		RootPanel.get().addDomHandler(new KeyDownHandler(){

			@Override
			public void onKeyDown(KeyDownEvent event) {

				switch (event.getNativeKeyCode()) {
				case KeyCodes.KEY_LEFT:
					moveSquare(-10, 0);
					break;
				case KeyCodes.KEY_RIGHT:
					moveSquare(10, 0);
					break;
				case KeyCodes.KEY_UP:
					moveSquare(0, -10);
					break;
				case KeyCodes.KEY_DOWN:
					moveSquare(0, 10);
					break;
				}
			}
			
		}, KeyDownEvent.getType());
		
		scene.render();
	}

	public void moveSquare(int x, int y) {
		square.setX(square.getX() + x);
		square.setY(square.getY() + y);
		
		System.out.println("Moved square by (" + x + ", " + y + ")");
		scene.render();
	}
}
