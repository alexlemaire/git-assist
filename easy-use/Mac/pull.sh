#!/bin/bash

cd ../
DIR="$(basename "$(pwd)")"
if [ $DIR == "easy-use" ]
then
  cd ../
fi

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# Pulling
header_print "Pulling from remote repository..."
$EXEC pull

echo "Done!"
read -p "Press Return to exit"
