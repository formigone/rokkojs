package com.formigone.rokkojs.engine;

abstract class Drawable {
	protected float x;
	protected float y;
	protected int width;
	protected int height;
	
	public Drawable() {
		this(0, 0, 50, 50);
	}

	public Drawable(float x, float y, int width, int height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	
	public abstract void draw(Renderer renderer);
	
	public float getX() {
		return x;
	}

	public void setX(float x) {
		this.x = x;
	}

	public float getY() {
		return y;
	}

	public void setY(float y) {
		this.y = y;
	}
	
	public void addX(float x) {
		this.x += x;
	}
	
	public void addY(float y) {
		this.y += y;
	}
	
	public void addLocation(float x, float y) {
		this.x += x;
		this.y += y;
	}
	
	public void setLocation(float x, float y) {
		this.x = x;
		this.y = y;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}
}
