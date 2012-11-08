package com.formigone.rokkojs.client;

public abstract class Movable2D implements Drawable {

	private int x;
	private int y;
	private int width;
	private int height;
	
	private final int MOVE_BY = 10;
	
	private boolean isLeftPressed;
	private boolean isRightPressed;
	private boolean isUpPressed;
	private boolean isDownPressed;

	public Movable2D(int x, int y, int width, int height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		
		isLeftPressed = false;
		isRightPressed = false;
		isUpPressed = false;
		isDownPressed = false;
	}

	public Movable2D(int width, int height) {
		this(0, 0, width, height);
	}

	public Movable2D() {
		this(0, 0, 0, 0);
	}
	
	public void moveBy(int x, int y) {
		this.x += x;
		this.y += y;
	}
	
	public void moveTo(int x, int y) {
		this.x = x;
		this.y = y;
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

	public void updatePosition() {
		if (isLeftPressed)
			x -= MOVE_BY;
		if (isRightPressed)
			x += MOVE_BY;
		if (isDownPressed)
			y += MOVE_BY;
		if (isUpPressed)
			y -= MOVE_BY;
	}
	
	public void setKeyPressed(int keyCode) {
		if (keyCode == KeyCodes.KEY_LEFT)
			isLeftPressed = true;
		if (keyCode == KeyCodes.KEY_RIGHT)
			isRightPressed = true;
		if (keyCode == KeyCodes.KEY_UP)
			isUpPressed = true;
		if (keyCode == KeyCodes.KEY_DOWN)
			isDownPressed = true;
	}
	
	public void setKeyReleased(int keyCode) {
		if (keyCode == KeyCodes.KEY_LEFT)
			isLeftPressed = false;
		if (keyCode == KeyCodes.KEY_RIGHT)
			isRightPressed = false;
		if (keyCode == KeyCodes.KEY_UP)
			isUpPressed = false;
		if (keyCode == KeyCodes.KEY_DOWN)
			isDownPressed = false;
	}
}
