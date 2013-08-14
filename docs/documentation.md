
### Logging in

Azimuth has a basic registration system accessible by clicking on the user icon in the top right of the site.  The first user created on the site will automatically be registered as the site administrator; That user then has the ability to set the roles that subsequent users have.

### Administration

The administration menu at the top right is your access point to managing your site. &nbsp;This menu is visible when you are logged in as an admin.

*   **Site Settings**: General site-wide settings.
*   **Site Navigation**: Set header and footer navigation menus with a drag-and-drop interface.
*   **Users**: Administer user accounts.
*   **New Page**: Create a new page.
*   **Edit Page**: Edit an existing page.

### User administration

The user administration page shows a basic listing of all users registered on your site.  This page allows you to delete users (by clicking the 'x' icon to the right of each user entry) and set the roles of each user by clicking on the admin and author icons to the left of each entry.

### Pages

Pages are the main way of displaying content on your site.  There are a variety of page templates included with Azimuth and creating new ones is a straightforward process.  Pages are packaged as self-contained modules containing all the requisite Javascript, CSS, and markup required to render the page.  This modular nature allows you to extend each page to contain a mini-application that can exploit any feature Meteor.js has to offer (and offload all the boring content management to Azimuth).

#### Creating A Page

New pages are added to your site by click on the 'New Page' menu item from the administration menu.  A dialog will appear which allows you to set the page title and the slug that will be used to access the page.  This slug will automatically be generated based on the page title, but feel free to edit it to whatever you like.

#### Editing Pages

When you create a new page, or navigate to a page from the Administration &gt; Edit Page submenu, you will be presented with a form to edit the page in question.  The first two fields allow you to set the page template and the page title.  After these fields, the form displays template-specific fields including any regular form fields as well as a standard WYSIWYG editor (with a [Filepicker.io-backed](#filepicker) file/image tool) and areas to add [blocks](#blocks).  When saving the form, the form data will immediately update all clients on this particular page.

#### Adding Pages to Navigation

Pages can be added to your header and footer navigation by going to the Site Navigation menu item from the admin menu.  This page provides a drag-and-drop interface for ordering how your pages are displayed in each menu and optionally for the header menu, the hierarchy in which they appear.  Pages that you want hidden from each menu can be dragged to the right side.

### Blocks

Blocks are structurally similar to pages in that they are self-contained modules, the only difference being that they require a page to be displayed in.  How a block appears depends entirely on a block's template, but typically blocks contain small bits of content that are grouped together in meaningful ways.

#### Creating A Block

You can add a new block to your page by going to a block zone element on a page's edit form and selecting from the 'Add Block' menu.  From this menu you have the option of adding an existing block, group of blocks by type/tag, or creating a new block.  When creating a new block, a dialog will appear that lets you specify the values for the block's fields.

#### Managing Blocks

  Each page's block zone area displays the blocks or block groups (grouped by type or tag) that will appear on that page.  You can drag-and-drop the order of these blocks or edit/delete them from this interface.

#### Pagination

From the block zone's menu, you can limit the number of blocks that will appear before a pagination list appears.  When set to off, all blocks in the blockzone will appear on the client; Otherwise, the selected number will be used to limit the amount of blocks that will appear per 'page'.

### File Picker

Azimuth uses [Filepicker.io](http://filepicker.io) to add images and other files to your site's pages and blocks.  To use this interface, you'll need a Filepicker API key, which is registered through the system via the site settings.  After doing this, two new buttons will appear in the WYSIWYG editor allowing you to insert an image or a link to a file.
