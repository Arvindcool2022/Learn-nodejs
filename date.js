import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

console.log(format(new Date(), 'yyyy-MM-dd / HH:mm:ss'));
console.log(uuid(16));
