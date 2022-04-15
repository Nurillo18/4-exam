const firstList = document.querySelector(".first-list");
const secoundList = document.querySelector(".secound-list");
const thirdList = document.querySelector(".third-list");
const loaderImg = document.querySelector(".loading-img");
const loaderLast = document.querySelector(".loading-img-last");


async function exam() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {


        function renderFirst(arr, element){
            element.innerHTML = "";
            for(let fistItem of arr){
                var item = document.createElement("li");
                const basicId = document.createElement("p");
                const firstTitle = document.createElement("h3");
                const lastName = document.createElement("h4");
                const firstCompany = document.createElement("p");
                const firstTime = document.createElement("a");
                const firstEmail = document.createElement("a");
                const firstGeo = document.createElement("a");
                const firstWebSite = document.createElement("a");

                basicId.textContent = fistItem.id;
                basicId.classList.add("first-id");

                firstTitle.textContent = fistItem.name;
                firstTitle.classList.add("title-fr")
                item.classList.add("first-list__item");
                item.dataset.fistID = fistItem.id;

                lastName.textContent = fistItem.username;
                lastName.classList.add("first-lastname");

                firstCompany.textContent = `${fistItem.company.name} ${fistItem.company.catchPhrase} ${fistItem.company.bs}`;
                firstCompany.classList.add("first-company");

                firstTime.textContent = fistItem.phone;
                firstTime.classList.add("first-time");
                firstTime.setAttribute("href" , `tel:${fistItem.phone}`)

                firstEmail.textContent = fistItem.email;
                firstEmail.classList.add("first-email")
                firstEmail.setAttribute("href" , `mailto:${fistItem.email}`)

                firstGeo.textContent = "Geo Location";
                firstGeo.classList.add("first-location")
                firstGeo.setAttribute("href" , `https://www.google.com/maps/place/${fistItem.address.geo.lat},${fistItem.address.geo.lng}`)
                firstGeo.setAttribute("target", "_blank")

                firstWebSite.textContent = fistItem.website;
                firstWebSite.classList.add("first-website");
                firstWebSite.setAttribute("href" , "#")

                item.appendChild(basicId)
                item.appendChild(firstTitle);
                item.appendChild(lastName);
                item.appendChild(firstCompany);
                item.appendChild(firstTime);
                item.appendChild(firstEmail);
                item.appendChild(firstGeo);
                item.appendChild(firstWebSite);
                element.appendChild(item);




            }
            firstList.addEventListener("click" , evt => {
                loaderImg.classList.add("lastBlock")
                if(evt.target.closest("li")){

                    let  arrey = []

                    fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(response => response.json())
                    .then(data => {

                        data.forEach(el => {
                            const firsID = evt.target.dataset.fistID;
                            const findEl =  el.userId == firsID;

                            if(findEl){

                                if(!arrey.includes(el)){
                                    arrey.push(el)
                                }

                                function render(arr, element) {
                                    element.innerHTML = "";
                                    arr.forEach(t => {
                                        const postItem = document.createElement("li");
                                        const postTitile = document.createElement("h3");
                                        const postText  = document.createElement("p");

                                        postItem.classList.add("post-item");
                                        postItem.dataset.postID = t.id;

                                        postTitile.textContent = t.title;
                                        postTitile.classList.add("post-title");

                                        postText.textContent = t.body;
                                        postText.classList.add("post-text")

                                        postItem.appendChild(postTitile);
                                        postItem.appendChild(postText);
                                        element.appendChild(postItem)

                                    })
                                }


                                render(arrey, secoundList)


                            }


                        })



                    })
                    secoundList.addEventListener("click" , evt => {
                        loaderLast.classList.add("block")
                        if(evt.target.closest(".post-item")){
                            const thirdArr = [];


                            async function last(){
                                fetch("https://jsonplaceholder.typicode.com/comments")
                                .then(responce => responce.json())
                                .then(data => {


                                    data.forEach(elm => {
                                        const lastId = evt.target.dataset.postID;
                                        const findLast = elm.postId == lastId;

                                        console.log(findLast);
                                        if(findLast) {


                                            if(!thirdArr.includes(elm)){
                                                thirdArr.push(elm);

                                            }

                                            function renderLast(arr, element) {
                                                element.innerHTML = "" ;
                                                arr.forEach(e => {
                                                    const lastLi = document.createElement("li");
                                                    const lastTitle = document.createElement("h4");
                                                    const lastGmail = document.createElement("a");
                                                    const lastText = document.createElement("p");

                                                    lastLi.classList.add("last-item");

                                                    lastTitle.textContent = e.name;
                                                    lastTitle.classList.add("last-title");

                                                    lastGmail.textContent = e.email;
                                                    lastGmail.classList.add("last-gmail");
                                                    lastGmail.setAttribute("href", `mailto:${e.email}`)

                                                    lastText.textContent = e.body;
                                                    lastText.classList.add("last-text");

                                                    lastLi.appendChild(lastTitle);
                                                    lastLi.appendChild(lastGmail);
                                                    lastLi.appendChild(lastText);
                                                    element.appendChild(lastLi);
                                                })
                                            }
                                            renderLast(thirdArr,thirdList )
                                        }

                                    })
                                })
                            }
                            last()

                        }
                    })
                }





            })

        }
        renderFirst(data, firstList)
    });
}
exam()
