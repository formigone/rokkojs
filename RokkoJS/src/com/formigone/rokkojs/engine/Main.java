package com.formigone.rokkojs.engine;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.canvas.client.Canvas;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.LoadEvent;
import com.google.gwt.event.dom.client.LoadHandler;
import com.google.gwt.user.client.Random;
import com.google.gwt.user.client.ui.Image;
import com.google.gwt.user.client.ui.RootPanel;

public class Main implements EntryPoint {

	private Scene scene;
	private Renderer renderer;
	private List<Movable> entities;
	private List<Image> textures;
	private int resourcesReady;

	private List<String> sprites = new ArrayList<String>();
	
	@Override
	public void onModuleLoad() {
		sprites.add("img/sprites/megaman-jump.png");
		sprites.add("img/sprites/megaman-jump-shoot.png");
		sprites.add("img/sprites/mario-jump.png");
		sprites.add("img/sprites/luigi-jump.png");
		
		resourcesReady = 0;
		
		Canvas canvas = Canvas.createIfSupported();
		canvas.setCoordinateSpaceWidth(1600 / 2);
		canvas.setCoordinateSpaceHeight(900 / 2);

		textures = new ArrayList<Image>();
		
		for (int tI = 0; tI < sprites.size(); tI++) {
			textures.add(new Image(GWT.getModuleBaseURL() + sprites.get(tI)));
			RootPanel.get("imgShelf").add(textures.get(tI));

			textures.get(tI).addLoadHandler(new LoadHandler() {
	
				@Override
				public void onLoad(LoadEvent event) {
					resourcesReady++;
					runIfReady();
				}
			});
		}

		entities = new ArrayList<Movable>();
		
		for (int i = 0; i < 25; i++) {
			entities.add(new Entity(new Sprite2D(textures.get(Random.nextInt(textures.size())), 
					Random.nextInt(canvas.getCanvasElement().getWidth()),
					Random.nextInt(canvas.getCanvasElement().getHeight())),
					Random.nextInt(20) + 5,
					Random.nextInt(20) + 5
					));
		}

		renderer = new Renderer2D(canvas);
		scene = new Scene(renderer);
		scene.setFps(30);
		scene.addMovable(entities);

		RootPanel.get().add(canvas);
	}

	private void runIfReady() {
		if (resourcesReady == textures.size())
			scene.run();
	}
}
