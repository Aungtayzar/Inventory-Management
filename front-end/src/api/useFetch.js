const baseURL = "http://127.0.0.1:8000/api";

export async function fetchApi(endpoint, method = "GET", body = null) {
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${baseURL}${endpoint}`, config);
    if (!response.ok) {
        throw new Error(`Error :  ${response.statusText}`);
    }

    return response.json();
}
