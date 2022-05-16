// Navigator.msSaveBlob (Non-standard, Deprecated)
// URL.createObjectURL(blob)
// HTMLInputElement.files

function downloadBlob(fileName){
    const file = document.querySelector('input').files[0];
    console.log(file, file instanceof Blob);
    const a = document.createElement('a');
    // const blob = new Blob(file);
    a.href = URL.createObjectURL(file);
    // compatibility 
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

function downloadUrl(url,fileName){
    const a = document.createElement('a');
    a.href = url;
    // compatibility 
    a.download = fileName;
    a.click();
}


async function downloadAndSave(fileName){
    // File System Access API, window.showSaveFilePicker etc.
    // compatibility, try...catch...
    const file = document.querySelector('input').files[0];
    console.log(file, file instanceof Blob);
    const fileSystemFileHandle = await  window.showSaveFilePicker({
        // excludeAcceptAllOption: false,
        suggestedName: fileName,
        types: [
            {
                description: 'excel',
                accept: {
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':['.xlsx']
                }
            }
        ]
    })

    const writable = await fileSystemFileHandle.createWritable();
    await writable.write(file);
    await writable.close();
    console.log(fileSystemFileHandle)
}
