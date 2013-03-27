package com.formigone.rokkojs.map.res.tiled;

import com.google.gwt.resources.client.ClientBundle;
import com.google.gwt.resources.client.ImageResource;
import com.google.gwt.resources.client.TextResource;

public interface Resources extends ClientBundle {

	@Source("rgb-map.json")
	TextResource getMap();

	@Source("rgb-tiles.png")
	ImageResource getTiles();
}
