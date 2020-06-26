import * as React from "react";
import { 
    List,
    Datagrid,
    TextField,
    TextInput,
    NumberInput,
    BooleanInput,
    SimpleForm,
    Create,
} from 'react-admin';

export const TagList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
        </Datagrid>
    </List>
);

export const TagCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);
