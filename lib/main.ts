const child_process = require('child_process');

const compile = function(event) {// compiling file

	const file = event.path;

	if (file.split('.').pop() !== 'rs') {
    	return; // check file ext
  	}
  	const command = atom.config.get('rust-compile-on-save.compileCommand');
  	const fileName = (file);
  	return child_process.spawn(command, fileName);
};

module.exports = {
  	activate() {
    	return atom.workspace.observeTextEditors(editor => editor.onDidSave(compile));
  	},
  	config: {
		compileCommand: {
      	default: 'rustc',
      	title: 'Compile command',
      	type: 'string'
    	}
  	}
};
