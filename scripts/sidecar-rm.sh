# Identify the platform.
target_triple=$(rustc -Vv | grep host | cut -f2 -d' ')

# The binary is suffixed with the triple target as required by tauri sidecar api.
program="benchttp-server-$target_triple"

rm -f ./src-tauri/bin/$program
