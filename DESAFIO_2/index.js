const fs = require("fs");

class ProductManager {

    constructor() {

        this.products = [];
        this.path = "Products.json";
        this.generateFile();

    }

    generateFile(){
        if (fs.existsSync(this.path)); {
            fs.writeFileSync(this.path,JSON.stringify(this.products));
        }
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
            this.products = this.getFileProducts(); //ACTUALIZO THIS.PRODUCTS CON EL CONTENIDO QUE HAY PARA DP PUSHEAR
            this.products.push(product);
            this.saveFileProducts(); //PISAMOS EL ARCHIVO CON EL ARRAY ACTUALIZADO
            console.log("¡Congratulations!. New product added");
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
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8")); //PRIMERO LEEMOS EL ARCHIVO PARA LEVANTAR EL ARRAY DE PRODUCTOS QUE HAYA
        
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

    updateProduct(id, product){
        this.products = this.getFileProducts(); //ESTE ULTIMO MÉTODO ES EQUIVALENTE Y MÁS SIMPLIFICADO QUE HACER UN ==> JSON.parse(fs.readFileSync(this.path, "utf-8")); QUE YA DE POR SI LO ESTAMOS DECLARANDO PARA REUTILIZAR EN EL MÉTODO "GETPRODUCTS".
    
        let position = this.products.findIndex(item => item.id == id);

        if (position > -1) {
            this.products[position].title = product.title;
            this.products[position].description = product.description;
            this.products[position].price = product.price;
            this.products[position].thumbnail = product.thumbnail;
            this.products[position].code = product.code;
            this.products[position].stock = product.stock;
            this.saveFileProducts(); //PISAMOS EL ARCHIVO CON EL ARRAY ACTUALIZADO.
            console.log("Product update");
        } else {
            console.log("Error. Product not found!");
        }
    }

    deleteProduct(id){ //USAMOS EL METODO FINDINDEX Y SPLICE PARA QUE PRIMERO ENCUENTRE LA POSICION DEL ELEMENTO QUE QUEREMOS BORRAR Y LUEGO USAMOS EL SPLICE PARA REUNIFICAR EL ARRAY QUITANDO EL ELEMENTO QUE PASEMOS (TAMBIEN PODRIAMOS HABER HECHO UN DELETE USANDO EL EL METODO FILTER)
        this.products = this.getFileProducts();
        let position = this.products.findIndex(item => item.id == id); //EL METODO FINDINDEX DEVUELVE -1 SI NO LO ENCUENTRA, ES DECIR QUE A PARTIR DE AHI EN LA VALIDACION ENTRARIA POR EL MENSAJE "PRODUCT NOT FOUND".

        if (position > -1){
            this.products.splice(position,1); //PASAMOS LA POSICION DEL ELEMENTO A ELIMINAR, Y CUANTOS ELEMENTOS QUEREMOS ELIMINAR.
            this.saveFileProducts(); 
        console.log("Product #" + id + "deleted!");
        } else {
            console.log("Error. Product not found!");
        }
        
        
    }

    getFileProducts() { //ESTE MÉTODO ES PARA DEVOLVER TODO EL ARRAY DE PRODUCTOS QUE EXISTA EN EL ARCHIVO
        let products = JSON.parse(fs.readFileSync(this.path,"utf-8"));

        return products;
    }

    saveFileProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products)); //METEDO QUE DECLARAMOS PARA PISAR EL ARCHIVO CON EL ARRAY ACTUALIZADO.
    }
}



//A PARTIR DE ACÁ HACEMOS UN TESTING DEL ALGORITMO

const productManager = new ProductManager();
productManager.addProduct("Fernet", "Bebida espirituosa", 1800, "thumbnail1.jpg", "3", 9);
productManager.addProduct("Ron", "bebida de los piratas", 2150, "thumbnail2.jpg", "2", 7);
productManager.addProduct("Vodka", "bebida de los soldados rusos", 1500, "thumbnail3.jpg", "1", 11);
console.log(productManager.getFileProducts());