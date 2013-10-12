# [Azimuth](http://github.com/mcrider/azimuth)

Azimuth is a simple, elegant, and fast CMS built using meteor.js.

This is the tracking repository for the various Meteorite packages that make up Azimuth.  If you'd just like to get running with Azimuth, visit the [home page](http://github.com/mcrider/azimuth) for simple instructions.

If you'd like to run Azimuth from git, clone this repository (make sure to clone using `git clone --recursive git@github.com:mcrider/azimuth-packages-test.git` or otherwise initialize the submodules in `/packages`) and keep on reading...

***Note: Azimuth is currently in early alpha; I'm still working out code design and many features are not yet implemented.***

## Prerequisites

* Install meteor.js: `curl https://install.meteor.com | /bin/sh`
* Install meteorite: `sudo npm install -g meteorite`

You can then run Azimuth by cloning this repository and running `mrt` from the root directory.  This will make Azimuth accessible from http://localhost:3000 by default.  I recommend forking this repository and pushing any changes to your forked repo (and please feel free to make pull requests with your custom blocks, pages, or core fixes).

To test different front-end frameworks or themes, add/remove them like you would normally.  E.g. if you'd like to go from using Bootstrap to Foundation, run
* `mrt remove azimuth-views-bootstrap`
* `mrt remove azimuth-theme-bootstrap-flatBlue` (or whichever theme you're using, if any)
* `mrt add azimuth-views-foundation`

To administer Azimuth, create a user account -- the first user account will be the admin user.  From there you can edit your site from the admin menu in the top right corner of the page.

For further documentation and a demo of Azimuth in action, visit [http://azimuthc.ms](http://azimuthc.ms).