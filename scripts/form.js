const fs = require('fs');
const path = require('path');

document.getElementById('dataForm').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const SWApp = document.getElementById('swApplication').val();
    const domain = document.getElementById('domain').val();

    if (SWApp.trim() === '' || domain.trim() === '') {
        alert('Please fill out both location and data fields.');
        return;
    }

    const newData = {
        SWApplication:SWApp,
        domain:domain
    };
    console.log("Yes")
    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            alert('Error reading file:', err);
            return;
        }

        let json = [];
        if (fileData) {
            try {
                json = JSON.parse(fileData);
            } catch (parseError) {
                alert('Error parsing JSON:', parseError);
                return;
            }
        }

        json.push(newData);

        fs.writeFile(filePath, JSON.stringify(json), 'utf-8', (writeErr) => {
            if (writeErr) {
                alert('Error writing to file:', writeErr);
                return;
            }
            alert('Data submitted successfully!');
        });
    });
    console.log(json);
});



