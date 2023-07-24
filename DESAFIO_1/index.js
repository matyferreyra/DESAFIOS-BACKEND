class ProductManager {

    constructor() {

        this.products = [];

    }

    addProduct(title, description, price, thumbnail, code, stock) { //ESTE METODO ES PARA AGREGAR UN NUEVO PRODUCTO, HACIENDO LAS VALIDACIONES CON LOS OTROS METODOS DECLARADOS.

        if (this.products.some((product) => product.code === code)) {

            console.warn("El código del producto ya existe.Vuelve a intentarlo con otro código");

            return;

        }

        if (!title || !description || !price || !thumbnail || !code || !stock) {

            console.warn("Todos los campos son obligatorios.Completarlos para poder avanzar");

            return;

        } else {

            const product = { id: this.getId(), title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock }

            this.products.push(product);

            console.log("¡Congratulations!.New product added");

        }

    }

    getId() { //ESTE MÉTODO ES PARA AUTOINCREMENTAR EL ID

        let max = 0

        this.products.forEach(product => {

            max = product.id > max && product.id;

        })

        return (max++); //RETORNA EL "ID" MÁXIMO QUE EXISTA EN ESE MOMENTO Y LE SUMA 1 MAS (PARA NO REPETIR "ID" Y TENER UN NUEVO MÁXIMO).

    }

    getProductById() { //ESTE MÉTODO ES PARA VERIFICAR SI HAY O NO DUPLICIDAD DE ID

        const product = this.products.find(product => product.id === id);

        if (product) {

            return product;

        } else {

            console.log("ID Not Found");

        }

    }

    validateCode(code) { //ESTE METODO VALIDA DE QUE NO SE REPITA EL CAMPO "CODE"

        return this.product.some(product => product.code === code);

    }

    getProducts() { //ESTE MÉTODO ES PARA DEVOLVER TODO EL ARRAY DE PRODUCTOS QUE EXISTA

        return this.products;

    }

}

//A PARTIR DE ACÁ HACEMOS UN TESTING DEL ALGORITMO

const productManager = new ProductManager();

productManager.addProduct("Fernet", "Bebida espirituosa", 1800, "thumbnail1.jpg", "3", 9);

productManager.addProduct("Ron", "bebida de los piratas", 2150, "thumbnail2.jpg", "2", 7);

productManager.addProduct("Vodka", "bebida de los soldados rusos", 1500, "thumbnail3.jpg", "1", 11);

console.log(productManager.getProducts());