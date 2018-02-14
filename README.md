## Awesome Cabot GUI

### Dependencies
This app depends on Node.js environment to run. `yarn` is the recommended dependency management tool. To install them, run:
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
sudo apt-get update && sudo apt-get install nodejs yarn
```
You also need to install locally the dependency for this specific application, run in the folder
```
yarn
```
### How to run this
First run the one-for-all script to do everything else
```
roslaunch localizer move_base.launch
```
Then run this to opoen the browser and play with it
```
yarn start
```