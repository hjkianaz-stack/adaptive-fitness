# Adaptive Fitness - Development Guidelines

## 1. Project Overview

Adaptive Fitness is a personalized resistance-training and bodybuilding web application.

The application should generate, track, analyze, and adapt workout programs based on:

- User profile
- Training experience
- Training goal
- Available training days
- Session duration
- Available equipment
- Exercise preferences
- Exercise performance
- Training adherence
- Recovery and fatigue feedback
- Historical progress

The long-term goal is to build an evidence-informed adaptive training engine that can generate a new personalized training program based on the user's accumulated performance data.

---

## 2. Core Technology Stack

Use the following technologies unless there is a strong technical reason not to:

- Next.js
- TypeScript
- React
- App Router
- Tailwind CSS
- Supabase
- PostgreSQL
- Cloudflare Workers
- GitHub

Do not introduce unnecessary frameworks, libraries, databases, authentication providers, or backend services.

Prefer existing project dependencies and native platform capabilities.

---

## 3. Architecture Principles

The application must separate:

1. UI
2. Application logic
3. Domain logic
4. Data access
5. Training rules
6. Analytics
7. External services

Do not place business logic directly inside UI components.

Prefer this conceptual architecture:

UI
↓
Application Services
↓
Domain / Training Engine
↓
Data Access Layer
↓
Supabase

The Training Engine must remain independent from React components.

---

## 4. Project Structure

Prefer the following structure:

src/
  app/
  components/
  lib/
  services/
  types/
  data/
  features/

Use feature-based organization when the project becomes larger.

Examples:

src/
  features/
    workouts/
    exercises/
    progress/
    profile/
    programs/

Do not create unnecessary folders.

---

## 5. TypeScript Rules

Use TypeScript throughout the project.

Avoid:

- `any`
- unnecessary type assertions
- duplicated types
- implicit `any`
- untyped API responses

Prefer explicit domain types and interfaces.

Examples of important domain concepts:

- UserProfile
- Exercise
- Muscle
- Equipment
- TrainingGoal
- WorkoutProgram
- WorkoutDay
- WorkoutExercise
- WorkoutSet
- WorkoutLog
- PersonalRecord
- ProgressMetric
- TrainingRule

Keep domain types reusable and independent from UI components.

---

## 6. Training Engine

The Training Engine is a core part of Adaptive Fitness.

Do not implement workout generation using random exercise selection.

Workout generation should eventually consider:

- Training goal
- Training level
- Training frequency
- Session duration
- Available equipment
- Muscle group distribution
- Exercise difficulty
- Movement patterns
- Training volume
- Intensity
- Repetition ranges
- Recovery
- Fatigue
- Previous performance
- Exercise preferences
- Exercise substitutions
- Training history

The Training Engine must be deterministic and testable.

The same user data and the same training rules should produce reproducible results unless randomness is explicitly required.

---

## 7. Scientific Training Rules

Training rules must NOT be hard-coded inside UI components.

Do not write training recommendations directly into pages or React components.

Training rules should eventually be stored and managed separately, preferably through a database-backed knowledge/rules system.

The system should support:

- Rule versioning
- Source tracking
- Publication/update date
- Goal-specific rules
- Experience-level rules
- Active/inactive rules

Training recommendations should be evidence-informed.

Do not claim that a training recommendation is scientifically established unless it is supported by an appropriate source.

---

## 8. Exercise Database

Exercises are domain data, not UI data.

Each exercise should eventually contain information such as:

- Name
- Slug
- Primary muscles
- Secondary muscles
- Movement pattern
- Equipment
- Difficulty
- Exercise type
- Compound/isolation classification
- Unilateral/bilateral classification
- Instructions
- Video
- Image
- Training suitability
- Exercise substitutions

Exercise selection must consider the user's available equipment.

Do not randomly replace an exercise with an unrelated movement.

---

## 9. Workout Generation

The system should eventually follow this conceptual flow:

User Profile
↓
Goal Analysis
↓
Training Level
↓
Weekly Frequency
↓
Session Duration
↓
Equipment Filtering
↓
Training Split
↓
Muscle Distribution
↓
Exercise Selection
↓
Volume / Sets
↓
Repetition Targets
↓
Intensity / RIR
↓
Recovery Validation
↓
Time Validation
↓
Workout Program

Generated programs should be validated before being presented to the user.

---

## 10. Workout Validation

Before a generated program is shown to a user, validate:

- Session duration
- Weekly training frequency
- Muscle-group distribution
- Exercise compatibility
- Equipment availability
- Training level compatibility
- Volume
- Recovery requirements
- Exercise duplication
- Movement-pattern balance

Invalid programs should not be silently presented.

---

## 11. Adaptation Engine

The long-term product differentiator is adaptive programming.

The system should eventually analyze:

- Completed sets
- Repetitions
- Weight
- RPE
- RIR
- Workout duration
- Missed sessions
- Exercise performance
- Personal records
- Training volume
- User feedback
- Fatigue
- Recovery

Then determine whether the next training block should:

- Increase load
- Increase repetitions
- Increase or decrease sets
- Maintain current progression
- Change an exercise
- Change exercise order
- Modify training frequency
- Modify training intensity
- Introduce a deload or recovery adjustment when appropriate

