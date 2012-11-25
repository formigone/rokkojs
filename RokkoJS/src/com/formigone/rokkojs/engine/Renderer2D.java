package com.formigone.rokkojs.engine;

import com.google.gwt.canvas.client.Canvas;
import com.google.gwt.canvas.dom.client.Context2d;

public class Renderer2D implements Renderer {
	@Override
	public void clear() {
		clear(0, 0, canvas.getCanvasElement().getWidth(), canvas.getCanvasElement().getHeight());
	}

	@Override
	public void clear(int x, int y, int width, int height) {
		ctx.clearRect(x, y, width, height);
	}

	private Canvas canvas;
	private Context2d ctx;
	
	public Renderer2D(Canvas canvas) {
		this.canvas = canvas;
		ctx = canvas.getContext2d();
	}

	public Canvas getCanvas() {
		return canvas;
	}

	public Object getRenderer() {
		return ctx;
	}

	@Override
	public int getWidth() {
		return canvas.getCanvasElement().getWidth();
	}

	@Override
	public int getHeight() {
		return canvas.getCanvasElement().getHeight();
	}
}
