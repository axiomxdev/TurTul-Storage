const file_name = [];

function GetAllFileName(data) {
    data.forEach(file => {
        if (file.t === 'folder') {
            GetAllFileName(file.data);
        }
        file_name.push({ name: file.n, path: file.p });
    });
}

GetAllFileName(DATA);

function AddFile(path, n, data) {
    console.log('path AddFile:', path);

    if (DATA.length === 0) {
        DATA.splice(1, 0, data);
        localStorage.setItem('DATA', JSON.stringify(DATA));
        loadfiledata(DATA, 'DATA');
        return;
    }

    const segments = path.split('/').filter(Boolean);

    file_name.push({ name: data.n, path: data.p });

    const datalist = document.getElementById('suggestions');
    const option = document.createElement('option');
    option.value = data.n;
    option.textContent = data.p;
    datalist.appendChild(option);

    if (path === '') {
        DATA.splice(1, 0, data);
        localStorage.setItem('DATA', JSON.stringify(DATA));
        loadfiledata(DATA, 'DATA');
        return;
    }

    function FindPath(path, n, data) {
        let path_ = '';
        const segments = path.replace('/', '').split('/');

        for (let i = 0; i < n + 1; i++) {
            path_ += ('/' + segments[i]);
        }

        const Data = data.find(item => item.p === path_);
        if (Data.p === path) return Data;

        return FindPath(path, n + 1, Data.data);
    }

    const parentFolder = FindPath(path, 0, DATA);
    parentFolder.data.splice(1, 0, data);

    localStorage.setItem('DATA', JSON.stringify(DATA));
    loadfiledata(parentFolder.data, parentFolder.n);
}

// Charger les données initiales
document.addEventListener('DOMContentLoaded', () => {
    if (DATA.length != 0) {
        loadfiledata(DATA, 'DATA');
    }
});