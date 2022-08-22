const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC55-mxUj5Nj3niXFReG44OQ&part=snippet%2Cid&order=date&maxResults=12';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ec9cfce022msh7b9b3f09474f652p1eeb5cjsn1140e66ceeb3',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
	const response = await fetch(urlApi, options);
	const data = await response.json();
	return data;
}

(async () => {
	try {
		const videos = await fetchData(API);
		let view = `
    ${videos.items.map(video => `
      <div class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
			<img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0" onclick="showModal('${video.id.videoId}')"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `).slice(0,8).join('')}
    `;
		content.innerHTML = view;
	} catch {
		(error) => console.error(error);
	}
})();

//Show video on modal
const modal = document.querySelector('#modal');
//const modalBody = document.querySelector('#modalBody');
const iframe = document.querySelector('#iframe');

const showModal = (videoId) => {
	const src = `https://www.youtube.com/embed/${videoId}`;
	iframe.setAttribute('src', src);
	toggleModal();
};

const toggleModal = () => modal.classList.toggle('hidden');
const closeModal = () => {
	iframe.removeAttribute('src');
	modal.classList.add('hidden');
};

toggleModal;
showModal;
closeModal;

//`https://www.youtube.com/watch?v=${video.id.videoId}`
//video.id.videoId
//video.snippet.publishedAt
//video.snippet.description

{/*<iframe width="560" height="315" src="https://www.youtube.com/embed/5eW6Eagr9XA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
