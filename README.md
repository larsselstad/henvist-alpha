henvist-alpha
=============

Kommando for å finne alle index.js filer å kjøre de med node:
find . -name "index.js" -not -path "./node_modules/*" -exec node {} \;