import * as React from "react";
import { List, Datagrid, TextField, NumberField,  TextInput,  SimpleForm, Edit, Create } from 'react-admin';


export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <NumberField source="role" />
            <TextInput source="restaurant_id" />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="username" />
            <TextInput source="role" />
            <TextInput source="restaurant_id" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="password" />
            <TextInput source="role" />
            <TextInput source="restaurant_id" />
        </SimpleForm>
    </Create>
);

