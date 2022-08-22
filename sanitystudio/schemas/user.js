export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'url'
        },
        {
            // this is only if you use credentials provider
            name: 'password',
            type: 'string',
            hidden: true
        },
        {
            name: 'admin',
            title: 'Admin',
            type: 'boolean'
        },
    ]
};