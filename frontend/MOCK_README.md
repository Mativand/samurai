# Mock System Documentation

This project includes a comprehensive mock system for development and testing purposes.

## Features

- **Mock Data**: Pre-populated with realistic samurai-themed content
- **API Simulation**: Simulates all CRUD operations (GET, POST, PATCH, DELETE)
- **Network Latency**: Simulates realistic API response times
- **Easy Toggle**: Switch between mock and real data with a UI component
- **Type Safety**: Full TypeScript support for mock data

## How to Enable Mocks

### Method 1: Environment Variable (Recommended)
Create a `.env` file in the frontend directory and add:
```
VITE_ENABLE_MOCKS=true
```

### Method 2: UI Toggle (Development Only)
1. Start the development server
2. Look for the "Development Tools" card in the bottom-right corner
3. Toggle the "Enable Mock Data" switch
4. Reload the page when prompted

## Mock Data

The mock system includes:

### News Articles
- 5 sample articles with realistic content
- Mix of published and draft articles
- Images from Unsplash
- Categories: Training, Equipment, Philosophy, History

### Admin Statistics
- Article counts (total, published, draft)
- View statistics
- Recent activity log

### User Profile
- Admin user profile for testing admin features

## API Endpoints Supported

- `GET /api/news` - Published news articles
- `GET /api/admin/news` - All news articles (admin)
- `GET /api/admin/stats` - Admin statistics
- `POST /api/admin/news` - Create new article
- `PATCH /api/admin/news/:id` - Update article
- `DELETE /api/admin/news/:id` - Delete article

## Customizing Mock Data

Edit `src/lib/mocks.ts` to:
- Add more mock articles
- Modify existing data
- Add new API endpoints
- Adjust response delays

## Development Workflow

1. **Start with mocks enabled** for rapid frontend development
2. **Test UI interactions** without backend dependencies
3. **Switch to real API** when backend is ready
4. **Use mocks for testing** edge cases and error states

## Benefits

- **Faster Development**: No backend dependency for frontend work
- **Consistent Data**: Predictable test data for UI development
- **Offline Development**: Work without internet connection
- **Testing**: Easy to test different data scenarios
- **Demo Mode**: Present features with consistent data

## Notes

- Mocks are only available in development mode
- Mock data persists during the session but resets on page reload
- The mock toggle component is automatically hidden in production builds 