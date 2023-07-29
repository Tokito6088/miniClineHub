let inputbar = document.querySelector('input');
const btn = document.querySelector('.searchbtn');
const result = document.querySelector('.result');
const loader = document.querySelector('.loader');

const key = `461f6c83`;

function getdata() {
	const inputdata = inputbar.value;
	const url = `http://www.omdbapi.com/?t=${inputdata}=&apikey=${key}`;

	if (inputdata.length <= 0) {
		result.innerHTML = `<h3>Please Enter Movie Name</h3>`;
	} else {
		loader.style.display = 'flex';
		fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				inputbar.value = '';
				inputbar.blur();
				if (data.Response == 'True') {
					loader.style.display = 'none';
					result.innerHTML = `
          <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                  <h2>${data.Title}</h2>
                  <div class="rating">
                    <i class="fas fa-star" style="color: #ffb92a;"></i>
                    <h4>${data.imdbRating}</h4>
                  </div>
                  <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                  </div>
                  <div class="genre">
                    <div>${data.Genre.split(',').join('</div><div>')}</div>
                  </div>
                </div>
          </div>
         
        <h3>Plot:</h3>
        <p>${data.Plot}</p>
        <h3>Cast:</h3>
        <p>${data.Actors}</p>
        `;
				} else {
					loader.style.display = 'none';
					result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
				}
			})
			.catch(() => {
				result.innerHTML = `<h3 class="msg">error accured </h3>`;
			});
	}
}

btn.addEventListener('click', getdata);
window.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		getdata();
	}
});
window.addEventListener('load', getdata);
