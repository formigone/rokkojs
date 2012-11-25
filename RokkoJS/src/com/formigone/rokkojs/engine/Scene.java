package com.formigone.rokkojs.engine;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.animation.client.AnimationScheduler;
import com.google.gwt.animation.client.AnimationScheduler.AnimationCallback;

public class Scene {
	private Renderer renderer;
	private List<Drawable> drawables;
	private int fps;
	private int frameDelay;
	private double tick;
	
	public Scene(Renderer renderer) {
		this.renderer = renderer;
		drawables = new ArrayList<Drawable>();
		fps = 20;
		tick = 0;
		setFrameDelay();
	}
	
	private void setFrameDelay() {
		frameDelay = 1000 / fps;
	}
	
	public void setFps(int fps) {
		this.fps = fps;
		setFrameDelay();
	}
	
	public void addDrawable(Drawable drawable) {
		drawables.add(drawable);
	}
	
	public void run() {
		System.out.println("Running");

		AnimationScheduler.get().requestAnimationFrame(new AnimationCallback() {
			
			@Override
			public void execute(double timestamp) {
				if (timestamp > tick) {
					tick = timestamp + frameDelay;
					
					render();
				}
				
				AnimationScheduler.get().requestAnimationFrame(this);
			}
		});
	}
	
	private void render() {
		for (Drawable drawable: drawables) {
			drawable.draw(renderer);
		}
	}
}
