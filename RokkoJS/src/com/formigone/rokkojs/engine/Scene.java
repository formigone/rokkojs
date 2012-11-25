package com.formigone.rokkojs.engine;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.animation.client.AnimationScheduler;
import com.google.gwt.animation.client.AnimationScheduler.AnimationCallback;
import com.google.gwt.user.client.Timer;

public class Scene {
	private Renderer renderer;
	private List<Movable> movables;
	private int fps;
	private int frameDelay;
	private double tick;
	
	public Scene(Renderer renderer) {
		this.renderer = renderer;
		movables = new ArrayList<Movable>();
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
	
	public void addMovable(Movable movable) {
		movables.add(movable);
	}
	
	public void addMovable(List<Movable> movables) {
		for (Movable movable: movables)
			this.movables.add(movable);
	}
	
	public void run() {
		AnimationScheduler.get().requestAnimationFrame(new AnimationCallback() {
			
			@Override
			public void execute(double timestamp) {
				if (timestamp > tick) {
					tick = timestamp + frameDelay;
					
					updateEntities();
					render();
				}
				
				AnimationScheduler.get().requestAnimationFrame(this);
			}
		});
	}
	
	private void updateEntities() {
		for (Movable movable: movables) {
			movable.move(0, 1);
			if (movable.getSprite().getY() > renderer.getHeight())
				movable.moveTo(movable.getSprite().getX(), 0 - movable.getSprite().getHeight());
		}
	}
	
	private void render() {
		renderer.clear();
		for (Movable movable: movables)
			movable.getSprite().draw(renderer);
	}
}
