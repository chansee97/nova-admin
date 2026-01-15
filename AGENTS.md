# Nova Admin - Agent Coding Guidelines

This document provides guidelines for agentic coding agents working on this codebase.

## Build, Lint & Test Commands

```bash
# Development
pnpm dev              # Start dev server (uses vite --mode dev)
pnpm dev:prod         # Start with production config

# Build
pnpm build            # Production build
pnpm preview          # Preview production build

# Linting
pnpm lint             # Run eslint + vue-tsc type check
pnpm lint:fix         # Auto-fix eslint issues
pnpm lint:check       # Inspect eslint configuration
pnpm sizecheck        # Visualize bundle size

# Pre-commit hook
# Automatically runs pnpm lint-staged (eslint --fix) on commit
```

## Code Style Guidelines

### Imports
- No strict import sorting enforced (eslint `perfectionist/sort-imports` is OFF)
- Imports use `@/` alias for `src/` directory (e.g., `@/api`, `@/store`, `@/hooks`)
- Third-party and local imports are mixed; follow the pattern in existing files
- Auto-imports are enabled via `unplugin-auto-import` for Vue APIs

### Formatting & Structure
- **Vue components**: Use `<script setup lang="ts">` or `<script setup lang="tsx">`
- **File naming**: PascalCase for components (e.g., `UserModal.vue`), camelCase for utilities (e.g., `useBoolean.ts`)
- **Template**: Use UnoCSS utility classes (e.g., `class="w-70"`, `class="flex-1"`)
- **Comments**: Use Chinese comments for user-facing text; JSDoc for functions

### TypeScript
- **Strict mode enabled** (`strict: true`, `strictNullChecks: true`)
- **No `I` prefix** for interfaces/types (use `UserQueryParams`, not `IUserQueryParams`)
- **Naming**: PascalCase for types/interfaces, camelCase for variables
- **Global namespaces**:
  - `Entity` for database entities (e.g., `Entity.User`, `Entity.Role`)
  - `Api` for response types (e.g., `Api.Response<T>`, `Api.ListResponse<T>`)
- **Props typing**: Use `defineProps<Props>()` with interface

```typescript
// Example: Props typing
interface Props {
  modalName?: string
}
const { modalName = '' } = defineProps<Props>()
```

### Naming Conventions
- **Variables/Functions**: `camelCase` (e.g., `selectedDeptId`, `loadDeptTree`)
- **Async functions**: Start with action verbs (e.g., `fetchLogin`, `getUserList`)
- **Components**: `PascalCase` (e.g., `UserModal`, `DarkModeSwitch`)
- **Constants/Enums**: `PascalCase` (e.g., `Regex.Phone`, `ThemeColor`)
- **Files**: `PascalCase` for components, `camelCase` for hooks/utils

### Error Handling
- **Try-catch**: Wrap async operations that may fail
- **User feedback**: Use `window.$message.success/error` for UI feedback
- **Logging**: Use `console.error()` for error details
- **Silent catch**: Acceptable for non-critical errors (e.g., in search handlers)
- **Empty catch blocks**: Sometimes used; avoid in critical operations

```typescript
// Example: Standard error handling
try {
  await deleteUser(id)
  window.$message.success('用户删除成功')
  refresh()
}
catch (error) {
  console.error('删除用户失败:', error)
}

// Example: Non-critical error with fallback
try {
  const { data } = await getUserList()
  return data
}
catch {
  return { list: [], total: 0 }
}
```

### API Patterns
- **Alova wrapper**: Use `request.Get/Post/Patch/Delete` from `@/utils/alova`
- **Response types**: Wrap with `Api.Response<T>` or `Api.ListResponse<T>`
- **Entity updates**: Use `Partial<Entity.Type>` for update payloads

```typescript
// Example: API function
export function getUserList(params?: UserQueryParams) {
  return request.Get<Api.ListResponse<Entity.User>>('/user', { params })
}
```

### State Management (Pinia)
- **Store naming**: `PascalCase` with `Store` suffix (e.g., `useAuthStore`)
- **State**: Return object with explicit types
- **Getters**: Computed properties with JSDoc
- **Actions**: Async functions for mutations

```typescript
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStatus => {
    return { userInfo: {}, roles: [], permissions: [] }
  },
  getters: {
    isLogin(state) { return Boolean(state.userInfo) },
  },
  actions: {
    async login() {
      // ...
    },
  },
})
```

### CSS & Styling
- **UnoCSS**: Use utility classes (e.g., `grid grid-cols-2`, `col-span-2`)
- **Scoped styles**: `<style scoped>` for component-specific CSS
- **Tailwind-like syntax**: `w-70`, `flex-1`, `text-2xl`, etc.

### Vue Component Best Practices
- **Composition API**: Use `<script setup>` exclusively
- **Expose methods**: Use `defineExpose({ openModal })` for modal/ref methods
- **Event emission**: Use `defineEmits<{ success: [] }>()`
- **Reactive refs**: Use `shallowRef` for non-reactive objects (e.g., `modalType`)

## Key File Locations

| Purpose | Path |
|---------|------|
| API definitions | `src/api/` |
| Types/Entities | `src/typings/` |
| State stores | `src/store/` |
| Hooks | `src/hooks/` |
| Constants | `src/constants/` |
| Utils | `src/utils/` |
| Views | `src/views/` |
| Components | `src/components/` |
| Configs | `src/modules/` |

## Important Dependencies

- **Vue 3** with Composition API
- **Naive UI** for components (auto-imported)
- **Alova** for API requests
- **Pinia** for state management
- **UnoCSS** for styling
- **TypeScript** with strict mode
