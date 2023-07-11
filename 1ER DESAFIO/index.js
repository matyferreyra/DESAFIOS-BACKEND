class ProductManager {
    constructor () { 
        this.products = [];
    }

    addProduct (title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail ||!code ||code || !stock){
            console.warn("Todos los campos son obligatorios. Completarlos para poder avanzar");
            return;
        }

        if (this.products.some((product) => product.code === code)) {
            console.warn ("El código de producto ya existe");
            return;
        }

        const product = {id:this.getId(), title:title, description:description, price:price, thumbnail:thumbnail, code:code, stock:stock}
        this.products.push(product);
    }
    
    getId () { //ESTE MÉTODO ES PARA AUTOINCREMENTAR EL ID
        let max = 0

        this.products.forEach(product => {
            max = product.id > max && product.id;
        })

        return (max ++);
    }

    getProducts () { //ESTE MÉTODO ES PARA DEVOLVER TODO EL ARRAY DE PRODUCTOS QUE EXISTA
        return this.products;
    }

    getProductById () { //ESTE MÉTODO ES PARA VERIFICAR SI HAY O NO DUPLICIDAD DE ID
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
        console.log("ID Not Found");
        }        
    }

}

//A PARTIR DE ACÁ HACEMOS UNA PRUEBA DEL ALGORITMO

const productManager = new ProductManager();
productManager.addProduct("Fernet", "Bebida espirituosa", 1800, "thumbnail1.jpg", "3", 9);
productManager.addProduct("Ron", "bebida de los piratas", 2150, "thumbnail2.jpg", "2", 7);
productManager.addProduct("Vodka", "bebida de los soldados rusos", 1500, "thumbnail3.jpg", "1", 11);
console.log(productManager.products());