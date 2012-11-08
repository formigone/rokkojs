package com.formigone.rokkojs.client;

import com.google.gwt.animation.client.AnimationScheduler;
import com.google.gwt.animation.client.AnimationScheduler.AnimationCallback;

public class Scene {
	private Movable2D movable;
	private Renderer renderer;

	public void setMovables(Movable2D drawables) {
		this.movable = drawables;
	}

	public void setRenderer(Renderer renderer) {
		this.renderer = renderer;
	}

	public void onRender() {
		System.out.println("Rendering scene");
		renderer.render(movable);
	}
	
	public void render() {
		System.out.println("Render called on Scene");
		
		AnimationScheduler.get().requestAnimationFrame(new AnimationCallback() {
			
			@Override
			public void execute(double timestamp) {
				onRender();
				movable.updatePosition();
				AnimationScheduler.get().requestAnimationFrame(this);
			}
		});
	}
}
