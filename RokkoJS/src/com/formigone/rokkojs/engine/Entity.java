package com.formigone.rokkojs.engine;

public class Entity extends Movable {

	@Override
	public void move(float x, float y) {
		sprite.addLocation(x * speedX, y * speedY);
	}
}
