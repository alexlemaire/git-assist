#!/bin/bash

cd easy-use
zip -r easy-use.zip .
git config --global user.name Alexis Lemaire
git config --global user.email a.lemaire@klimapartner.de
git commit -am "Built easy-use.zip archive"
git push
