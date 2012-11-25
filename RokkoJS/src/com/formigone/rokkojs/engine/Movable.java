package com.formigone.rokkojs.engine;

abstract class Movable {
	// TODO: replace this madness with a physics object (speed, weight, etc.)
	protected int speedX;
	protected int speedY;
	protected Drawable sprite;

	public Movable(Drawable sprite) {
		this(sprite, 10, 10);
	}
	
	public Movable(Drawable sprite, int speedX, int speedY) {
		this.sprite = sprite;
		this.speedX = speedX;
		this.speedY = speedY;
	}
	
	public Drawable getSprite() {
		return sprite;
	}

	public abstract void move(float x, float y);
	public void moveTo(float x, float y) {
		sprite.setX(x);
		sprite.setY(y);
	}
}
