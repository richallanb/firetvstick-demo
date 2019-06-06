
export const fetchDataFromUrl = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin'
    });
    const html = await response.json();
    return html;
}