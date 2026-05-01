let select = document.querySelector("select");
let logo = document.getElementById("logo");

let all = document.querySelectorAll("*");

select.addEventListener("change", changeTheme)



function changeTheme(){

    // resets theme
    for (let i = 0; i < all.length; i++){
        all[i].classList.remove("dark");
        all[i].classList.remove("cheese");
    }
    logo.setAttribute("src","images/byui-logo-blue.webp");

    switch(select.value){
        // case "light":
        //     for (let i = 0; i < all.length; i++){
        //         all[i].classList.remove("dark");
        //     }
        //     logo.setAttribute("src","images/byui-logo-blue.webp");
            
        //     break;
        case "dark":
            logo.setAttribute("src","images/byui-logo-white.png");
            for (let i = 0; i < all.length; i++){
                all[i].classList.add("dark");
            }

            break;
        case "cheese":
            logo.setAttribute("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofjV94WR8eDhDcizhc_2WoxqxaNSZV-k8_Q&s");
            for (let i = 0; i < all.length; i++){
                all[i].classList.add("cheese");
            }

    }
}