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

#### If you just want to teleoping Cabot

- Connect your laptop with Arduino on Cabot
- Make sure laptop and remote control device are in the same network (Cabot or phone hotspot)
- Run `ifconfig`, you should be able to see your ipv4 address
- `vim src/sender.js`, change the `ROS_BRIDGE_URL` to the address you just got, don't forget the `:9090`
- run `roslaunch localizer get_odom.launch` anywhere and run `yarn start` in this folder
- Go to your remote control device, open the browser, in the address bar, enter the ip address:3000 as is shown in the `yarn start` window

#### If you also want to see the map, localization, trajectory etc.

- Same as above, but change `roslaunch localizer get_odom.launch` to `roslaunch localizer localizer.launch`


#### If you want to do all the things
First run the one-for-all script to do everything else
```
roslaunch localizer move_base.launch
```
Then run this to open the browser and play with it
```
yarn start
```