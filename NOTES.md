## CONTEXT RESPONSIBILITY

---

A context provides application-wide state without the need for prop drilling.
It should be used to share global data that multiple components depend on,
such as authentication status, theme configuration, or user preferences.

The context itself is responsible for:

- Defining the shape (type) of the global shared state.
- Managing state updates and side effects.
- Exposing this data to the rest of the application through a Provider.

The logic inside a context should be:

- Related to the initialization and maintenance of the shared state.
- Self-contained and independent of UI rendering logic.

Everything that affects the global session or shared state goes in the context.

## HOOK RESPONSIBILITY

---

A custom hook is used to encapsulate reusable logic in a clean and modular way.
It simplifies the consumption of context or handling of complex logic within components.

Custom hooks should:

- Improve code readability and maintainability.
- Avoid repetition by centralizing logic.
- Provide safe and structured access to dependencies like contexts.

In this specific case (useAuth):

- It ensures that AuthContext is correctly accessed.
- It prevents accidental use of the context outside its provider.
- It keeps component logic cleaner.

Anything derived, calculated, or a helper to consume the session goes in the hook.

### NOTE ON useMemo USAGE

---

Currently, this hook returns simple derived values and helper functions without using useMemo,
which is perfectly fine for lightweight computations and objects.

You might consider adding useMemo in the future when:

- The hook starts returning complex or deeply nested objects.
- Derived values require expensive computations.
- The returned object is passed to many child components, and you want to prevent unnecessary re-renders.

In such cases, memoizing the returned object ensures that its reference only changes
when the actual dependencies change, improving performance and avoiding redundant renders.

### React useMemo Hook

---

useMemo memorizes a value so that it is only recalculated
when its dependencies change. This helps:

- Avoid expensive calculations on every render.
- Keep object or array references stable to prevent
  unnecessary re-renders in child components.

Syntax:
const memoizedValue = useMemo(() => computeValue(), [dependencies]);

Example:
// Without useMemo, a new object is created on every render:
const value = { count };
<Child value={value} /> // Child re-renders every time

// With useMemo, the object is only recreated when 'count' changes:
const value = useMemo(() => ({ count }), [count]);
<Child value={value} /> // Child re-renders only if 'count' changes

Use it when:

- The calculation is expensive
- Objects/arrays/functions are passed as props to children

Avoid it for simple values like booleans or numbers.
