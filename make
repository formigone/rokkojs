./lib/closure-library/closure/bin/build/closurebuilder.py \
 --root=/usr/local/google-closure/closure-library/ \
 --root=./ \
 --namespace=rokko.go \
 --output_mode=compiled \
 --compiler_jar=/usr/local/google-closure/compiler.jar \
 --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
 --compiler_flags="--create_source_map=app.comp.js.map" \
 --compiler_flags="--warning_level=VERBOSE" \
 > app.comp.js

echo "//# sourceMappingURL=app.comp.js.map" >> app.comp.js
