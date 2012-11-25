package com.formigone.rokkojs.engine;

public class Entity extends Movable {

	public Entity(Drawable sprite) {
		super(sprite);
	}
	
	public Entity(Drawable sprite, int speedX, int speedY) {
		super(sprite, speedX, speedY);
	}

	@Override
	public void move(float x, float y) {
		sprite.addLocation(x * speedX, y * speedY);
	}
}
