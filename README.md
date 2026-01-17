📝 TaskMaster APIA lightweight, robust RESTful Todo API built with Node.js, TypeScript, and Express. This project demonstrates clean routing, TypeScript type safety (including strict optional property checks), and CRUD operations.🚀 FeaturesFull CRUD: Create, Read, Update, and Delete todos.Toggle Status: Dedicated endpoint to toggle completion status.Filtering: Filter todos by completion status via query parameters.Strict Typing: Built with TypeScript for enhanced developer experience and fewer runtime bugs.In-Memory Storage: Fast prototyping using an in-memory data store.🛠️ Tech StackLanguage: TypeScriptFramework: Express.jsRuntime: Node.jsTesting/Tooling: Postman (Recommended for testing)🚦 Getting StartedPrerequisitesNode.js (v16.x or higher)npm or yarnInstallationClone the repository:Bashgit clone https://github.com/yourusername/todo-api-typescript.git
cd todo-api-typescript
Install dependencies:Bashnpm install
Start the development server:Bashnpm run dev
📡 API EndpointsTodosMethodEndpointDescriptionGET/todosFetch all todos (supports ?completed=true/false)GET/todos/:idGet a specific todo by IDPOST/todosCreate a new todoPUT/todos/:idUpdate an existing todoPATCH/todos/:id/toggleToggle the completed statusDELETE/todos/:idRemove a todoRequest Example (POST)URL: http://localhost:3000/todosBody (JSON):JSON{
    "title": "Finish README",
    "description": "Write a nice documentation for the GitHub repo"
}
📂 Project StructurePlaintext├── src/
│   ├── types/
│   │   └── todo.ts      # TypeScript interfaces/DTOs
│   ├── routes/
│   │   └── todoRoutes.ts # Todo logic & endpoints
│   └── app.ts           # Server entry point
├── tsconfig.json        # TypeScript configuration
└── package.json
🔧 ConfigurationThis project uses strict TypeScript rules, specifically:exactOptionalPropertyTypes: true - Ensures that optional properties aren't accidentally assigned undefined if they aren't explicitly allowed.
