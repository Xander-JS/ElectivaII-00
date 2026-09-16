import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

interface Categoria {
    id: number;
    nombre: string;
}

interface Producto {
    id: string;
    stock: boolean;
    vencido: boolean;
    categoria: Categoria;
}

@Controller('productos')
export class ProductosController {

    private productos: Producto[] = [
        {
            id: '1',
            stock: true,
            vencido: false,
            categoria: {
                id: 1,
                nombre: 'Electrónica',
            },
        },
        {
            id: '2',
            stock: true,
            vencido: false,
            categoria: {
                id: 2,
                nombre: 'Hogar',
            },
        },
        {
            id: '3',
            stock: false,
            vencido: true,
            categoria: {
                id: 2,
                nombre: 'Hogar',
            },
        },
        {
            id: '4',
            stock: true,
            vencido: false,
            categoria: {
                id: 3,
                nombre: 'Deportes',
            },
        },
        {
            id: '5',
            stock: false,
            vencido: true,
            categoria: {
                id: 1,
                nombre: 'Electrónica',
            },
        },
        {
            id: '6',
            stock: true,
            vencido: false,
            categoria: {
                id: 3,
                nombre: 'Deportes',
            },
        },
        {
            id: '7',
            stock: true,
            vencido: false,
            categoria: {
                id: 3,
                nombre: 'Deportes',
            },
        },
        {
            id: '8',
            stock: false,
            vencido: true,
            categoria: {
                id: 2,
                nombre: 'Hogar',
            },
        },
        {
            id: '9',
            stock: true,
            vencido: false,
            categoria: {
                id: 3,
                nombre: 'Deportes',
            },
        },
        {
            id: '10',
            stock: true,
            vencido: false,
            categoria: {
                id: 1,
                nombre: 'Electrónica',
            },
        },
    ];


    // ==========================================
    // Obtener todos los productos
    // GET /productos
    // ==========================================
    @Get()
    getProductos() {
        return this.productos;
    }


    // ==========================================
    // Buscar producto por ID
    // GET /productos/1
    // ==========================================
    @Get(':id')
    getProductosById(@Param('id') id: string) {

        const producto = this.productos.find(
            (producto) => producto.id === id
        );

        if (producto) {
            return producto;
        }

        return {
            message: 'Producto no encontrado',
        };
    }


    // ==========================================
    // Filtrar por STOCK
    // GET /productos/stock/true
    // GET /productos/stock/false
    // ==========================================
    @Get('stock/:stock')
    getProductosStock(@Param('stock') stock: string) {

        const valorStock = stock === 'true';

        return this.productos.filter(
            (producto) => producto.stock === valorStock
        );
    }


    // ==========================================
    // Filtrar por VENCIDO
    // GET /productos/vencido/true
    // GET /productos/vencido/false
    // ==========================================
    @Get('vencido/:vencido')
    getProductosVencido(@Param('vencido') vencido: string) {

        const valorVencido = vencido === 'true';

        return this.productos.filter(
            (producto) => producto.vencido === valorVencido
        );
    }


    // ==========================================
    // Filtrar por CATEGORÍA
    // GET /productos/categoria/1
    // GET /productos/categoria/2
    // GET /productos/categoria/3
    // ==========================================
    @Get('categoria/:categoria')
    getProductosCategoria(@Param('categoria') categoria: string) {

        const idCategoria = Number(categoria);

        return this.productos.filter(
            (producto) => producto.categoria.id === idCategoria
        );
    }


    // ==========================================
    // Crear un producto
    // POST /productos
    // ==========================================
    @Post()
    crearProducto(@Body() producto: Producto) {
        const nuevoProducto: Producto = {
            ...producto,
            id: Math.random().toString(36).substring(2, 9),
        };
        this.productos.push(nuevoProducto);
        return {
            message: 'Producto creado exitosamente',
            data: nuevoProducto,
        };
    }

    // ==========================================
    // Actualizar un producto
    // PUT /productos/1
    // ==========================================
    @Put(':id')
    actualizarProducto(@Param('id') id: string, @Body() producto: Partial<Producto>) {
        const productoIndex = this.productos.findIndex(
            (producto) => producto.id === id
        );
        if (productoIndex !== -1) {
            const productoActualizado: Producto = {
                ...this.productos[productoIndex],
                ...producto,
                id,
            };
            this.productos[productoIndex] = productoActualizado;
            return {
                message: 'Producto actualizado exitosamente',
                data: productoActualizado,
            };
        }
        return {
            message: 'Producto no encontrado',
        };
    }

    // ==========================================
    // Eliminar un producto
    // DELETE /productos/1
    // ==========================================
    @Delete(':id')
    eliminarProducto(@Param('id') id: string) {
        const producto = this.productos.find((producto) => producto.id === id);
        if (producto) {
            this.productos = this.productos.filter((producto) => producto.id !== id);
            return {
                message: 'Producto eliminado exitosamente',
            };
        }
        return {
            message: 'Producto no encontrado',
        };
    }
}
