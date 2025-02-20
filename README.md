# AI Solutions Portfolio Navigator

## Deployment Flow Page

The Deployment Flow page provides an interactive decision tree for AI model deployment paths, with technology stack visualization and technical specifications generation.

### 1. Decision Tree Structure

To update the decision tree in `/src/components/HorizontalDecisionTree.tsx`:

```typescript
const columns: Column[] = [
  {
    id: "entry",
    title: "Section Title",
    groups: [
      {
        title: "Group Title",
        items: [
          {
            id: "unique_id",
            label: "Display Label",
            nextIds: ["connected_item_id1", "connected_item_id2"]
          }
        ]
      }
    ]
  }
];
```

### 2. Technology Stack Icons

To update technology icons in `/src/components/TechnologyIcons.tsx`:

1. Add new icon mapping:
```typescript
const iconMappings: IconMapping[] = [
  {
    id: "unique_id",
    icon: "/Icon/icon-name.svg",
    items: ["connected_decision_id1", "connected_decision_id2"]
  }
];
```

2. Add to icon groups:
```typescript
const iconGroups = [
  {
    title: "Group Title",
    icons: ["icon_id1", "icon_id2"]
  }
];
```

### 3. Technical Specifications

To update tech specs in `/src/components/TechSpecsTable.tsx`:

```typescript
const getTechSpecs = (selectedItems: Set<string>): SpecSection[] => {
  const specs: SpecSection = {
    title: "Section Title",
    specs: {
      "Spec Name": "Spec Value",
      "Conditional Spec": selectedItems.has("item_id") ? "Value A" : "Value B"
    }
  };
  return [specs];
};
```

### 4. Best Practices

1. **Decision Tree**:
   - Keep IDs unique and descriptive
   - Ensure all connections are valid
   - Group related items together

2. **Technology Icons**:
   - Use SVG format for icons
   - Place icons in `/public/Icon/` directory
   - Follow naming convention: lowercase, hyphen-separated

3. **Tech Specs**:
   - Group related specifications
   - Use conditional logic for path-specific specs
   - Keep specifications clear and concise

## AI Portfolio Page

To update the AI Portfolio visualization with new items or connections:

1. **Add New Items**
   Update the `defaultData` object in `/src/components/PortfolioGrid.tsx`:
   ```typescript
   const defaultData = {
     engineeringStack: [
       {
         id: "new_stack_item",
         label: "New Engineering Stack Item",
         connections: ["connected_usecase1", "connected_usecase2"]
       }
       // ... existing items
     ],
     businessUnits: [...],
     humanAiInteraction: [...],
     cloudServices: [...],
     aiCapabilities: [...],
     aiTasks: [...],
     useCases: [...]
   };
   ```

2. **Add New Connections**
   - Add connection IDs to the `connections` array of existing items
   - Connections are bi-directional, so they will highlight in both directions
   - Example: Adding a new connection between an engineering stack item and a use case:
     ```typescript
     engineeringStack: [{
       id: "existing_stack",
       label: "Existing Stack Item",
       connections: ["existing_connection", "new_usecase_id"] // Add new connection
     }]
     ```

3. **Best Practices**
   - Use clear, descriptive IDs that indicate the item's purpose
   - Keep labels concise but informative
   - Ensure all connections are valid (IDs exist in both directions)
   - Group related items together in their respective columns

## Deployment Flow Page


### 1. Adding New Technology Icons

1. Add the icon file to `/public/Icon/` directory
   - Use SVG format for best quality
   - Follow the naming convention: lowercase, hyphen-separated (e.g., `new-tech.svg`)

2. Update the `iconMappings` array in `/src/components/TechnologyIcons.tsx`:
   ```typescript
   const iconMappings: IconMapping[] = [
     // Add your new icon mapping
     {
       id: "new-tech",
       icon: "/Icon/new-tech.svg",
       items: ["item_id_1", "item_id_2"] // IDs of items that should highlight this icon
     },
     // ... existing mappings
   ];
   ```

### 2. Adding New Flow Items

Update the `columns` array in `/src/components/HorizontalDecisionTree.tsx`:

1. Add new items to existing groups:
   ```typescript
   {
     id: "existing_column_id",
     groups: [{
       title: "Group Title",
       items: [
         // Add your new item
         {
           id: "new_item_id",
           label: "New Item Label",
           nextIds: ["connected_item_1", "connected_item_2"]
         },
         // ... existing items
       ]
     }]
   }
   ```

2. Or add a new column:
   ```typescript
   {
     id: "new_column",
     title: "New Column Title",
     groups: [{
       title: "Group Title",
       items: [{
         id: "new_item_id",
         label: "New Item Label",
         nextIds: ["connected_item_1", "connected_item_2"]
       }]
     }]
   }
   ```

### 4. Best Practices

1. **Icon Organization**:
   - Keep icons organized by category in the `iconMappings` array
   - Use clear, descriptive IDs
   - Group related technologies together

2. **Flow Items**:
   - Maintain logical grouping in columns
   - Use consistent naming for IDs
   - Keep labels concise but descriptive

3. **Decision Tree**:
   - Ensure all paths are connected
   - Provide clear, actionable options
   - Keep decision text concise

4. **Testing**:
   - Test new connections in the flow
   - Verify icon highlighting works
   - Check decision tree navigation

# Docker Setup Instructions

## 1. Save Docker images to tar files
docker save -o node20-slim.tar node:20-slim  
docker save -o nginx-alpine.tar nginx:alpine  
docker save -o ai-solution.tar ai-solution

## 2. Split the tar files into smaller parts (90 MB each)
split -b 90M node20-slim.tar node20-slim.part_  
split -b 90M nginx-alpine.tar nginx-alpine.part_  
split -b 90M ai-solution.tar ai-solution.part_

## 3. (Optional) Recombine the split parts into a single tar file
cat node20-slim.part_* > node20-slim.tar  
cat nginx-alpine.part_* > nginx-alpine.tar  
cat ai-solution.part_* > ai-solution.tar

## 4. Load the Docker images from the tar files
docker load -i node20-slim.tar  
docker load -i nginx-alpine.tar  
docker load -i ai-solution.tar



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `par serOptions`property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
