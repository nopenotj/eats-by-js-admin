import * as React from "react";
import { 
    List,
    Datagrid,
    TextField,
    NumberField,
    BooleanField,
    TextInput,
    NumberInput,
    BooleanInput,
    SimpleForm,
    Edit,
    Create,
    ReferenceArrayField,
    ReferenceArrayInput,
    SingleFieldList,
    ChipField,
    AutocompleteArrayInput,
} from 'react-admin';

export const RestaurantList = props => (
    <List {...props} asdf={console.log(props)}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <NumberField source="rating" />
            <NumberField source="price" />
            <TextField source="image_link" />
            <TextField source="location" />
            <TextField source="operating_hours" />
            <NumberField source="no_of_stalls" />
            <BooleanField source="halal_certified" />
            <TextField source="closed_on" />
            <TextField source="contact" />
            <ReferenceArrayField label="Tags" reference="tags" source="tags_id">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </Datagrid>
    </List>
);

export const RestaurantCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <NumberInput source="rating" />
            <NumberInput source="price" />
            <TextInput source="image_link" />
            <TextInput source="location" />
            <TextInput source="operating_hours" />
            <NumberInput source="no_of_stalls" />
            <BooleanInput source="halal_certified" />
            <TextInput source="closed_on" />
            <TextInput source="contact" />
        </SimpleForm>
    </Create>
);

export const RestaurantEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput multiline source="description" />
            <NumberInput source="rating" />
            <NumberInput source="price" />
            <TextInput source="image_link" />
            <TextInput source="location" />
            <TextInput source="operating_hours" />
            <NumberInput source="no_of_stalls" />
            <BooleanInput source="halal_certified" />
            <TextInput source="closed_on" />
            <TextInput source="contact" />
            <ReferenceArrayInput label="Tags" reference="tags" source="tags_id">
                <AutocompleteArrayInput />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);
