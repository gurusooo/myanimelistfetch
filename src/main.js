const searchInput = document.querySelector('#searchInput');
const animeList = document.querySelector('#animeList');
const animeDetails = document.querySelector('#animeDetails');
const searchBtn = document.querySelector('#searchBtn');

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query.length > 2) {
            fetchAnime(query);
        }
    }
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
        fetchAnime(query);
    }
});

async function fetchAnime(query) {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
    const data = await res.json();

    animeList.innerHTML = '';
    animeDetails.classList.add('hidden');

    data.data.forEach(anime => {
        const div = document.createElement('div');
        div.classList.add('anime-item');
        div.textContent = anime.title;
        div.addEventListener('click', () => showAnimeDetails(anime.mal_id));
        animeList.appendChild(div);
    });
}

async function showAnimeDetails(id) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const { data } = await res.json();

    animeDetails.innerHTML = `
    <h2>${data.title}</h2>
    <img src="${data.images.jpg.image_url}" alt="${data.title}" width="200"/>
    <p><strong>Original title:</strong> ${data.title_japanese}</p>
    <p><strong>Episodes:</strong> ${data.episodes}</p>
    <p><strong>Status:</strong> ${data.status}</p>
    <p><strong>Rating:</strong> ${data.rating}</p>
    <p><strong>Score:</strong> ${data.score || 'N/A'} (${data.scored_by} votes)</p>
    <p><strong>Type:</strong> ${data.type}</p>
    <p><strong>Season:</strong> ${data.season || 'Unknown'} ${data.year || ''}</p>
    <p><strong>Duration:</strong> ${data.duration}</p>
    <p><strong>Genres:</strong> ${data.genres.map(g => g.name).join(', ')}</p>
    <p>${data.synopsis || 'No synopsis available.'}</p>
    ${data.trailer?.url ? `<a href="${data.trailer.url}" target="_blank">Watch Trailer</a><br>` : ''}
    <a href="${data.url}" target="_blank">View on MyAnimeList</a>
  `;

    animeDetails.classList.remove('hidden');
}

