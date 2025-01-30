// import { inject } from 'vue'
import { inject } from '@type-dom/framework';
import { tdPaginationKey } from './constants';

export const usePagination = () => inject(tdPaginationKey, {});
