document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    try {
        // Make sure to replace 'http://10.75.5.204/register' with your actual server endpoint
        const response = await fetch('http://10.75.5.204/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });
        if (response.ok) {
            document.getElementById('message').innerHTML = 'Registered successfully!';
            // Redirect after 2 seconds to home page
            setTimeout(() => window.location.href = '/', 2000);
        } else {
            const data = await response.json();
            document.getElementById('message').innerHTML = data.message || 'Error submitting form';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerHTML = 'Error submitting form';
    }
});
