export default function TableDataReducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        data: action.payload.slice(),
        natural: action.payload.slice(),
      };

    case 'sort': {
      const { column, order } = action;
      if (order === 'none') {
        return { ...state, data: state.natural.slice() };
      }

      const sorted = [...state.data].sort((a, b) => {
        let av, bv;
        switch (column) {
          case 'user':
            av = a.user?.name || '';
            bv = b.user?.name || '';
            break;
          case 'title':
            av = a.post?.title || '';
            bv = b.post?.title || '';
            break;
          case 'comments':
            av = (a.comments || []).length;
            bv = (b.comments || []).length;
            break;
          default:
            av = 0;
            bv = 0;
        }

        if (typeof av === 'string') {
          const cmp = av.localeCompare(bv);
          return order === 'asc' ? cmp : -cmp;
        }

        return order === 'asc' ? av - bv : bv - av;
      });

      return { ...state, data: sorted };
    }

    default:
      return state;
  }
}
