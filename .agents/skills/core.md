# Core Layer Skill

## Responsibilities
- Contains the core business logic and domain rules of the application.
- Defines Domain Entities, Value Objects, and Domain Errors.
- Defines Interfaces (Ports) such as Repositories that the Infrastructure layer will implement.
- Implements Use Cases (Application Services) that orchestrate domain entities and repository interfaces.

## Rules & Guidelines
- **No external dependencies**: The Core layer MUST NOT import anything from the Infrastructure or Presentation layers. It should be completely isolated from external frameworks or IO boundaries.
- **Domain Entities**: Use `neverthrow` (`Result`, `ok`, `err`) to handle entity creation and enforce business rules safely. Entities should use a private constructor, a static `create` factory method for applying business rules, and a `reconstitute` method for hydrating from the database.
- **Use Cases**: Each use case should be a dedicated class with an `execute` method. Define schemas (e.g., using `zod`) for input validation alongside the use case. Use cases must return `Result` types (`neverthrow`).
- **Errors**: Define custom domain errors to clearly communicate business rule violations. 
