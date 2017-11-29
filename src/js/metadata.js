import { pageSelector } from '../reducers/location.js';
import { store } from '../store.js';

function updateMetadata() {
  switch (pageSelector(store.getState())) {
    case 'list':
      import('../fragments/list.js').then(module => {
        document.title = module.currentListSelector(store.getState()).id;
      });
      break;
    case 'user':
      import('../fragments/user.js').then(module => {
        document.title = module.currentUserSelector(store.getState()).id;
      });
      break;
    case 'item':
      import('../fragments/item.js').then(module => {
        document.title = module.currentItemSelector(store.getState()).title;
      });
      break;
  }
}

store.subscribe(updateMetadata);
