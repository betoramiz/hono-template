# Presentation Layer Skill

## Responsibilities
- Serves as the entry point of the application for external clients.
- Handles HTTP routing, request validation, and response formatting.
- Bridges the gap between HTTP requests and Core Use Cases.

## Rules & Guidelines
- **Web Framework**: Uses `Hono` as the core HTTP framework.
- **Validation**: Use `@hono/zod-validator` combined with the Zod schemas defined in the Core use cases to validate incoming requests (body, query, parameters).
- **Dependency Resolution**: Retrieve the Awilix container from the Hono context (`c.get('container')`) to resolve the required use case command.
- **Execution & Responses**: Execute the resolved use case. Since use cases return a `neverthrow` `Result`, use `.match()` to handle the output: return standard HTTP status codes (200, 201) on success, and use utility functions like `errorToResponse` to map domain errors to standard HTTP error responses.
- **No Business Logic**: The presentation layer must only coordinate data flow. It MUST NOT contain any business rules or direct database access.
