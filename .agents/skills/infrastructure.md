# Infrastructure Layer Skill

## Responsibilities
- Implements the interfaces (Ports) defined in the Core layer (e.g., Repositories).
- Handles interactions with external systems: Database, external APIs, caches, etc.
- Manages Dependency Injection (DI) and application composition.

## Rules & Guidelines
- **Repositories**: Implements domain repository interfaces (e.g., `UserRepository` implements `IUserRepository`). Methods should map data from the persistence schema back into Domain Entities (using the entity's `reconstitute` method).
- **Database (Drizzle)**: Uses Drizzle ORM. Define table schemas in the `schemas` directory and configure the database connection context.
- **Dependency Injection**: Uses `awilix` for DI. In `container.ts`, register infrastructure services (like repositories) as `singleton` and Core use cases as `scoped` or `transient`.
- **References**: Allowed to import from the Core layer to implement interfaces and to map data to domain objects. MUST NOT contain business logic.
