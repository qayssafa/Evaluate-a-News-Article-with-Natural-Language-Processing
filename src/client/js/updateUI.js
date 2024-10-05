
function updateUI(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    resultsContainer.innerHTML += `<p><strong>Overall Polarity:</strong> ${data.polarity}</p>`;
    resultsContainer.innerHTML += `<p><strong>Overall Subjectivity:</strong> ${data.subjectivity}</p>`;

    data.sentence_list.forEach(sentence => {
        resultsContainer.innerHTML += `
            <div>
                <p><strong>Text:</strong> ${sentence.text}</p>
                <p><strong>Polarity:</strong> ${sentence.score_tag}</p>
                <p><strong>Confidence:</strong> ${sentence.confidence}</p>
            </div>
            <hr>`;
    });
}

export { updateUI };
