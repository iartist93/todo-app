import { applyMiddlewares } from '../redux';

import thunk from './thunk';
import logger from './logger';

export default applyMiddlewares(thunk, logger);
