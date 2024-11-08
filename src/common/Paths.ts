/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  cars: {
    Base: '/cars',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
