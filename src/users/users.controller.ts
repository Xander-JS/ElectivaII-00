import { Controller, Get, Param } from '@nestjs/common';

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
        const user = this.users.find((user) => user.name === name);
    if (user) {
        console.log(".:: usuario buscado", user);
        return user.email;
    }
    return {
        message: "Usuario no encontrado",
    };
    }

}
