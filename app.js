goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.AnimatedSprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");
goog.require("rokko.factories.SpriteFactory");
goog.require("rokko.factories.EntityFactory");

goog.require("goog.events.KeyHandler");
goog.require("goog.net.XhrIo");

var soundFX = {
    rain: new Audio("/sound/rain.mp3"),
    thunder: [
//        new Audio("/sound/thunder.mp3"),
        new Audio("/sound/thunder2.mp3"),
        new Audio("/sound/thunder3.mp3")
    ]
};
var thunder = 0;

// TODO: implement way to override component methods per instance >> maybe a simple member assign through mutator does the trick??

function main() {
    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);
    canvas.show(document.body);

    var mm = null;
    var spriteFactory = new rokko.factories.SpriteFactory();
    var entityFactory = new rokko.factories.EntityFactory(spriteFactory);

    spriteFactory.loadFromJson("/config/megaman.sprites.json", function (factory) {
        entityFactory.loadFromJson("/config/megaman.entity.json", function (factory) {
            soundFX.rain.volume = 0.5;
            soundFX.rain.play();

            mm = factory.make("megaman");
            renderer.addEntity(mm);
            _go(0);
        });
    });

    function _go(time) {
        renderer.exec(time);
        requestAnimationFrame(_go);
    }


    function doThunder(thunder) {
        var sound = soundFX.thunder[thunder];
        if (sound.paused) {
            sound.startTime = 0.00;
            sound.volume = 1.00;
            sound.play();
            renderer.bwMode = false;

            // ON
            setTimeout(function () {
                renderer.bwMode = true;
                setTimeout(function () {

                    // OFF
                    renderer.bwMode = false;
                    renderer.wonlyMode = true;

                    setTimeout(function () {

                        // ON
                        renderer.wonlyMode = false;
                        renderer.bwMode = true;

                        setTimeout(function () {

                            // OFF
                            renderer.bwMode = false;
                        }, 100);
                    }, 100);
                }, 100);
            }, 800);
        }
    }

    function keyDown(e) {
        var keyEvent = /** @type {goog.events.KeyEvent} */ (e);

        if (keyEvent.keyCode == goog.events.KeyCodes.LEFT) {
            e.preventDefault();
        }

        if (keyEvent.keyCode == goog.events.KeyCodes.UP) {
            e.preventDefault();
            if (keyEvent.shiftKey) {
                mm.sprite.setSprite("spinning", true);
            } else {
                mm.sprite.setSprite("jumping", true);
            }
        }

        if (keyEvent.keyCode == goog.events.KeyCodes.RIGHT) {
            e.preventDefault();
            if (keyEvent.shiftKey) {
                mm.sprite.setSprite("running2", true);
            } else {
                mm.sprite.setSprite("running", true);
            }
        }

        if (keyEvent.keyCode == goog.events.KeyCodes.DOWN) {
            e.preventDefault();
            mm.sprite.setSprite("standing", true);
        }

        if (keyEvent.keyCode == goog.events.KeyCodes.D) {
            e.preventDefault();
            canvas.setDebugMode(!canvas.isDebugMode());
        }

        // Demo thunder effect... obviously this is still very raw and manual... but there it is.
        if (keyEvent.keyCode == goog.events.KeyCodes.T) {
            thunder = parseInt(Math.random() * soundFX.thunder.length);
            doThunder(thunder);
        }
    };

    // TODO: Figure out how to register for onKeyUp
    function keyUp(e) {
        var keyEvent = /** @type {goog.events.KeyEvent} */ (e);
        switch (keyEvent.keyCode) {
            case goog.events.KeyCodes.UP :
            case goog.events.KeyCodes.RIGHT:
                mm.sprite.setSprite("standing", true);
                break;
        }
    };

    var keyHandler = new goog.events.KeyHandler(document.body);
    goog.events.listen(keyHandler, goog.events.KeyHandler.EventType.KEY, keyDown);
}

goog.exportSymbol("main", main);
