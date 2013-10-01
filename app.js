goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.AnimatedSprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");

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

// TODO: create objects to manage this life cycle. Maybe we first check if the config file is cached. If not, fetch it. Once fetched, run overloaded exec method (**Component** ??) and load everyone, and do whatever is needed with them
function genSprite(type, name, cb) {
    var url = "/config/genSprite.php?type=";

    goog.net.XhrIo.send(url + type, function(e){
        var response = e.target.getResponseText();
        var data = JSON.parse(response);

        var img = new rokko.graphics.SequencedImage(data[name].img, {
            frames: data[name].frames,
            freq: data[name].freq,
            currFrame: data[name].currFrame
        });

        var sprite = new rokko.graphics.Sprite(img);
        cb(sprite);
    });
}

function main(){
    var standing = new rokko.graphics.SequencedImage("/img/8bitmm.gif", {
        frames: [
            {
                pos: {
                    x: 105,
                    y: 11
                },
                size: {
                    w: 21,
                    h: 24
                },
                freq: 1500
            },
            {
                pos: {
                    x: 135,
                    y: 11
                },
                size: {
                    w: 21,
                    h: 24
                },
                freq: 100
            },
            {
                pos: {
                    x: 105,
                    y: 11
                },
                size: {
                    w: 21,
                    h: 24
                },
                freq: 1500
            }
        ],
        freq: 100,
        currFrame: 0
    });

    var running = new rokko.graphics.SequencedImage("/img/8bitmm.gif", {
        frames: [
            {
                pos: {
                    x: 190,
                    y: 11
                },
                size: {
                    w: 24,
                    h: 24
                },
                freq: 100
            },
            {
                pos: {
                    x: 220,
                    y: 11
                },
                size: {
                    w: 16,
                    h: 24
                },
                freq: 100
            },
            {
                pos: {
                    x: 241,
                    y: 11
                },
                size: {
                    w: 21,
                    h: 24
                },
                freq: 100
            }
        ],
        freq: 110,
        currFrame: 0
    });

    var running2 = new rokko.graphics.SequencedImage("/img/8bitmm.gif", {
        frames: [
            {
                pos: {
                    x: 144,
                    y: 269
                },
                size: {
                    w: 24,
                    h: 25
                },
                freq: 100
            },
            {
                pos: {
                    x: 174,
                    y: 269
                },
                size: {
                    w: 17,
                    h: 25
                },
                freq: 100
            },
            {
                pos: {
                    x: 197,
                    y: 269
                },
                size: {
                    w: 22,
                    h: 25
                },
                freq: 100
            }
        ],
        freq: 110,
        currFrame: 0
    });

    var spinning = new rokko.graphics.SequencedImage("/img/8bitmm.gif", {
        frames: [
            {
                pos: {
                    x: 267,
                    y: 4
                },
                size: {
                    w: 26,
                    h: 31
                },
                freq: 75
            },
            {
                pos: {
                    x: 241,
                    y: 154
                },
                size: {
                    w: 21,
                    h: 31
                },
                freq: 75
            },
            {
                pos: {
                    x: 268,
                    y: 154
                },
                size: {
                    w: 26,
                    h: 31
                },
                freq: 75
            },
            {
                pos: {
                    x: 298,
                    y: 154
                },
                size: {
                    w: 22,
                    h: 31
                },
                freq: 75
            }
        ],
        freq: 100,
        currFrame: 0
    });

    var jumping = new rokko.graphics.SequencedImage("/img/8bitmm.gif", {
        frames: [
            {
                pos: {
                    x: 267,
                    y: 4
                },
                size: {
                    w: 26,
                    h: 31
                },
                freq: 100
            }
        ],
        freq: 100,
        currFrame: 0
    });

    var sprites = {
        standing: new rokko.graphics.Sprite(standing),
        running: new rokko.graphics.Sprite(running),
        running2: new rokko.graphics.Sprite(running2),
        jumping: new rokko.graphics.Sprite(jumping),
        spinning: new rokko.graphics.Sprite(spinning)
    };

    var animFrames = {
        0: new rokko.graphics.Sprite(running),
        1: new rokko.graphics.Sprite(running2),
        2: new rokko.graphics.Sprite(standing),
        3: new rokko.graphics.Sprite(jumping),
        4: new rokko.graphics.Sprite(spinning)
    };

    var animSprites = new rokko.graphics.AnimatedSprite({
        defaultFrame: 0,
        sprites: animFrames
    });

    var animSprites2 = new rokko.graphics.AnimatedSprite({
        defaultFrame: 2,
        sprites: animFrames
    });

    var hero2 = new rokko.entities.Entity({x: 300, y: 150}, {w: null, h: null, s: 3.5}, sprites.running);
    var hero3 = new rokko.entities.Entity({x: 450, y: 150}, {w: null, h: null, s: 3.5}, sprites.jumping);
    var hero4 = new rokko.entities.Entity({x: 450, y: 300}, {w: null, h: null, s: 3.5}, sprites.spinning);
    var hero5 = new rokko.entities.Entity({x: 300, y: 300}, {w: null, h: null, s: 3.5}, animSprites);
    var hero6 = new rokko.entities.Entity({x: 600, y: 200}, {w: null, h: null, s: 5.0}, animSprites2);

    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);

    canvas.setDebugMode(true);
    canvas.show(document.body);

    genSprite('demo', 'standing', func);

    renderer.addEntity(hero2);
    renderer.addEntity(hero3);
    renderer.addEntity(hero4);
    renderer.addEntity(hero5);
    renderer.addEntity(hero6);

    (function chg(){
        var rnd = parseInt(Math.random() * 5);
        hero5.sprite.setSprite(rnd);
        setTimeout(function(){
            chg();
        }, 2500);
    })();


    var EntityBehavior = function(){
        goog.base(this, goog.events.EventTarget);
    };
    goog.inherits(EntityBehavior, goog.events.EventTarget);

    // TODO: dispatch an actual event object, then let the listener handle this conditional logic
    EntityBehavior.prototype.key = function(e) {
        var key = e.keyCode;

        if (key == 37) {
            e.preventDefault();
            hero6.sprite.setSprite(2);
        }

        if (key == 38) {
            e.preventDefault();
            hero6.sprite.setSprite(3, true);
        }

        if (key == 39) {
            e.preventDefault();
            hero6.sprite.setSprite(0);
        }

        if (key == 40) {
            e.preventDefault();
            hero6.sprite.setSprite(4, true);
        }

        if (key == 68 /* D */) {
            canvas.setDebugMode(!canvas.isDebugMode());
        }

        // Demo thunder effect... obviously this is still very raw and manual... but there it is.
        if (key == 84 /* T */) {
            doThunder(thunder);
        }

        this.dispatchEvent(EntityBehavior.EventTYpe.KEY);
    };

    EntityBehavior.EventTYpe = {
        KEY: goog.events.getUniqueId('key')
    };

    var entityBeh = new EntityBehavior();
    entityBeh.addEventListener(EntityBehavior.EventTYpe.KEY, function(e){
        console.log("Event: " + e);
    });

    var keyHandler = new goog.events.KeyHandler(document.body);
    goog.events.listen(keyHandler, goog.events.KeyHandler.EventType.KEY, entityBeh.key);

    function go(time) {
        soundFX.rain.volume = 0.5;
        soundFX.rain.play();

        thunder = parseInt(Math.random() * soundFX.thunder.length);
        doThunder(thunder);

        renderer.exec(time);
        requestAnimationFrame(go);
    }

    function func(sprite){
        var hero = new rokko.entities.Entity({x: 100, y: 150}, {w: null, h: null, s: 7.5}, sprite);
        renderer.addEntity(hero);
    }

    go(0);

    function doThunder(thunder) {
        if (soundFX.thunder[thunder].paused || false) {
            soundFX.thunder[thunder].volume = 1.00;
            soundFX.thunder[thunder].play();
            renderer.bwMode = false;

            // ON
            setTimeout(function(){
                renderer.bwMode = true;
                setTimeout(function(){

                    // OFF
                    renderer.bwMode = false;
                    renderer.wonlyMode = true;

                    setTimeout(function(){

                        // ON
                        renderer.wonlyMode = false;
                        renderer.bwMode = true;

                        setTimeout(function(){

                            // OFF
                            renderer.bwMode = false;
                        }, 100);
                    }, 100);
                }, 100);
            }, 800);
        }
    }
}

goog.exportSymbol("main", main);
