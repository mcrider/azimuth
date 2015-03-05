# [Azimuth](http://github.com/mcrider/azimuth)

***Note: This project is no longer being actively developed by me; But I am happy to take PRs and publish new versions.***

Azimuth is a simple, elegant, and fast CMS built using meteor.js.

This is the tracking repository for the various Meteorite packages that make up Azimuth.  If you'd just like to get running with Azimuth, visit the [home page](http://azimuthc.ms/) for simple instructions.

If you'd like to run Azimuth from git, clone this repository (make sure to clone using `git clone --recursive https://github.com/mcrider/azimuth.git` or otherwise initialize the submodules in `/packages`) and keep on reading...


## Prerequisites

* Install meteor.js: `curl https://install.meteor.com | /bin/sh`

You can then run Azimuth by cloning this repository and running `mrt` from the root directory.  This will make Azimuth accessible from http://localhost:3000 by default.  I recommend forking this repository and pushing any changes to your forked repo (and please feel free to make pull requests with your custom blocks, pages, or core fixes).

To test different front-end frameworks or themes, add/remove them like you would normally.  E.g. if you'd like to go from using Bootstrap to Foundation, run
* `meteor remove mcrider:azimuth-views-bootstrap`
* `meteor add mcrider:azimuth-views-foundation`

To administer Azimuth, create a user account -- the first user account will be the admin user.  From there you can edit your site from the admin menu in the top right corner of the page.

For further documentation and a demo of Azimuth in action, visit [http://azimuthc.ms](http://azimuthc.ms).

### Contributors

@ndemoreau
