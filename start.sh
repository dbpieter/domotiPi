#!/bin/bash

cd hardware
sudo node app.js &
cd ../interface
sudo node server.js 80 &

