const themeReducer = (state = 'light', action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return state === 'light' ? 'dark' : 'light';
      default:
        return state;
    }
  };
  
  export default themeReducer;