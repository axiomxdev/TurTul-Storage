document.getElementById('search').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        searchInputEvent(this.value);
    }
});

document.getElementById('search').addEventListener('change', function() {
    searchInputEvent(this.value);
});

function searchInputEvent(value) {
    file_name.forEach(file => {
        if (file.name === value) {
            let data_path = DATA;
            const d = file.path.split('/').slice(1, -1);

            if (d.length === 0) {
                loadfiledata(DATA, 'DATA');
            }

            d.forEach(filename => {
                data_path.forEach(file => {
                    if (file.n === filename) {
                        if (file.n === d[d.length - 1]) {
                            loadfiledata(file.data, file.n);
                            return;
                        }
                        data_path = file.data;
                        return;
                    }
                });
            });

            return;
        }
    });
}
