document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    try {
        const response = await fetch(`/api/serphouse?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('results').innerText = data.error;
        } else {
            document.getElementById('results').innerHTML = `
                <p><strong>Response:</strong></p>
                <pre>${JSON.stringify(data.response, null, 2)}</pre>
                <p><strong>Source:</strong> ${data.source}</p>
            `;
        }
    } catch (error) {
        document.getElementById('results').innerText = 'An error occurred while fetching data.';
    }
});