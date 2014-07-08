.\lib\closure-library\closure\bin\build\closurebuilder.py ^
 --root=lib\closure-library ^
 --root=rokko ^
 --namespace=rokko.go ^
 --output_mode=compiled ^
 --compiler_jar=\closure-compiler\compiler.jar ^
 --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
 > out\app.comp.js
