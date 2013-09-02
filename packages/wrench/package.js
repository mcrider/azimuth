Package.describe({
  summary: "Wrench library for better node.js file management"
});

Npm.depends({wrench: "1.5.1"});

Package.on_use(function (api) {
    api.add_files([
        'wrench.js'
    ], 'server'
    );
    api.export && api.export('wrench', 'server');
});