Do not implement automatic adaptations until the underlying data model is reliable.

---

## 12. AI Usage

AI must not be the source of truth for workout programming.

Preferred architecture:

Training Rules
+
Training Engine
+
User Data
↓
Program Decision

AI may later be used for:

- Explaining a program
- Answering user questions
- Summarizing progress
- Explaining exercise selection
- Providing natural-language feedback

Do not allow an AI model to arbitrarily generate training programs without validation by the Training Engine.

---

## 13. Database

Supabase PostgreSQL will eventually be the primary application database.

Potential domain tables include:

- profiles
- goals
- muscles
- equipment
- exercises
- exercise_muscles
- exercise_equipment
- training_rules
- knowledge_sources
- workout_programs
- program_days
- workout_exercises
- workout_sets
- workout_logs
- personal_records
- progress_metrics

Do not create database tables without first considering relationships, constraints, indexes, and future scalability.

---

## 14. Authentication

Authentication will eventually use Supabase Auth.

Never store passwords manually.

Never expose Supabase service-role credentials to the client.

Never expose private environment variables through client-side code.

Use environment variables for credentials and secrets.

---

## 15. Security

Never commit:

- `.env`
- `.env.local`
- API keys
- Supabase service-role keys
- Cloudflare API tokens
- passwords
- private credentials
- authentication secrets

Public client-side configuration must be clearly separated from server-only secrets.

If a secret is accidentally exposed, stop and report it rather than continuing.

---

## 16. UI Principles

Adaptive Fitness should have a modern, premium, clean fitness-product interface.

Prioritize:

- Clear hierarchy
- Strong typography
- Mobile-first responsive design
- Accessible controls
- Simple navigation
- Minimal visual clutter
- Clear workout information
- Easy workout logging

The interface should not look like a generic admin dashboard.

The main user experience should feel like a professional fitness application.

---

## 17. Responsive Design

The application must work well on:

- Mobile
- Tablet
- Desktop

Do not design only for desktop.

Workout logging should be particularly optimized for mobile because users may interact with the application while training.

---

## 18. Accessibility

Use semantic HTML.

Interactive elements must be keyboard accessible.

Buttons must have clear labels.

Form fields must have labels.

Do not rely only on color to communicate information.

Maintain reasonable contrast.

---

## 19. Components

Create reusable components when UI patterns repeat.

Do not create a component abstraction for every small element.

Prefer simple, readable components.

Avoid excessively large components.

Pages should primarily compose components and invoke application services rather than contain large amounts of business logic.

---

## 20. Data Fetching

Keep data fetching separate from presentation whenever practical.

Do not duplicate database queries across multiple components.

Use server-side capabilities where appropriate.

Do not expose server-only database credentials to client components.

---

## 21. Error Handling

Never silently ignore errors.

User-facing errors should be understandable.

Developer-facing errors should contain enough information to debug the problem without exposing sensitive information.

---

## 22. Testing

Critical domain logic should eventually have automated tests.

Priority testing areas:

1. Exercise selection
2. Workout generation
3. Program validation
4. Progress calculations
5. Personal record calculations
6. Training adaptations

UI tests are useful but domain logic tests have higher priority.

---

## 23. Code Quality

Before completing a task:

- Check TypeScript errors
- Check lint errors
- Remove unused imports
- Remove unused variables
- Avoid duplicated logic
- Keep components reasonably small
- Verify responsive behavior when UI changes are made

Do not modify unrelated files.

---

## 24. Dependency Policy

Do not install a package simply because it is convenient.

Before adding a dependency:

1. Check whether the functionality already exists in the project.
2. Check whether it can be implemented with native APIs.
3. Consider bundle size and maintenance.
4. Use a dependency only when it provides meaningful value.

---

## 25. Git Rules

Make small, meaningful commits.

Preferred commit examples:

- `feat: initialize adaptive fitness app`
- `feat: add user onboarding`
- `feat: add exercise database`
- `feat: add workout generator`
- `feat: add workout tracking`
- `feat: add progress dashboard`

Do not make giant commits containing unrelated changes.

---

## 26. Agent Rules

Before changing code:

1. Inspect the existing project structure.
2. Identify dependencies.
3. Understand the relevant feature.
4. Avoid modifying unrelated files.
5. Explain significant architectural changes.

Do not rewrite the entire application when a focused change is sufficient.

Do not delete working code without a clear reason.

Do not introduce placeholder implementations and present them as production-ready functionality.

---

## 27. Current Development Strategy

Build the product incrementally.

Recommended order:

1. Project foundation
2. UI shell
3. Supabase setup
4. Authentication
5. User onboarding
6. Exercise database
7. Training rules
8. Workout generator
9. Workout logging
10. Progress analytics
11. Personal records
12. Adaptation Engine
13. Monthly program regeneration
14. AI assistant
15. Production deployment

Do not jump ahead to complex features before the underlying data model is stable.

---

## 28. Important Product Principle

Adaptive Fitness is not simply a workout generator.

The long-term product is an adaptive training system.

The core loop is:

User Profile
↓
Training Program
↓
Workout
↓
Performance Data
↓
Analysis
↓
Adaptation
↓
Next Workout
↓
Next Training Block

Every architectural decision should preserve this long-term direction.