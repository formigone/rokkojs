package com.formigone.rokkojs.engine;

import com.google.gwt.canvas.dom.client.Context2d;
import com.google.gwt.dom.client.ImageElement;
import com.google.gwt.user.client.ui.Image;

public class Sprite2D extends Drawable {

	private ImageElement texture;
	private boolean isTextureReady;
	private Context2d ctx;

	public Sprite2D(Image texture) {
		this(texture, 0, 0);
	}
	
	public Sprite2D(Image texture, float x, float y) {
		this.x = x;
		this.y = y;
		this.texture = ImageElement.as(texture.getElement());
		ctx = null;
	}

	public boolean isReady() {
		return isTextureReady;
	}

	@Override
	public void draw(Renderer renderer) {
		if (ctx == null)
			ctx = (Context2d) renderer.getRenderer();

		ctx.drawImage(texture, x, y);
	}
}
