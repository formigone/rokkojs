package com.formigone.rokkojs.client;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.animation.client.AnimationScheduler;
import com.google.gwt.animation.client.AnimationScheduler.AnimationCallback;

public class Scene {
	private List<Movable2D> movable;
	private Renderer renderer;
	
	public Scene() {
		movable = new ArrayList<Movable2D>();
	}

	public void setMovables(Movable2D drawables) {
		movable.add(drawables);
	}

	public void setRenderer(Renderer renderer) {
		this.renderer = renderer;
	}

	public void onRender() {
		System.out.println("Rendering scene");
		for (Movable2D entity: movable) {
			renderer.render(entity);
		}
	}
	
	public void render() {
		System.out.println("Render called on Scene");
		
		AnimationScheduler.get().requestAnimationFrame(new AnimationCallback() {
			
			@Override
			public void execute(double timestamp) {
				onRender();
				for (Movable2D entity: movable) {
					entity.updatePosition();
				}

				AnimationScheduler.get().requestAnimationFrame(this);
			}
		});
	}
}
