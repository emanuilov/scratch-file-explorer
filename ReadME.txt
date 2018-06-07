#Install NW with dev tools#
1. npm view nw versions 
2. Find the latest stable version (no rc in the title, 0.13.4 at the time of this writing) and with "-sdk" at the end. For me that is "0.13.4-sdk". 
3. Install that specific version with: npm install -g nw@0.13.4-sdk

#Build without devtools#
nwbuild . -p win32,win64 --flavor normal