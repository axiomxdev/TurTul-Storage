let DATA = JSON.parse(localStorage.getItem('DATA')) || [];

function loadfiledata(data, name) {
    const tableBody = document.getElementById('file-list');
    tableBody.innerHTML = '';

    data.forEach(file => {
        const row = document.createElement('tr');

        if (file.t === 'file') {
            row.innerHTML = `
                <td>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file" class="svg-inline--fa fa-file fa-xl file-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="currentColor" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"></path>
                    </svg>
                    ${file.n}
                </td>
                <td>${file.s}</td>
                <td>${file.d}</td>
                <td>${file.p}</td>
                <td class="expand-text" onclick='Download(${JSON.stringify(file.id)})'>Télécharger</td>
            `;
        } else if (file.t === 'folder') {
            row.innerHTML = `
                <td>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="folder" class="svg-inline--fa fa-folder fa-xl folder-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"></path>
                    </svg>
                    ${file.n}
                </td>
                <td>${file.s}</td>
                <td>${file.d}</td>
                <td>${file.p}</td>
                <td class="expand-text" onclick='expandFolder(${JSON.stringify(file.data)},"${file.n}")'>Agrandir</td>
            `;
        }
        tableBody.appendChild(row);
    });

    const path = document.getElementById('file_path');
    let content = `<div class="boxpath" onclick='expandFolder(${JSON.stringify(DATA)},"DATA")'>Stockage ></div>`;
    
    let data_path = DATA;

    if (!data[0]) {
        path.innerHTML += `<div class="boxpath">${name} ></div>`;
        return;
    }

    const d = data[0].p.split('/').slice(1, -1);

    d.forEach(filename => {
        data_path.forEach(file => {
            if (file.n === filename) {
                content += `<div class="boxpath" onclick='expandFolder(${JSON.stringify(file.data)},"${file.n}")'>${filename} ></div>`;
                data_path = file.data;
                return;
            }
        });
    });

    path.innerHTML = content;
}

function expandFolder(data, name) {
    console.log('Agrandir le dossier:', data, '\nNom:', name);
    loadfiledata(data, name);
}

async function Download(id) {
    const response = await fetch(`${webhook}/messages/${id}`, {
        method: 'GET'
    });
    const data = await response.json();
    const messageUrl = data.attachments[0].url;

    window.location.href = messageUrl;
}

async function sendFileToWebhook(webhook, file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(webhook, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    const messageId = data.id;

    return messageId;
}

document.addEventListener('DOMContentLoaded', () => {
    if (DATA.length != 0) {
        loadfiledata(DATA, 'DATA');
    }

    const datalist = document.getElementById('suggestions');

    file_name.forEach(file => {
        const option = document.createElement('option');
        option.value = file.name;
        option.textContent = file.path;
        datalist.appendChild(option);
    });
});
