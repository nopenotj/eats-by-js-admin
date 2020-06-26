import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import dataProvider from './dataProvider'
import { RestaurantList, RestaurantEdit, RestaurantCreate } from './restaurants'
import { UserList, UserEdit, UserCreate } from './users'
import { TagList,  TagCreate } from './tags'
import authProvider from './authProvider'

const domain = 'https://eats-by-js-api.herokuapp.com/'
// const domain = 'http://localhost:3000/'
const App = () => 
    (
        <Admin dataProvider={dataProvider(domain)} authProvider={authProvider(domain)}>
            <Resource name="restaurants" list={RestaurantList} edit={RestaurantEdit} create={RestaurantCreate}/>
            <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}/>
             <Resource name="tags" list={TagList} create={TagCreate}/> 
        </Admin>
    )
    

export default App;
