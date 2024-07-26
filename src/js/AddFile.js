document.getElementById('add-file').addEventListener('click', function() {
    document.getElementById('upload-file').click();
});

document.getElementById('upload-file').addEventListener('change', async function(event) {
    const files = event.target.files;
    const path = document.getElementById('file_path');
    const full_path = (Array.from(path.children).map(obj => obj.textContent)).join('/').replaceAll(' >', '').replace('Stockage', '');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size >= 26214400) {
            return alert(`Your size file can't be more than 25Mo (${formatFileSize(file.size)})`);
        }

        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const data_to_add = {
            "t": "file",
            "n": file.name,
            "s": `${formatFileSize(file.size)}`,
            "d": formattedDate,
            "p": `${full_path}/${file.name}`
        };

        let currentData = DATA;

        const segments = full_path.split('/').filter(Boolean);

        for (let i = 0; i < segments.length; i++) {
            let foundFolder = currentData.find(item => item.t === 'folder' && item.n === segments[i]);
            if (!foundFolder) {
                return alert('Path does not exist.');
            }
            currentData = foundFolder.data;
        }

        let duplicate = currentData.find(item => item.n === data_to_add.n && item.t === data_to_add.t);
        if (duplicate) {
            alert(`File or folder already exists. (${file.name})`);
        } else {
            const webhookResponse = await sendFileToWebhook(file);
            console.log('webhook response:', webhookResponse);

            data_to_add.id = webhookResponse;

            AddFile(full_path, 0, data_to_add, file);
        }
    }
});
