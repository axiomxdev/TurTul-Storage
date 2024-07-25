document.getElementById('add-folder').addEventListener('click', function() {
    const name = prompt('Nom du dossier');

    const path = document.getElementById('file_path');
    const full_path = (Array.from(path.children).map(obj => obj.textContent)).join('/').replaceAll(' >', '').replace('Stockage', '');

    const data_to_add = {
        "t": "folder",
        "n": name,
        "s": "",
        "d": new Date().toLocaleString(),
        "p": full_path + '/' + name,
        "data": []
    };

    AddFile(full_path, 0, data_to_add);
});
