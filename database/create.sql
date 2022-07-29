create database agenda_telefonica;

use agenda_telefonica;

create table Contato (
    id serial primary key, 
    telefone text not null,
    nome text not null,
    email text not null,
    imagem text,
    data_cadastro timestamp default now()
);