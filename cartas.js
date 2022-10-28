class Carta{
    constructor(nombre,rareza,imagen,desc){
        this.nombre = nombre;
        this.rareza = rareza;
        this.imagen = imagen;
        this.desc = desc;
    }
}

class Interfaz{
    agregarCarta(carta){

        let imagen ;
        carta.imagen == undefined ? imagen = "imagen-vacia.jpg" : imagen = carta.imagen.name;

        const cardsContainer = document.getElementById('card-container');
        let cartas = document.querySelectorAll('.card');
        let newCartas = Array.from(cartas);

        let isExist ;
        newCartas.forEach(element => {
            if(carta.nombre == element.id){
                isExist = true;
            }
        });
        if(!isExist){
            const element = document.createElement('div');
    
            element.innerHTML = `
            <div class="card" id="${carta.nombre}">
                <h2 class="card-title">${carta.nombre}</h2>
                <h3 class="card-rareza">Rareza: ${carta.rareza}*</h3>
                <img class="card-img" src="./img/${imagen}" alt="">
                <p class="card-text">${carta.desc}</p>
                <button name="borrar-carta" class="boton-borrar">BORRAR</button>
            </div>
            `;
            cardsContainer.appendChild(element);
        }
    }

    borrarCarta(element){
        if(element.name === "borrar-carta"){
            element.parentElement.remove();
        }
    }

    listaCartas(lista){
        let array = Array.from(lista);

        let newArray = array.map((item)=>{
            let carta =  {
                nombre : item.querySelector('.card-title').innerText,
                rareza : item.querySelector('.card-rareza').innerText,
                imagen : item.querySelector('.card-img').getAttribute('src'),
                descripcion : item.querySelector('.card-text').innerText
            }

            if(carta.imagen === undefined){
                carta.imagen = "imagen-vacia.jpg"
            }

            return carta
        })

        localStorage.setItem('cartas', JSON.stringify(newArray));
    }
}

const interfaz = new Interfaz();
const botonGuardar = document.getElementById("guardar");


document.getElementById("cards-form").addEventListener("submit", function(event){
    const newName = document.getElementById('nombre').value;
    const rareza = document.getElementById('rareza').value;
    let imagen = document.getElementById('imagen').files[0];
    const newDesc = document.getElementById('descripcion').value;

    const listadoDeCartas = document.querySelectorAll('.card');



    const carta = new Carta(newName,rareza,imagen,newDesc);


    let element = interfaz.agregarCarta(carta);

    event.preventDefault();
});

document.getElementById("card-container").addEventListener("click",function(e){
    const interfaz = new Interfaz();
    interfaz.borrarCarta(e.target)
});

botonGuardar.addEventListener("click",()=>{
    conjuntoCartas = document.querySelectorAll('.card');
    interfaz.listaCartas(conjuntoCartas);
})

window.addEventListener("load",()=>{
    const cartas = JSON.parse(localStorage.getItem("cartas"));
    if(cartas == null){
        return;
    }
    //////////////////////
    
    const cardsContainer = document.getElementById('card-container');

    
    const arrayElements = [];
    
    cartas.forEach(carta => {
        let element = document.createElement('div');

        element.innerHTML = `
        <div class="card" id="${carta.nombre}">
            <h2 class="card-title">${carta.nombre}</h2>
            <h3 class="card-rareza">Rareza: ${carta.rareza}*</h3>
            <img class="card-img" src="${carta.imagen}" alt="">
            <p class="card-text">${carta.desc}</p>
            <button name="borrar-carta" class="boton-borrar">BORRAR</button>
        </div>
        `;

        arrayElements.push(element);
        cardsContainer.appendChild(element);
    });
    
})