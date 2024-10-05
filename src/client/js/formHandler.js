
import { updateUI } from './updateUI';

function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('input-text').value;

    if (!formText) {
        alert("Please enter a Text to analyze");
        return;
    }

    console.log("::: Form Submitted :::");

    fetch('/analyze', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText: formText }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        updateUI(data);
    })
    .catch(error => console.error("Error:", error));
}

export { handleSubmit };
