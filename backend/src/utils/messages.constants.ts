export const MESSAGES = {
  USER: {
    NOT_FOUND: 'User not found',
    ALREADY_EXISTS: 'Email already registered',
    INVALID_CREDENTIALS: 'Invalid email or password',
    REGISTER_SUCCESS: 'User registered successfully. Please log in.',
    LOGIN_SUCCESS: 'Login successful',
    FETCHED: 'User fetched',
  },
  PROPERTY: {
    NOT_FOUND: 'Property not found',
    FETCHED: 'Properties fetched',
    ID_REQUIRED: 'Property ID is required',
  },
  FAVOURITE: {
    NOT_FOUND: 'Favourite not found',
    ALREADY_EXISTS: 'Property already in favourites',
    ADDED: 'Property added to favourites',
    REMOVED: 'Property removed from favourites',
    FETCHED: 'Favourites fetched',
  },
  AUTH: {
    UNAUTHORIZED: 'Unauthorized',
    NO_TOKEN: 'No token provided',
    INVALID_TOKEN: 'Invalid or expired token',
  },
  ERROR: {
    INTERNAL_SERVER: 'Internal server error',
    VALIDATION: 'Validation error',
    BAD_REQUEST: 'Bad request',
  }
};
