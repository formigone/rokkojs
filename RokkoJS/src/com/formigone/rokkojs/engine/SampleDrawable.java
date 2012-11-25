package com.formigone.rokkojs.engine;

import com.google.gwt.canvas.dom.client.Context2d;
import com.google.gwt.user.client.Random;

public class SampleDrawable extends Drawable {

	@Override
	public void draw(Renderer renderer) {
		int x = Random.nextInt(renderer.getWidth());
		int y = Random.nextInt(renderer.getHeight());
		
		Context2d ctx = (Context2d)(renderer.getRenderer());
		ctx.clearRect(0, 0, renderer.getWidth(), renderer.getHeight());
		ctx.fillRect(x, y, getWidth(), getHeight());
	}
}
