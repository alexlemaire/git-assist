#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# generate SSH key
header_print "Generating SSH key for GitHub..."
$EXEC generate-ssh

# generate GPG key
header_print "Generating GPG key for GitHub..."
$EXEC generate-gpg

# configurate user
header_print "Configurating GitHub user..."
$EXEC config -g

if [[ $2 != "--noEndMsg" ]]
then
  printf "\nScript ran. You may now close this window if you're done working with it!"
fi
