export default function(handlers) {
  return store => next => action => {
    next(action);
    if (handlers.hasOwnProperty(action.type)) {
      const actions = handlers[action.type](store, action);
      if (Array.isArray(actions)) {
        actions.map(action => store.dispatch(action));
      }
      store.dispatch(actions);
    }
  };
}
