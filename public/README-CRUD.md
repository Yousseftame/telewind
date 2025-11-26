# Reusable CRUD Architecture

This project uses a reusable CRUD system that simplifies building admin modules with multi-language support.

## 🏗️ Architecture

### 1. **useCRUD Hook** (`src/hooks/useCRUD.ts`)
Generic hook that handles all CRUD operations (Create, Read, Update, Delete) for any entity.

**Features:**
- Automatic query invalidation
- Toast notifications
- Error handling
- Custom data transformations
- TypeScript support

### 2. **Form Data Helpers** (`src/utils/formDataHelpers.ts`)
Utility functions for working with multi-language forms and images.

**Functions:**
- `buildMultiLangFormData()` - Builds FormData for multi-language entities with images
- `getTranslation()` - Extracts translation for a specific language

## 📖 How to Use

### Step 1: Create Entity-Specific CRUD Hook

Create a hook file for your entity (e.g., `useProductCRUD.ts`):

```typescript
import { useCRUD } from "@/hooks/useCRUD";
import { PRODUCT_URLS } from "@/services/apiEndpoints";
import { Product } from "@/services/types";
import { buildMultiLangFormData } from "@/utils/formDataHelpers";

export function useProductCRUD() {
  return useCRUD<Product>({
    entityName: "product",
    queryKey: "products",
    endpoints: {
      getAll: PRODUCT_URLS.GET_ALL_PRODUCTS,
      getOne: PRODUCT_URLS.GET_PRODUCT,
      create: PRODUCT_URLS.CREATE_PRODUCT,
      update: PRODUCT_URLS.UPDATE_PRODUCT,
      delete: PRODUCT_URLS.DELETE_PRODUCT,
    },
    messages: {
      createSuccess: "Product created successfully",
      updateSuccess: "Product updated successfully",
      deleteSuccess: "Product deleted successfully",
    },
    transformForCreate: (data) => buildMultiLangFormData(data),
    transformForUpdate: (id, data) => buildMultiLangFormData(data),
  });
}
```

### Step 2: Use in Your Admin Component

```typescript
import { useProductCRUD } from "./useProductCRUD";

export default function AdminProducts() {
  const {
    items: products,
    isLoading,
    useItem,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useProductCRUD();

  // Fetch single item for viewing/editing
  const { data: viewProduct } = useItem(viewProductId, showViewDialog);

  // Handle form submit
  const handleFormSubmit = (data: any) => {
    if (selectedProduct) {
      updateMutation.mutate({ id: selectedProduct.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Handle delete
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };
}
```

### Step 3: Define API Endpoints

Add your endpoints in `src/services/apiEndpoints.ts`:

```typescript
export const PRODUCT_URLS = {
  GET_ALL_PRODUCTS: "/admin/products",
  GET_PRODUCT: (id: number) => `/admin/products/${id}`,
  DELETE_PRODUCT: (id: number) => `/admin/products/${id}`,
  CREATE_PRODUCT: "/admin/products",
  UPDATE_PRODUCT: (id: number) => `/admin/products/${id}`,
};
```

### Step 4: Define Types

Add your entity type in `src/services/types.ts`:

```typescript
export interface Product {
  id: number;
  image: string;
  icon?: string;
  translations: {
    locale: string;
    title: string;
    description: string;
  }[];
  // ... other fields
}
```

## 🎨 Customization

### Custom Data Transformation

If your entity needs custom data transformation:

```typescript
export function useRoomCRUD() {
  return useCRUD<Room>({
    // ... other config
    transformForCreate: (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("capacity", data.capacity);
      // Add your custom logic
      return formData;
    },
  });
}
```

### Custom Error Messages

```typescript
export function useEventCRUD() {
  return useCRUD<Event>({
    // ... other config
    messages: {
      createSuccess: "Event scheduled successfully!",
      updateSuccess: "Event details updated!",
      deleteSuccess: "Event cancelled successfully",
      createError: "Failed to schedule event",
      updateError: "Failed to update event",
      deleteError: "Failed to cancel event",
    },
  });
}
```

## 📁 File Structure

```
src/
├── hooks/
│   └── useCRUD.ts                    # Generic CRUD hook
├── utils/
│   └── formDataHelpers.ts            # Form data utilities
├── pages/admin/
│   ├── AdminCate/
│   │   ├── AdminCate.tsx             # Example: Categories
│   │   ├── useCategoryCRUD.ts        # Categories CRUD hook
│   │   ├── CategoryFormDialog.tsx
│   │   └── CategoryViewDialog.tsx
│   └── AdminProduct/
│       ├── AdminProduct.tsx          # Example: Products
│       ├── useProductCRUD.ts         # Products CRUD hook
│       ├── ProductFormDialog.tsx
│       └── ProductViewDialog.tsx
└── services/
    ├── apiEndpoints.ts               # API endpoint definitions
    └── types.ts                      # TypeScript types
```

## ✅ Benefits

1. **DRY (Don't Repeat Yourself)** - Write CRUD logic once, reuse everywhere
2. **Type Safety** - Full TypeScript support
3. **Consistent** - All modules follow the same pattern
4. **Maintainable** - Update one place, affect all modules
5. **Scalable** - Easy to add new entities
6. **Simple** - Clean and easy to understand

## 🚀 Quick Start Checklist

To add a new CRUD module:

- [ ] Define entity type in `types.ts`
- [ ] Add API endpoints in `apiEndpoints.ts`
- [ ] Create `useEntityCRUD.ts` hook
- [ ] Create admin page component using the hook
- [ ] Create form dialog component
- [ ] Create view dialog component (optional)
- [ ] Use `DataTable` and `DeleteDialog` components

That's it! Your new module is ready. 🎉
