// ⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⡤⢤⣤⣤⣤⣤⣤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⣠⣿⡿⣟⠯⡒⢯⣽⣓⣒⢾⣯⣭⣿⣿⠿⠭⠭⣯⣷⣦⡀⠀⠀⠀
// ⠀⠀⠀⠀⣰⣿⣯⣞⣕⣽⠾⠿⠿⠿⢿⣏⣿⣿⣿⡗⣽⣿⣿⣷⡝⣿⣿⡆⠀⠀
// ⠀⠀⠀⣀⣛⠛⢿⣛⢝⢁⣀⣀⣀⠓⠶⠈⣿⣿⡿⠗⠉⠁⢀⣀⣹⣛⣛⣳⢄⠀
// ⠀⡔⡾⢁⣴⡆⢦⣬⣙⣛⣋⣤⣿⣿⣷⣾⣿⣿⣿⡆⢿⣿⡟⠻⠛⡉⣍⣲⢱⠁
// ⠀⣇⣇⢸⣉⡀⢦⣌⡙⠻⠿⣯⣭⣥⠡⡤⠿⢿⣿⣿⡆⠉⡻⢿⣿⠇⢻⣟⠼⠀
// ⠀⠈⠪⣴⣿⣧⡀⢉⠛⠘⢶⣦⣬⠉⣀⠓⠿⠿⠯⢉⣴⠿⠿⠓⡁⡄⠀⣿⠃⠀
// ⠀⠀⠀⠙⣿⣿⣷⣌⠻⢠⣤⣀⠉⠐⠛⠿⠿⠰⠶⠦⠰⠶⠇⠘⠃⠁⠀⣿⠀⠀
// ⠀⠀⠀⠀⠘⢿⣿⣿⣷⣌⠻⢿⠇⣼⣶⣦⡄⣄⣀⡀⢀⡀⢀⡀⡀⠀⢠⣿⠀⠀
// ⠀⠀⠀⠀⠀⠀⠙⠯⣛⠭⣻⠶⣬⣉⣛⠛⠃⠿⠿⠃⠿⠃⠚⣀⣁⣤⣾⣿⡀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠒⠯⣶⣋⡽⢛⣿⣯⣿⣭⣭⡿⢿⣿⣻⣾⢟⣿⡇⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⠿⣶⣾⣿⣿⣿⣭⣭⣭⣶⣿⡿⠁⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠛⠛⠛⠋⠁⠀⠀⠀

const articles = [
	{
		id: 1, // what is the id supposed to do?
		title: 'Cheddar Cheese',
		date: 'May/21/2026',
		description:
			'Cheddar cheese originates from the village of Cheddar in Somerset, southwest England.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Somerset-Cheddar.jpg/500px-Somerset-Cheddar.jpg',
		imgAlt: 'Cheddar Cheese on cutting board.',
		calOz: '114',
		type: 'Semi-Hard Cheese',
		rating: '🧀🧀🧀🧀🧀'
	},
	{
		id: 2,
		title: 'Swiss Cheese',
		date: 'May/26/2026',
		description:
			'The term "Swiss cheese" is one used of any variety of cheese that resembles Emmental cheese, a yellow, medium-hard cheese that originated in the area around Emmental, Switzerland.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/NCI_swiss_cheese.jpg/500px-NCI_swiss_cheese.jpg',
		imgAlt: 'Swiss Cheese on white background',
		calOz: '108',
		type: 'Semi-Hard Cheese',
		rating: '🧀🧀🧀'
	},
	{
		id: 3,
		title: 'Brie',
		date: 'May/26/2026',
		description:
			"Brie is a soft cow's-milk cheese named after Brie, the French region from which it originated.",
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Brie_01.jpg/500px-Brie_01.jpg',
		imgAlt: 'Brie on cutting board.',
		calOz: '95',
		type: 'Soft Cheese',
		rating: '🧀🧀🧀🧀'
	}
];

const bodyMainNode = document.querySelector("main");
const templateArticleNode = document.querySelector(".article");
for (article of articles){
	
	// 1. Building HTML for the card
    const card = `
        <div class="article">
        	<hr>
        	<div class="article_details">
        	    <p class="article_detail_date">${article.date}</p>
        	    <p class="article_detail_nutrition">${article.calOz} Cal/oz</p>
        	    <p class="article_detail_cheese_type">${article.type}</p>
        	    <p class="article_detail_rating">${article.rating}</p>
        	</div>
        	<div class="article_article">
        	    <h2 class="article_title">${article.title}</h2>
        	    <img class="article_image" src="${article.imgSrc}" alt="${article.imgAlt}">
        	    <p class="article_description">${article.description}</p>
        	</div>
    	</div>  
    `;

    // 2. Puttiiing the HTML on the page
    bodyMainNode.innerHTML += card;
}

// for (article of articles){
    // // create deep dupe of template
    // const articleNode = templateArticleNode.cloneNode(true);
    // bodyMainNode.appendChild(articleNode);

    // // get nodes/ html elements
    // const dateNode = articleNode.querySelector(".article_detail_date");
    // const nutritionNode = articleNode.querySelector(".article_detail_nutrition");
    // const cheeseTypeNode = articleNode.querySelector(".article_detail_cheese_type");
    // const ratingNode = articleNode.querySelector(".article_detail_rating");

    // const titleNode = articleNode.querySelector(".article_title");
    // const imageNode = articleNode.querySelector(".article_image");
    // const descriptionNode = articleNode.querySelector(".article_description");

    // // set attributes
    // dateNode.textContent = article["date"];
    // nutritionNode.textContent = article["calOz"] + " Cal/Oz";
    // cheeseTypeNode.textContent = article["type"];
    // ratingNode.textContent = article["rating"];

    // titleNode.textContent = article["title"];
    // imageNode.setAttribute("src", article["imgSrc"]);
    // imageNode.setAttribute("alt", article["imgAlt"]);
    // descriptionNode.textContent = article["description"];
	
// }

// template go bye-bye
templateArticleNode.remove();