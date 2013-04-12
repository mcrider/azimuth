// Register pages and blocks

registry = {
  pageTemplates: [],
  pageTemplate: function (pageTemplate) {
    this.pageTemplates.push(pageTemplate);
  },

  blockTemplates: [],
  blockTemplate: function (blockTemplate) {
    this.blockTemplates.push(blockTemplate);
  }
};