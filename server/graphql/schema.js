const { projects, clients } = require('../sampleData');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql'); 

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { 
            type: ClientType,
            resolve: (parent, args) => clients.find(client => client.id === parent.clientId)
        }
    })
});

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: GraphQLList(ClientType),
            resolve: (parent, args) => clients
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID }},
            resolve: (parent, args) => clients.find(client => client.id === args.id)
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve: (parent, args) => projects
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID }},
            resolve: (parent, args) => projects.find(project => project.id === args.id)
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});