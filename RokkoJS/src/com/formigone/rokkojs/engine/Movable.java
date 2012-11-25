package com.formigone.rokkojs.engine;

abstract class Movable {
	// TODO: replace this madness with a physics object (speed, weight, etc.)
	protected int speedX;
	protected int speedY;
	protected Drawable sprite;

	public Movable() {
		this(10, 10);
	}
	
	public Movable(int speedX, int speedY) {
		this.speedX = speedX;
		this.speedY = speedY;
	}
	
	public Drawable getSprite() {
		return sprite;
	}

	public abstract void move(float x, float y);
}
