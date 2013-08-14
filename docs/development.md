### Getting started

Getting Azimuth installed is easy.  Get a copy of [node.js](http://nodejs.org/) and npm (node package manager) installed on your machine and run the following commands (some of which you may have already done).

1.  Install Meteor.js: <pre>curl https://install.meteor.com | /bin/sh</pre>
2.  Install Meteorite (a lovely package manager for Meteor): <pre>sudo npm install -g meteorite</pre>
3.  Clone Azimuth (or download): <pre>git clone git@github.com:mcrider/azimuth.git</pre>
4.  Start Azimuth by going into its directory (which you've cloned from github or downloaded) and run: <pre>mrt</pre>
5.  Your Azimuth project is now accesible from http://localhost:3000
6.  Create an account from the account dropdown menu.  The first account created will be the administrator account

**New to Meteor?**  There is a vibrant and growing community for Meteor developers.  Check out the [canonical Meteor docs](http://docs.meteor.com/#meteor_startup), [Sacha Grief's new book](http://www.discovermeteor.com/), the [Meteor Google group](https://groups.google.com/forum/?fromgroups=#!forum/meteor-talk), and of course [Stack Overflow](http://stackoverflow.com/questions/tagged/meteor) for more help working with Meteor.

### File structure

The Azimuth code is laid out as follows:

*   <pre class="inline">/.meteor/</pre> Meteor/Meteorite specific files.
*   <pre class="inline">/client/</pre> JS/HTML/CSS that is available to the browser.  The bulk of the code lives here.
*   <pre class="inline">/client/blocks/</pre> Block templates, and their accompanying JS/CSS files are stored here.  Block are stored in a modular fashion where everything needed to display a type of block them is stored in its own directory. [See below](#blocks) for more information on how to structure a page.
*   <pre class="inline">/client/css/</pre>
 Core CSS (in [LESS](http://lesscss.org/) format) as well as the packaged Azimuth theme and any external CSS files.*   <pre class="inline">/client/lib/</pre>
 Core JS files as well as external JS.*   <pre class="inline">/client/views</pre>
 Core templates and their accompanying JS files.*   <pre class="inline">/client/pages/</pre>Page templates, and their accompanying JS/CSS files are stored here.  Pages are stored in a modular fashion where everything needed to display a page template is stored in its own directory. [See below](#pages) for more information on how to structure a page.
*   <pre class="inline">/public/</pre> Any assets (Images, fonts, etc.) in this directory are served from the web root (e.g. a favicon.ico in the root of this directory is accessible at http://yourdomain/favicon.ico).
*   <pre class="inline">/server</pre> JS that is run only on the server and not sent to the client.

### Pages

Azimuth comes with an assortment of page layouts, but you might find you need to do something creative.&nbsp; Here's how to build it.

#### Page files

*   <pre class="inline">[page_name].css</pre>Any styles specific to the page.  Note that this CSS is compiled into the main CSS file and will affect elements outside of the page.
*   <pre class="inline">[page_name].html</pre>Describes the layout of the page.
*   <pre class="inline">[page_name].js</pre>Registers the page to make it available to the system.  It is important to edit this when creating a new page.  You may also add event handlers and other javascript you want executed on this page (see the [meteor.js docs](http://docs.meteor.com/#templates_api) for more information)
*   <pre class="inline">[page_name]_edit.html</pre>What you will see when editing the page.  All fields are specified in this file using the form helper method and block zones.
*   <pre class="inline">[page_name]_edit.js</pre>Code needed to make the page's edit page work.  You probably don't need to modify this.

#### Creating a new page template

The easiest way to create a new page template is to copy an existing one and rename it (including each file's filename and the template name inside the code).  You are then free to edit the page layout in the [page_name].html file and add/remove fields in the [page_name]_edit.html file.  You may also just want to tweak the layout or fields for an existing page.

### Blocks

Blocks are how Azimuth adds small bits of content to an existing page layout.  Azimuth comes with some basic content blocks in various dimensions, but you might want to create something with more specific fields or do something more complicated.  Blocks are structured pretty much the same way pages are but must be rendered from within a page.

#### Block files

*   <pre class="inline">[block_name].css</pre>Any styles specific to the page.  Note that this CSS is compiled into the main CSS file and will affect elements outside of the page.
*   <pre class="inline">[block_name].html</pre>Describes the layout of the block.
*   <pre class="inline">[block_name].js</pre>Registers the page to make it available to the system.  It is important to edit this when creating a new page.  You may also add event handlers and other javascript you want executed on this page (see the [meteor.js docs](http://docs.meteor.com/#templates_api) for more information)
*   <pre class="inline">[block_name]_edit.html</pre>What you will see when editing the page.  All fields are specified in this file using the form helper method.
*   <pre class="inline">[block_name]_edit.js</pre>Accompanying JS for the block edit form.  This is typically empty but you may want to add some code to handle special events for the edit form (e.g. an autocomplete handler).

#### Creating a new block template

The easiest way to create a new block template is to copy an existing one and rename it (including each file's filename and the template name inside the code).

### Form Elements

Azimuth uses handlebars helpers to make creating form elements easier. Though you can always roll your own form inputs (except in the case of WYSIWYG editors), form helpers make it easy to consolidate form code into a centralized location in the clients/views/form/ directory (which you are free to edit)

Form helper calls take this form:

  <pre>{{formHelper value=[contents] type="[type]" label="[label]" fieldName="[contents]" }}</pre>

*   <pre class="inline">value</pre>Variable used to store the field's contents.  This variable is the same as the one used whtpen display the field in the page/block.
*   <pre class="inline">type</pre>The type of form element.  Can be one of tag, text, textarea, or wysiwyg (other form elements can in the *_edit.html file or by creating a new form helper).
*   <pre class="inline">label</pre>The label to display next to the field when editing it
*   <pre class="inline">fieldName</pre>The value of the 'name' attribute on the element (can be the same name as the contents attribute)</section>
<section id="theming">

### Theming

Though CSS added anywhere to your meteor project will be included in the global CSS file, by convention the site theme is stored in the client/css/theme/ directory.  Styles can be added in the form of CSS files or .less files (Meteor will automatically parse either).  Azimuth uses Twitter Bootstrap 2.x, though you can certainly switch it out for another framework (or roll your own).  The default theme shipped with Azimuth is based off of [1pxdeep](http://rriepe.github.io/1pxdeep/), a flat Bootstrap theme generator.

### SEO

Until Meteor comes out with a better implementation, Azimuth uses the [Spiderable](http://docs.meteor.com/#spiderable) package to allow search engines to crawl your site.  Spiderable leverages [Phantom.js](http://phantomjs.org/) to create snapshots of your Azimuth pages which are then provided to the search engine bot upon request.  There may be a performance hit to this method of serving up pages to search engines (which could impact SEO) but this technique is common among JS-heavy web apps and is currently the only option to making your Meteor site crawlable.  As noted in the Meteor docs, if you use this package you must have phantomjs installed on your server and accessible via the $PATH variable (this is automatic if you are deploying your app to Meteor's servers).


### Deploying Azimuth

While its easy enough to get Azimuth running on your local machine, it can be a little confusing to get it running on a public server (other than [Meteor's own public servers](http://docs.meteor.com/#deploying)).  Thankfully, there's been some solid work recently in the Meteor community to help get Meteor projects running on cloud servers such as [Amazon EC2](https://github.com/netmute/meteor.sh) and [Heroku](https://github.com/oortcloud/heroku-buildpack-meteorite).  This web site is hosted on EC2 using the above deploy script and the deployment process is simple and painless.
