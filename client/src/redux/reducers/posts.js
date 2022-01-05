const initialState = [];
const posts = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_POST":
      return state.map((post) =>
        post._id === action.payload
          ? { ...post, likeCount: ++post.likeCount }
          : post
      );
    case "DELETE_POST":
      return state.filter((post) => post._id !== action.payload._id);
    case "UPDATE":
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...state, action.payload];

    default:
      return state;
  }
};

export default posts;
