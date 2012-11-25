package com.formigone.rokkojs.engine;

interface Renderer {
	public int getWidth();
	public int getHeight();
	public Object getRenderer();
	public void clear();
	public void clear(int x, int y, int width, int height);
}
