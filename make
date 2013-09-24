./../lib/closure-library/closure/bin/build/closurebuilder.py \
 --root=/usr/local/google-closure/closure-library/ \
 --root=./ \
 --namespace=rokko.go \
 --output_mode=compiled \
 --compiler_jar=/usr/local/google-closure/compiler.jar \
 --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
 > out/app.comp.js
