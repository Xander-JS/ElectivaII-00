import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'Juan',
      email: 'juan@gmail.com',
    },
    {
      id: '2',
      name: 'Pedro',
      email: 'pedro@gmail.com',
    },
    {
      id: '3',
      name: 'Ana',
      email: 'ana@gmail.com',
    },
    {
      id: '4',
      name: 'Carlos',
      email: 'carlos@gmail.com',
    },
    {
      id: '5',
      name: 'Maria',
      email: 'maria@gmail.com',
    },
    {
      id: '6',
      name: 'Laura',
      email: 'laura@gmail.com',
    },
    {
      id: '7',
      name: 'Andres',
      email: 'andres@gmail.com',
    },
    {
      id: '8',
      name: 'Sofia',
      email: 'sofia@gmail.com',
    },
    {
      id: '9',
      name: 'Daniel',
      email: 'daniel@gmail.com',
    },
    {
      id: '10',
      name: 'Camila',
      email: 'camila@gmail.com',
    },
    {
      id: '11',
      name: 'Luis',
      email: 'luis@gmail.com',
    },
  ];

  @Get()
  getUsers() {
    return this.users;
  }


  @Get(":id")
  getUsersById(@Param("id") id: string) {
    console.log(".:: User ID", id);

    const user = this.users.find((user) => user.id === id);

    if (user) {
      console.log(".:: usuario buscado", user);
      return user;
    }

    return {
      message: "Usuario no encontrado",
    };
  }

  @Get("search/:name")
  getUsersByName(@Param("name") name: string) {
    const user = this.users.find((u) => u.name.toLowerCase() === name.toLowerCase(),);
    if (user) {
      console.log(".:: usuario buscado", user);
      return user;
    }
    return {
      message: "Usuario no encontrado",
    };
  }

  @Post()
  crearUsuario(@Body() user: User) {
    console.log(".:: Usuario a crear:", user);

    // Validar si el usuario ya existe por id o por email
    const existe = this.users.find(
      (u) => (user.id && u.id === user.id) || u.email === user.email,);

    if (existe) {
      return {
        message: "Usuario ya existe",
      };
    }

    // Asignar ID si no viene en el body
    const newUser: User = { ...user, id: user.id || Math.random().toString(36).substring(2, 9), };

    // Agregar el nuevo usuario a la lista (una sola vez)
    this.users.push(newUser);

    return {
      message: "Usuario creado exitosamente",
      data: newUser,
    };
  }

  @Delete(":id")
  eliminarUsuario(@Param("id") id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
      return {
        message: "Usuario eliminado exitosamente",
      };
    }
    return {
      message: "Usuario no encontrado",
    };
  }

  @Put(":id")
  actualizarUsuario(@Param("id") id: string, @Body() user: Partial<User>) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      // Mantener los datos actuales y el ID de la URL
      const usuarioActualizado: User = {
        ...this.users[userIndex],
        ...user,
        id,
      };

      this.users[userIndex] = usuarioActualizado;

      return {
        message: "Usuario actualizado exitosamente",
        data: usuarioActualizado,
      };
    }
    return {
      message: "Usuario no encontrado",
    };
  }
}
