package com.formigone.rokkojs.client;

public abstract class Drawable2D implements Drawable {

	private int x;
	private int y;
	private int width;
	private int height;

	public Drawable2D(int x, int y, int width, int height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	public Drawable2D(int width, int height) {
		this(0, 0, width, height);
	}

	public Drawable2D() {
		this(0, 0, 0, 0);
	}

	public void setX(int x) {
		this.x = x;
	}

	public void setY(int y) {
		this.y = y;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	public int getWidth() {
		return width;
	}

	public int getHeight() {
		return height;
	}
}
