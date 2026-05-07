# language: es
Característica: Proceso de compra en Sauce Labs

  Escenario: Compra exitosa del producto Sauce Labs Fleece Jacket
    Dado que el usuario ingresa a la página de Sauce Labs
    Y realiza el login con credenciales válidas
    Cuando localiza el producto "Sauce Labs Fleece Jacket"
    Y almacena el nombre y precio del producto
    Y añade el producto al carrito
    Entonces valida que el nombre y precio en el carrito coincidan
    Y completa el proceso de compra
    Y confirma que la orden fue realizada exitosamente