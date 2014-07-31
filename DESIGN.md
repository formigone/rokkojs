Design
======

Ideas
-----

- Scene class has layers, which can be Map instances
    - problem could be over-rendering - rendering tiles in background layer that will be hidden by higher layers
    
    - solution could include making background layers smaller (background = 500x20 tiles; foreground = 500x60 tiles)
    
- Instead of having tile type = block, where collision detection would have to know about map + entity locations, collision detection engine could have empty entities represent floors, walls, etc. Instead of one box for each floor tile, the entity could be a large rectangle that covers many tiles lined up side by side:

```
(single tiles)
+---+---+---+---+---+
|   |   |   |   |   |
+---+---+---+---+---+

(empty entities representing rigid bodies)
+-------------------+
|                   |
+-------------------+
```
- This way there there would only be one object to keep track of, as well as there would be no dependency on the actual map

- Two benefits of having tile.type, however, are:
    - less memory to represent the same thing

    - You only check up to 4 tiles where the player might be touching, instead of checking for intersection between the player and all other entities in the scene/viewport
