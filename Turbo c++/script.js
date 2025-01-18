document.addEventListener('DOMContentLoaded', () => {
    const outputContent = document.getElementById('output-content');
    const fileInput = document.getElementById('file-input');

    // Initialize CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById('code-area'), {
        lineNumbers: true,
        mode: 'text/x-c++src',
        theme: 'monokai'
    });

    // File handling
    document.getElementById('open-file').addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                editor.setValue(e.target.result);
            };
            reader.readAsText(file);
        }
    });

    document.getElementById('save-file').addEventListener('click', () => {
        const code = editor.getValue();
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code.cpp';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Simulated run code
    document.getElementById('run-code').addEventListener('click', () => {
        const code = editor.getValue();
        outputContent.innerHTML = 'Compiling...';

        setTimeout(() => {
            // Simulate successful compilation if no syntax errors
            if (Math.random() > 0.1) { // Assuming 90% success rate for compilation
                if (code.includes('printf("Hello World!")')) {
                    outputContent.innerHTML = 'Compilation successful!\nRunning...\n\nHello World!';
                } else {
                    outputContent.innerHTML = 'Compilation successful!\nRunning...\n\n[Simulated Output]';
                }
            } else {
                outputContent.innerHTML = 'Compilation failed!\nError: Missing semicolon at line 3';
            }
        }, 1000);
    });
});
