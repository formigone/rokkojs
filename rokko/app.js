goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.AnimatedSprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");

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
        jumping: new rokko.graphics.Sprite(jumping),
        spinning: new rokko.graphics.Sprite(spinning)
    };

    var animFrames = {
//        rokko.entities.Entity.EntityState.STANDING_RIGHT: new rokko.graphics.Sprite(standing),
//        rokko.entities.Entity.EntityState.RUNNING_RIGHT: new rokko.graphics.Sprite(running),
//        rokko.entities.Entity.EntityState.JUMPING_UP: new rokko.graphics.Sprite(jumping),
//        rokko.entities.Entity.EntityState.JUMPING_DOWN: new rokko.graphics.Sprite(jumping)
        0: new rokko.graphics.Sprite(standing),
        1: new rokko.graphics.Sprite(running),
        2: new rokko.graphics.Sprite(jumping),
        3: new rokko.graphics.Sprite(jumping)
    };

    var animSprites = new rokko.graphics.AnimatedSprite({
        defaultFrame: 0,
        sprites: animFrames
    });

    // TODO: make entity size the same as img size. If entity size is always the same, then Mega Man can't fit under a low ceiling by sliding...
    // Maybe I can use a scaling factor? Only way this would work is if the same src image is always the same, and the renderer scales each size component before each draw. ** Might be much, much easier to simply always set entity.size === img.size and create new src image for each game that wants different size sprites **
    var hero = new rokko.entities.Entity({x: 100, y: 150}, {w: null, h: null, s: 7.5}, sprites.standing);
    var hero2 = new rokko.entities.Entity({x: 300, y: 150}, {w: null, h: null, s: 3.5}, sprites.running);
    var hero3 = new rokko.entities.Entity({x: 450, y: 150}, {w: null, h: null, s: 3.5}, sprites.jumping);
    var hero4 = new rokko.entities.Entity({x: 600, y: 150}, {w: null, h: null, s: 3.5}, sprites.spinning);
    var hero5 = new rokko.entities.Entity({x: 300, y: 300}, {w: null, h: null, s: 3.5}, animSprites);

    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);

    canvas.show(document.body);

    renderer.addEntity(hero);
    renderer.addEntity(hero2);
    renderer.addEntity(hero3);
    renderer.addEntity(hero4);
    renderer.addEntity(hero5);

    setTimeout(function(){
        hero5.sprite.setSprite(1);
    }, 5000);

    function go(time) {
        renderer.exec(time);
        requestAnimationFrame(go);
    }

    go(0);
}

goog.exportSymbol("main", main);
