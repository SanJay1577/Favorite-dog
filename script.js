let button = document.querySelector("#btn");
let pic = document.querySelector("#photo");
const url = "https://dog.ceo/api/breeds/image/random"
button.addEventListener("click", ()=>{
const fetchData = async function (){
  try{
    const response = await fetch(url);
    const data = await response.json();
    pic.src = data.message;
  } catch (error){
    console.log(error);
  }
}
fetchData();
});

let addFav = document.querySelector("#add-fav");
const localUrl = "http://localhost:3000/dogs";

  function renderDog(dog){
    let favContainer = document.querySelector("#favorites");
    let cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.innerHTML = `
    <img src="${dog.image}"/>
    <button data-id='${dog.id}' class="delete-btn">Remove</button>
    `;
    favContainer.appendChild(cardContainer);
  }
    function renderAll(dogs){
        dogs.forEach((dog)=>renderDog(dog))
    }

    fetch(localUrl)
    .then((res)=>(res.json()))
    .then((dogs)=>(renderAll(dogs)));

   let dogsite = document.querySelector("body");
    dogsite.addEventListener("click", (e)=>{
        let dogUrl = pic.src;
        data = {image:dogUrl};
        e.preventDefault();
        if(e.target.className === "add-fav"){
            fetch(`${localUrl}`,{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-type":"application/json; charset=UTF-8"
                },
            })
            .then((resp)=>resp.json())
            .then((dog)=> (renderDog(dog)));
        }

        if(e.target.className === "delete-btn"){
            let id = parseInt(e.target.dataset.id);
            let parent = e.target.parentNode;
            parent.remove();
            
            fetch(`${localUrl}/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                },
            })
        }
    })

 


