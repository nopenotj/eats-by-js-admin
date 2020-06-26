import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

export default (apiUrl) => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        const query = {
            // sort: JSON.stringify([field, order]),
            // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            // filter: JSON.stringify(params.filter),
            per_page: JSON.stringify(perPage),
            page: JSON.stringify(page),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {

            return {
                data: json.data.map(value => {
                    const rs = {}
                    if(value.relationships) {
                        for (const [k, v] of Object.entries(value.relationships)) {
                            Object.assign(rs, { [`${k}_id`] : v.data.map(e => e.id)})
                        }
                    }
                    
                    return Object.assign(
                        { id: value.id },
                        {
                            ...value.attributes,
                            ...rs,
                        }
                    )
                }),
                total: json.meta.total_count
            }
        });
    },

    getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ 
            data: json.data.map(value => Object.assign(
                {id : value.id},
                value.attributes
            ))
        }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            // sort: JSON.stringify([field, order]),
            // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            // filter: JSON.stringify({
            //     ...params.filter,
            //     [params.target]: params.id,
            // }),
            per_page: JSON.stringify(perPage),
            page: JSON.stringify(page),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data.map(value => Object.assign(
              { id: value.id },
              value.attributes,
            )),
            total: json.meta.total_count
        }));
    },

    update: (resource, params) => {
        const data = {
            data: {
                id: params.id,
                type: resource,
                attributes: params.data,
            },
        };
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }).then(({ json }) => ({ data: json, id: params.id }))
    },

    updateMany: (resource, params) => {
        const data = {
            data: {
                id: params.id,
                type: resource,
                attributes: params.data,
            },
        };
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify({
                data: { type: resource, attributes: params.data },
            }),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.data.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    }
});
