const APIkey = "f0f4ddcabbbd4e5286c67b4e7a6cc74b";

const blogsection = document.getElementById("blog-section");
const serchText = document.getElementById("serch-text");
const searchBtn = document.getElementById("search-btn");
//show random data
fetchRandomData = async () => {
    try {
        const apiUrl = 'https://newsapi.org/v2/everything?q=apple&from=2024-10-29&to=2024-10-29&sortBy=popularity&pageSize=10&apiKey=' + APIkey;
     const fetchedData = await  fetch(apiUrl);
        const response = await fetchedData.json();
        return response.articles;
    } catch (err) {
        console.error("error fething data ",err);
    }
}
//search data according to given query
searchData = async (query) => {
    try {
        const apiUrl = 'https://newsapi.org/v2/everything?q='+query+'&pageSize=10&apiKey=' + APIkey;
     const fetchedData = await  fetch(apiUrl);
        const response = await fetchedData.json();
        return response.articles;
    } catch (err) {
        console.error("error fething data ",err);
    }   
}
//to serch articals
searchBtn.addEventListener("click", async () => {
    try {
        const query = serchText.value.trim();
        if (query !== "") {
            const data =await searchData(query);
            displayCard(data);   
        }
        
      
    } catch (err) {
        console.error(err);
    }
});
//create cards for fetchedd data
displayCard = (articles) => {
    blogsection.innerHTML = "";
    //create elemants
    articles.forEach((artical) => {
        const card = document.createElement("div");
        const content = document.createElement("div");
        card.classList.add("blog");
        content.classList.add("title");
        const img = document.createElement("img");
        img.src = artical.urlToImage;
        img.alt = artical.title;
        const title = document.createElement("h2");
        title.textContent = artical.title;
        const discription = document.createElement("p");
        discription.textContent = artical.description;
        content.appendChild(title);
        content.appendChild(discription);
       //append elemants
        card.appendChild(img);
        card.appendChild(content);
        //navigate to full artical
        card.addEventListener("click", () => {
            window.open(artical.url, "_blank");
        });
        blogsection.appendChild(card);
        
    });
   
}
//display fetched data
(async () => {
    try {
        const data = await fetchRandomData();
        displayCard(data);
    } catch (err) {
        console.log(err);
    }
})();
